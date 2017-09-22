import * as _ from 'lodash';
import { DymoGenerator, ExpressionGenerator, DymoManager, DymoStore, uris } from 'dymo-core';

//export const TRANSITIONS: Map<string,Function> = new Map<string,Function>();
//TRANSITIONS.set("BeatmatchCrossfade", )


export class MixGenerator {

  private mixDymoUri: string;
  private songs: string[] = [];
  private transitions = []; //ARRAY OF CONSTRAINT ARRAYS FOR NOW
  private store: DymoStore;
  private expressionGen: ExpressionGenerator;

  constructor(private generator: DymoGenerator, private manager: DymoManager) {
    this.mixDymoUri = this.generator.addDymo();
    this.store = generator.getStore();
    this.expressionGen = new ExpressionGenerator(this.store);
  }

  getMixDymo(): string {
    return this.mixDymoUri;
  }

  //TODO dymo-core throws the occasional error due to list editing concurrency problem
  addRandomBeatToLoop(songUri: string, loopDuration = 2): Promise<any> {
    let currentBeats = this.store.findParts(this.mixDymoUri);
    //find a random beat in the song
    let bars = this.registerSongAndGetBars(songUri);
    let randomBar = bars[_.random(bars.length)];
    let randomBeat = this.store.findParts(randomBar)[_.random(4)];
    if (currentBeats.length == 0) {
      //add silence at beginning and end of loop to ensure constant length :/
      let silenceUri = this.generator.addDymo(this.mixDymoUri);
      this.store.setParameter(silenceUri, uris.ONSET, 0);
      silenceUri = this.generator.addDymo(this.mixDymoUri);
      this.store.setParameter(silenceUri, uris.ONSET, loopDuration);
      currentBeats = this.store.findParts(this.mixDymoUri);
    }
    //set a random onset and add the beat to the loop at correct position
    let currentOnsets = currentBeats.map(b => this.store.findParameterValue(b, uris.ONSET));
    let randomOnset = _.random(loopDuration, true);
    this.store.setParameter(randomBeat, uris.ONSET, randomOnset);
    let beatPosition = currentOnsets.filter(o => o < randomOnset).length;
    this.store.insertPartAt(this.mixDymoUri, randomBeat, beatPosition);
    return Promise.resolve();
  }

  transitionImmediatelyToRandomBars(songUri: string, numBars = 2): Promise<any> {
    let bars = this.registerSongAndGetBars(songUri);
    let randomBar = _.random(bars.length-numBars);
    bars.slice(randomBar, randomBar+numBars).forEach(p =>
      this.store.addPart(this.mixDymoUri, p));
    return Promise.resolve();
  }

  transitionImmediatelyByCrossfade(songUri: string, numBars = 8, offsetBar = 8): Promise<any> {
    let newSongBars = this.registerSongAndGetBars(songUri).slice(offsetBar);
    //remove rest of old song, replace transition parts with conjunctions
    let oldSongBars = [];
    if (this.songs.length > 1) {
      let currentPos = this.manager.getNavigatorPosition(this.mixDymoUri);
      //only keep the bars needed for the transition
      oldSongBars = this.store.removeParts(this.mixDymoUri, currentPos+1).slice(0, numBars);
      oldSongBars.forEach((o,i) => this.generator.addConjunction(this.mixDymoUri, [o, newSongBars[i]]));
    }
    //append rest of new song
    newSongBars.slice(numBars).forEach(p => this.store.addPart(this.mixDymoUri, p));
    //create ramp and crossfade
    let rampUri = this.generator.addRampControl(0, 10, 200);
    let crossfade = this.makeCrossfade(rampUri, oldSongBars, newSongBars);
    //create tempo transition
    let tempoParam = this.generator.addCustomParameter(uris.CONTEXT_URI+"Tempo");
    let newTempo = this.getTempoFromBar(newSongBars[0]);
    let oldTempo = oldSongBars.length > 0 ? this.getTempoFromBar(oldSongBars[0]) : newTempo;
    let tempoTransition = this.makeSetsConstraint(
      {'t':[tempoParam], 'r':[rampUri]}, 't == r*'+newTempo+'+(1-r)*'+oldTempo);
    //create beatmatch
    let beats = _.flatten(oldSongBars.concat(newSongBars).map(p => this.store.findParts(p)));
    let beatMatch = this.makeSetsConstraint(
      {'d':beats, 't':[tempoParam]}, 'PlaybackRate(d) == t/60*DurationFeature(d)');

    return this.loadAndTriggerTransition(rampUri, beatMatch, tempoTransition, ...crossfade)
      .then(() => {
        console.log("tempo", oldTempo, newTempo);
        console.log("triples", this.store.size());
        console.log("observers", this.store.getValueObserverCount());
      });
  }

  echoFreeze(songUri: string, numBars = 2): Promise<any> {
    let newSongBars = this.registerSongAndGetBars(songUri);
    if (this.songs.length > 1) {
      //remove rest of old song
      let currentPos = this.manager.getNavigatorPosition(this.mixDymoUri);
      let removedBars = this.store.removeParts(this.mixDymoUri, currentPos+1).slice(0, numBars);
      //delay out last bar
      let lastBar = this.store.findPartAt(this.mixDymoUri, currentPos);
      this.store.setParameter(lastBar, uris.DELAY, 1);
      //add silence for n bars
      let lastBarDuration = this.store.findFeatureValue(lastBar, uris.DURATION_FEATURE);
      let emptyBar = this.generator.addDymo();
      this.store.setFeature(emptyBar, uris.DURATION_FEATURE, lastBarDuration);
      _.times(numBars, () => this.store.addPart(this.mixDymoUri, emptyBar));
    }
    //add new song
    newSongBars.forEach(p => this.store.addPart(this.mixDymoUri, p));
    //currently delays need to be initialized for this to work
    newSongBars.forEach(p => this.store.setParameter(p, uris.DELAY, 0));
    return Promise.resolve();
  }

  /**returns a number of controls that trigger the transition*/
  private loadAndTriggerTransition(...uris: string[]): Promise<any> {
    return this.manager.loadFromStore(...uris)
      .then(l => {
        //add loaded transition
        this.transitions.push(l.constraints);
        //return controls
        return _.values(l.controls);
      })
      .then(controls => {
        //TODO LET SCHEDULER DO THIS!!!!
        setTimeout(() => {
          //stop previous transition
          if (this.transitions.length > 1)
            this.transitions.slice(-2)[0].forEach(t => t.stopMaintaining());
          //start new transition
          controls.forEach(c => c.startUpdate());
        }, 1000); //random time
      })
  }

  private registerSongAndGetBars(songUri: string): string[] {
    this.songs.push(songUri);
    return this.store.findParts(songUri);
  }

  private makeCrossfade(rampUri: string, oldSongUris: string[], newSongUris: string[]): string[] {
    var fadeOut = this.makeRampConstraint(rampUri, oldSongUris, 'Amplitude(d) == 1-r');
    var fadeIn = this.makeRampConstraint(rampUri, newSongUris, 'Amplitude(d) == r');
    return [fadeOut, fadeIn].filter(c => c); //remove undefined
  }

  private makeRampConstraint(rampUri: string, dymoUris: string[], expression: string): string {
    if (dymoUris.length > 0) {
      return this.makeSetsConstraint({'d':dymoUris, 'r':[rampUri]}, expression);
    }
  }

  private makeSetsConstraint(sets: {}, expression: string): string {
    let vars = _.keys(sets).map(k => '∀ '+k+' in '+JSON.stringify(sets[k])+' => ').join('');
    return this.expressionGen.addConstraint(this.mixDymoUri, vars+expression, true);
  }

  private getTempoFromBar(barUri: string): number {
    var barDuration = this.store.findFeatureValue(barUri, uris.DURATION_FEATURE);
    return 1/(barDuration/4)*60;
  }

}