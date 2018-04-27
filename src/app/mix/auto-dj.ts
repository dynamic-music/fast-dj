import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, DymoStore, uris, globals } from 'dymo-core';
import { MixGenerator } from './mix-generator';
import { Transition, TransitionType, DecisionType } from '../types';
import { FeatureExtractionService } from '../feature-extraction.service';
import { Analyzer } from './analyzer';
import * as d from './decision-tree';

export class AutoDj {

  private store: DymoStore;
  private analyzer: Analyzer;
  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager;
  private previousPlayingDymos = [];
  private previousSongs = [];
  private isPlaying;

  constructor(private featureApi: string, private extractionService: FeatureExtractionService) {
    //d;
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
        this.analyzer = new Analyzer(this.store);
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

  async transitionToSong(audioUri: string): Promise<Transition> {
    let buffer = await (await this.manager.getAudioBank()).getAudioBuffer(audioUri);
    let beats = await this.extractionService.extractBeats(buffer);
    let newSong = await DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats);
    let keys = await this.extractionService.extractKey(buffer);
    this.dymoGen.setSummarizingMode(globals.SUMMARY.MODE)
    await this.dymoGen.addFeature("key", keys, newSong);
    let oldSong = _.last(this.previousSongs);
    let transition = await this.internalTransition(newSong);
    if (this.previousSongs.length > 1) {
      transition.features = await this.analyzer.getAllFeatures(oldSong, newSong);
    }
    return transition;
  }

  private async internalTransition(newSong: string): Promise<Transition> {
    await this.manager.loadFromStore(newSong);
    let transition = this.defaultTransition(newSong);
    /*if (Math.random() > 0.5) {
      transition = this.randomTransition(newSong);
    } else {
      transition = this.startWhicheverTransitionIsBest(newSong);
    }*/
    this.previousSongs.push(newSong);
    this.keepOnPlaying(this.mixGen.getMixDymo());
    return transition;
  }

  private async defaultTransition(newSong: string): Promise<Transition> {
    let transition = this.getEmptyTransitionObject();
    transition.decision = DecisionType.Default;
    if (this.previousSongs.length > 0) {
      //await this.startWhicheverTransitionIsBest(newSong);
      //(this.getRandomTransition())(newDymo);
      transition.type = TransitionType.BeatRepeat;
      transition.duration = await this.mixGen.beatRepeat(newSong);
    } else {
      transition.type = TransitionType.FadeIn;
      transition.duration = await this.mixGen.startMixWithFadeIn(newSong);
    }
    return transition;
  }

  private async randomTransition(newSong: string): Promise<Transition> {
    console.log("random")
    let transition = this.getEmptyTransitionObject();
    transition.decision = DecisionType.Random;
    if (this.previousSongs.length > 0) {
      let random = (this.getRandomTransition())
      transition.type = random[1];
      transition.duration = await random[0](newSong);
    } else {
      transition.type = TransitionType.FadeIn;
      transition.duration = await this.mixGen.startMixWithFadeIn(newSong);
    }
    return transition;
  }

  private getEmptyTransitionObject(): Transition {
    return {
      date: new Date(Date.now()),
      user: null,
      rating: null,
      names: null,
      features: null,
      decision: null,
      type: null,
      parameters: null,
      duration: null
    }
  }

  private async startWhicheverTransitionIsBest(newSong: string): Promise<Transition> {
    console.log("tree")
    let transition = this.getEmptyTransitionObject();
    transition.decision = DecisionType.DecisionTree;
    const previousSong = _.last(this.previousSongs);

    if (this.previousSongs.length == 0) {
      transition.type = TransitionType.FadeIn;
      transition.duration = await this.mixGen.startMixWithFadeIn(newSong);
    } else {
      //const songBoundaries = this.analyzer.getMainSongBody(newSong);
      if (await this.analyzer.hasRegularBeats(newSong) && await this.analyzer.hasRegularBeats(previousSong)) {
        console.log("both regular")
        if (await this.analyzer.tempoSimilar(newSong, previousSong)) {
          console.log("tempo similar")
          //transition using beatmatching and tempo interpolation
          transition.type = TransitionType.Beatmatch;
          transition.duration = await this.mixGen.beatmatchCrossfade(newSong);
        }/* else if (await analyzer.tempoCloseToMultiple(newSong, previousSong)) {
          console.log("tempo multiple")
          //TODO this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatchToMultiple(newSong, oldDymo);
          this.mixGen.transitionImmediatelyByCrossfadeAndBeatmatch(newSong);
        }*/ else if (await this.analyzer.getKeyDistance(newSong, previousSong) <= 2) {
          console.log("key similar")
          transition.type = TransitionType.EchoFreeze;
          transition.duration = await this.mixGen.echoFreeze(newSong);
        } else {
          console.log("give up")
          transition.type = TransitionType.PowerDown;
          transition.duration = await this.mixGen.powerDown(newSong);
        }
      } else if (await this.analyzer.getKeyDistance(newSong, previousSong) <= 2) {
        console.log("key similar")
        transition.type = TransitionType.EchoFreeze;
        transition.duration = await this.mixGen.echoFreeze(newSong);
      } else {
        console.log("give up")
        transition.type = TransitionType.PowerDown;
        transition.duration = await this.mixGen.powerDown(newSong);
      }
    }
    return transition;
  }

  private getRandomTransition(): [Function, TransitionType] {
    let transitions: [Function, TransitionType][] = [
      [(newDymo: string) => this.mixGen.beatmatchCrossfade(newDymo), TransitionType.Beatmatch],
      [(newDymo: string) => this.mixGen.echoFreeze(newDymo), TransitionType.EchoFreeze],
      [(newDymo: string) => this.mixGen.direct(newDymo), TransitionType.Direct],
      [(newDymo: string) => this.mixGen.beatRepeat(newDymo), TransitionType.BeatRepeat],
      [(newDymo: string) => this.mixGen.crossfade(newDymo), TransitionType.Crossfade],
      [(newDymo: string) => this.mixGen.powerDown(newDymo), TransitionType.PowerDown],
      [(newDymo: string) => this.mixGen.reverbPanDirect(newDymo), TransitionType.Effects]
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