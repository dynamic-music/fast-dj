import * as _ from 'lodash';
import { DymoGenerator, ExpressionGenerator, DymoManager, DymoStore, uris, UIControl } from 'dymo-core';

//export const TRANSITIONS: Map<string,Function> = new Map<string,Function>();
//TRANSITIONS.set("BeatmatchCrossfade", )


export class MixGenerator {

  private mixDymoUri: string;
  private songs: string[] = [];
  private transitions: string[][] = []; //ARRAY OF CONSTRAINT URIS FOR NOW
  private store: DymoStore;
  private expressionGen: ExpressionGenerator;

  constructor(private generator: DymoGenerator, private manager: DymoManager) {
    this.store = generator.getStore();
    this.expressionGen = new ExpressionGenerator(this.store);
    this.init();
  }

  async init() {
    this.mixDymoUri = await this.generator.addDymo();
  }

  getMixDymo(): string {
    return this.mixDymoUri;
  }

  //TODO dymo-core throws the occasional error due to list editing concurrency problem
  async addRandomBeatToLoop(songUri: string, loopDuration = 2): Promise<any> {
    let currentBeats = await this.store.findParts(this.mixDymoUri);
    //find a random beat in the song
    let bars = await this.registerSongAndGetBars(songUri);
    let randomBar = bars[_.random(bars.length)];
    let randomBeat = (await this.store.findParts(randomBar))[_.random(4)];
    if (currentBeats.length == 0) {
      //add silence at beginning and end of loop to ensure constant length :/
      let silenceUri = await this.generator.addDymo(this.mixDymoUri);
      await this.store.setParameter(silenceUri, uris.ONSET, 0);
      silenceUri = await this.generator.addDymo(this.mixDymoUri);
      await this.store.setParameter(silenceUri, uris.ONSET, loopDuration);
      currentBeats = await this.store.findParts(this.mixDymoUri);
    }
    //set a random onset and add the beat to the loop at correct position
    let currentOnsets = await Promise.all(currentBeats.map(b => this.store.findParameterValue(b, uris.ONSET)));
    let randomOnset = _.random(loopDuration, true);
    await this.store.setParameter(randomBeat, uris.ONSET, randomOnset);
    let beatPosition = currentOnsets.filter(o => o < randomOnset).length;
    return this.store.insertPartAt(this.mixDymoUri, randomBeat, beatPosition);
  }

  async transitionImmediatelyToRandomBars(songUri: string, numBars = 2): Promise<any> {
    let bars = await this.registerSongAndGetBars(songUri);
    let randomBar = _.random(bars.length-numBars);
    return Promise.all(bars.slice(randomBar, randomBar+numBars).map(p =>
      this.store.addPart(this.mixDymoUri, p)));
  }

  async transitionImmediatelyByCrossfadeAndBeatmatch(songUri: string, numBars = 8, offsetBar = 8): Promise<any> {
    let newSongBars = (await this.registerSongAndGetBars(songUri)).slice(offsetBar);
    //remove rest of old song, replace transition parts with conjunctions
    let oldSongBars: string[] = [];
    if (this.songs.length > 1) {
      let currentPos = await this.manager.getPosition(this.mixDymoUri);
      //only keep the bars needed for the transition
      oldSongBars = (await this.store.removeParts(this.mixDymoUri, currentPos+1)).slice(0, numBars);
      oldSongBars.forEach((o,i) => this.generator.addConjunction(this.mixDymoUri, [o, newSongBars[i]]));
    }
    //append rest of new song
    await Promise.all(newSongBars.slice(numBars).map(p => this.store.addPart(this.mixDymoUri, p)));
    //create ramp and crossfade
    let rampUri = await this.generator.addRampControl(0, 10, 200);
    let crossfade = await this.makeCrossfade(rampUri, oldSongBars, newSongBars);
    //create tempo transition
    let tempoParam = await this.generator.addCustomParameter(uris.CONTEXT_URI+"Tempo");
    let newTempo = await this.getTempoFromBar(newSongBars[0]);
    let oldTempo = oldSongBars.length > 0 ? await this.getTempoFromBar(oldSongBars[0]) : newTempo;
    let tempoTransition = await this.makeSetsConstraint(
      [['t',[tempoParam]], ['r',[rampUri]]], 't == r*'+newTempo+'+(1-r)*'+oldTempo);
    //create beatmatch
    let beats = _.flatten(await Promise.all(oldSongBars.concat(newSongBars).map(p => this.store.findParts(p))));
    let beatMatch = await this.makeSetsConstraint(
      [['d',beats], ['t',[tempoParam]]], 'PlaybackRate(d) == t/60*DurationFeature(d)');
    let beatMatch2 = await this.makeSetsConstraint(
      [['d',beats], ['t',[tempoParam]]], 'DurationRatio(d) == 1/PlaybackRate(d)');

    return this.loadAndTriggerTransition(rampUri, beatMatch, beatMatch2, tempoTransition, ...crossfade)
      .then(async () => {
        console.log("tempo", oldTempo, newTempo);
        console.log("triples", await this.store.size());
        console.log("observers", await this.store.getValueObserverCount());
      });
  }

  async echoFreeze(songUri: string, numBars = 2): Promise<any> {
    let newSongBars = await this.registerSongAndGetBars(songUri);
    if (this.songs.length > 1) {
      //remove rest of old song
      let currentPos = await this.manager.getPosition(this.mixDymoUri);
      let removedBars = (await this.store.removeParts(this.mixDymoUri, currentPos+1)).slice(0, numBars);
      //delay out last bar
      let lastBar = await this.store.findPartAt(this.mixDymoUri, currentPos);
      await this.store.setParameter(lastBar, uris.DELAY, 1);
      //add silence for n bars
      let lastBarDuration = await this.store.findFeatureValue(lastBar, uris.DURATION_FEATURE);
      let emptyBar = await this.generator.addDymo();
      await this.store.setFeature(emptyBar, uris.DURATION_FEATURE, lastBarDuration);
      await Promise.all(_.times(numBars, () => this.store.addPart(this.mixDymoUri, emptyBar)));
    }
    //add new song
    await Promise.all(newSongBars.map(p => this.store.addPart(this.mixDymoUri, p)));
    //currently delays need to be initialized for this to work
    return Promise.all(newSongBars.map(p => this.store.setParameter(p, uris.DELAY, 0)));
  }

  /**returns a number of controls that trigger the transition*/
  private loadAndTriggerTransition(...uris: string[]): Promise<any> {
    return this.manager.loadFromStore(...uris)
      .then(l => {
        //add loaded transition
        this.transitions.push(l.constraintUris);
        //return controls
        return _.values(l.controls);
      })
      .then(controls => {
        //TODO LET SCHEDULER DO THIS!!!!
        setTimeout(() => {

          //stop previous transition
          if (this.transitions.length > 1)
            this.store.deactivateConstraints(this.transitions.slice(-2)[0]);
          //start new transition
          controls.forEach((c:any) => c.startUpdate ? c.startUpdate() : null);
        }, 1000); //arbitrary time TODO REMOVE ONCE DONE WITH EVENTS!!!
      })
  }

  private registerSongAndGetBars(songUri: string): Promise<string[]> {
    this.songs.push(songUri);
    return this.store.findParts(songUri);
  }

  private async makeCrossfade(rampUri: string, oldSongUris: string[], newSongUris: string[]): Promise<string[]> {
    var fadeOut = await this.makeRampConstraint(rampUri, oldSongUris, 'Amplitude(d) == 1-r');
    var fadeIn = await this.makeRampConstraint(rampUri, newSongUris, 'Amplitude(d) == r');
    /*var fadeOut2 = await this.makeRampConstraint(rampUri, oldSongUris, 'DurationRatio(d) == 1/(1-r)');
    var fadeIn2 = await this.makeRampConstraint(rampUri, newSongUris, 'DurationRatio(d) == 1/r');*/
    return [fadeOut, fadeIn].filter(c => c); //remove undefined
  }

  private makeRampConstraint(rampUri: string, dymoUris: string[], expression: string): Promise<string> {
    if (dymoUris.length > 0) {
      return this.makeSetsConstraint([['d',dymoUris], ['r',[rampUri]]], expression);
    }
  }

  private makeSetsConstraint(sets: [string,string[]][], expression: string): Promise<string> {
    let vars = sets.map(s => '∀ '+s[0]+' in '+JSON.stringify(s[1])+' => ').join('');
    return this.expressionGen.addConstraint(this.mixDymoUri, vars+expression, true);
  }

  private async getTempoFromBar(barUri: string): Promise<number> {
    var barDuration = await this.store.findFeatureValue(barUri, uris.DURATION_FEATURE);
    return 60/(barDuration/4);
  }

}