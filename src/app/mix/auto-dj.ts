import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, DymoStore, uris, globals } from 'dymo-core';
import { MixGenerator } from './mix-generator';
import { FeatureExtractionService } from '../feature-extraction.service';
import { Analyzer } from './analyzer';
import * as d from './decision-tree';

export class AutoDj {

  private store: DymoStore;
  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager;
  private previousPlayingDymos = [];
  private previousSongs = [];
  private isPlaying;

  constructor(private featureApi: string, private extractionService: FeatureExtractionService) {
    d;
    this.manager = new DymoManager(
      undefined,
      1,
      null,
      null,
      'https://dynamic-music.github.io/dymo-core/audio/impulse_rev.wav'
    );
  }

  init(): Promise<any> {
    return this.manager.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/')//'https://dynamic-music.github.io/dymo-core/ontologies/')
      .then(() => {
        this.store = this.manager.getStore();
        this.dymoGen = new DymoGenerator(this.store);
        this.mixGen = new MixGenerator(this.dymoGen, this.manager);
      });
  }

  getBeatObservable(): Observable<any> {
    return (this.manager.getPlayingDymoUris())
      .filter(playingDymos => {
        // TODO identify which track is playing, and associate with a specific colour
       const nChanged = _.difference(playingDymos, this.previousPlayingDymos).length;
       this.previousPlayingDymos = playingDymos;
       return nChanged > 0;
      });
  }

  async transitionToSong(audioUri: string): Promise<any> {
    let buffer = await (await this.manager.getAudioBank()).getAudioBuffer(audioUri);
    let beats = await this.extractionService.extractBeats(buffer);
    let newDymo = await DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats);
    let keys = await this.extractionService.extractKey(buffer);
    this.dymoGen.setSummarizingMode(globals.SUMMARY.MEDIAN)
    await this.dymoGen.addFeature("key", keys, newDymo);
    console.log(await this.store.findFeatureValue(newDymo, uris.CONTEXT_URI+"key"));
    return this.internalTransition(newDymo);
  }

  private internalTransition(newSong: string): Promise<any> {
    return this.manager.loadFromStore(newSong)
    .then(async () => {
      if (this.previousSongs.length > 0) {
        await this.startWhicheverTransitionIsBest(newSong);
        //(this.getRandomTransition())(newDymo);
      } else {
        //TODO SIMPLY START PLAYING SONG (add function to mix gen)
        await this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      }
      this.previousSongs.push(newSong);
    })
    .then(() => this.keepOnPlaying(this.mixGen.getMixDymo()));
  }

  private async startWhicheverTransitionIsBest(newSong: string) {
    const previousSong = _.last(this.previousSongs);
    const analyzer = new Analyzer(this.store);
    const songBoundaries = analyzer.getMainSongBody(newSong);
    //TODO CONSIDER KEYS!!! ETC
    if (await analyzer.hasRegularBeats(newSong) && await analyzer.hasRegularBeats(previousSong)) {
      console.log("both regular")
      if (await analyzer.tempoSimilar(newSong, previousSong)) {
        console.log("tempo similar")
        //transition using beatmatching and tempo interpolation
        this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      }/* else if (await analyzer.tempoCloseToMultiple(newSong, previousSong)) {
        console.log("tempo multiple")
        //TODO this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatchToMultiple(newSong, oldDymo);
        this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      }*/ else {
        console.log("give up")
        this.mixGen.echoFreeze(newSong);
      }
    } else {
      console.log("give up")
      this.mixGen.echoFreeze(newSong);
    }
  }

  private getRandomTransition(): Function {
    let transitions = [
      (newDymo: string) => this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newDymo),
      (newDymo: string) => this.mixGen.echoFreeze(newDymo)
    ];
    return transitions[_.random(transitions.length)];
  }

  private keepOnPlaying(dymoUri: string) {
    if (!this.isPlaying) {
      this.manager.startPlayingUri(dymoUri);
      this.isPlaying = true;
    }
  }

}