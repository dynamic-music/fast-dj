import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, uris } from 'dymo-core';
import { MixGenerator } from './mix-generator';
import { FeatureExtractionService } from '../feature-extraction.service';

export class AutoDj {

  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager;
  private previousDymos = [];
  private isPlaying;

  constructor(private featureApi: string, private extractionService: FeatureExtractionService) {
    this.manager = new DymoManager(
      undefined,
      1,
      null,
      null,
      'https://semantic-player.github.io/dymo-core/audio/impulse_rev.wav'
    );
  }

  init(): Promise<any> {
    return this.manager.init('https://semantic-player.github.io/dymo-core/ontologies/')
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
       const nChanged = _.difference(playingDymos, this.previousDymos).length;
       this.previousDymos = playingDymos;
       return nChanged > 0;
      });
  }

  transitionToSong(audioUri: string): Promise<any> {
    return this.manager.getAudioBank().loadBuffer(audioUri)
      .then(buffer => this.extractionService.extractBeats(buffer))
      .then(beats => DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats))
      .then(newDymo => this.manager.loadFromStore(newDymo)
        //.then(() => this.reasoner.decideWhatToDo(newDymo))
        .then(() => this.getRandomTransition()(newDymo)))
      .then(() => this.keepOnPlaying(this.mixGen.getMixDymo()));
  }

  private getRandomTransition(): Function {
    let transitions = [this.mixGen.transitionImmediatelyByCrossfade, this.mixGen.echoFreeze];
    return transitions[_.random(transitions.length)];
  }

  private keepOnPlaying(dymoUri: string) {
    if (!this.isPlaying) {
      this.manager.startPlayingUri(dymoUri);
      this.isPlaying = true;
    }
  }

}