import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, uris } from 'dymo-core';
import { MixGenerator } from './mix-generator';
import { FeatureExtractionService } from '../feature-extraction.service';
import { Analyzer } from './analyzer';

export class AutoDj {

  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager;
  private previousPlayingDymos = [];
  private previousSongs = [];
  private isPlaying;

  constructor(private featureApi: string, private extractionService: FeatureExtractionService) {
    this.manager = new DymoManager(
      undefined,
      1,
      null,
      null,
      'https://dynamic-music.github.io/dymo-core/audio/impulse_rev.wav'
    );
  }

  init(): Promise<any> {
    return this.manager.init('https://dynamic-music.github.io/dymo-core/ontologies/')
      .then(() => {
        let store = this.manager.getStore();
        this.dymoGen = new DymoGenerator(store);
        this.mixGen = new MixGenerator(this.dymoGen, this.manager);
      });
  }

  getBeatObservable(): Observable<any> {
    return this.manager.getPlayingDymoUris()
      .filter(playingDymos => {
        // TODO identify which track is playing, and associate with a specific colour
       const nChanged = _.difference(playingDymos, this.previousPlayingDymos).length;
       this.previousPlayingDymos = playingDymos;
       return nChanged > 0;
      });
  }

  transitionToSong(audioUri: string): Promise<any> {
    return this.manager.getAudioBank().loadBuffer(audioUri)
      .then(buffer => this.extractionService.extractBeats(buffer))
      .then(beats => DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats))
      .then(newDymo => this.internalTransition(newDymo));
  }

  private internalTransition(newSong: string): Promise<any> {
    return this.manager.loadFromStore(newSong)
    .then(() => {
      if (this.previousSongs.length > 0) {
        this.startWhicheverTransitionIsBest(newSong);
        //(this.getRandomTransition())(newDymo);
      } else {
        //TODO SIMPLY START PLAYING SONG (add function to mix gen)
        this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      }
      this.previousSongs.push(newSong);
    })
    .then(() => this.keepOnPlaying(this.mixGen.getMixDymo()));
  }

  private startWhicheverTransitionIsBest(newSong: string) {
    const previousSong = _.last(this.previousSongs);
    const analyzer = new Analyzer(this.manager.getStore());
    const songBoundaries = analyzer.getMainSongBody(newSong);
    //TODO CONSIDER KEYS!!! ETC
    if (analyzer.hasRegularBeats(newSong) && analyzer.hasRegularBeats(previousSong)) {
      console.log("both regular")
      if (analyzer.tempoSimilar(newSong, previousSong)) {
        console.log("tempo similar")
        //transition using beatmatching and tempo interpolation
        this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      } else if (analyzer.tempoCloseToMultiple(newSong, previousSong)) {
        console.log("tempo close")
        //TODO this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatchToMultiple(newSong, oldDymo);
        this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
      } else {
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