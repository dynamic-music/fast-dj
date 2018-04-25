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
  private newUris: string[];

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

  async startMixWithFadeIn(songUri: string, numBars = 8) {
    let newSongBars = await this.registerSongAndGetBars(songUri);
    await this.addPartsToMix(newSongBars);
    let constraints = await this.applyFadeIn(newSongBars.slice(0, numBars));
    return this.loadAndTriggerTransition(...constraints);
  }

  async direct(songUri: string, offsetBars = 8): Promise<any> {
    let newSongBars = await this.registerSongAndGetBars(songUri)
    newSongBars = newSongBars.slice(offsetBars);
    let currentPos = await this.manager.getPosition(this.mixDymoUri);
    await this.store.removeParts(this.mixDymoUri, currentPos+1);
    return this.addPartsToMix(newSongBars);
  }

  async powerDown() {

  }

  async echoFreeze(songUri: string, numBarsBreak = 2): Promise<any> {
    let newSongBars = await this.registerSongAndGetBars(songUri);
    //remove rest of old song
    let currentPos = await this.manager.getPosition(this.mixDymoUri);
    await this.store.removeParts(this.mixDymoUri, currentPos+1);
    //delay out last bar
    let lastBar = await this.store.findPartAt(this.mixDymoUri, currentPos);
    await this.store.setParameter(lastBar, uris.DELAY, 1);
    //add silence for n bars
    let lastBarDuration = await this.store.findFeatureValue(lastBar, uris.DURATION_FEATURE);
    let emptyBar = await this.generator.addDymo();
    await this.store.setFeature(emptyBar, uris.DURATION_FEATURE, lastBarDuration);
    await this.addPartsToMix(_.fill(Array(numBarsBreak), emptyBar));
    //add new song
    return this.addPartsToMix(newSongBars);
    //currently delays need to be initialized for this to work
    //return Promise.all(newSongBars.map(p => this.store.setParameter(p, uris.DELAY, 0)));
  }

  async crossfade(songUri: string, numBars = 8, offsetBars = 8) {
    let newSongBars = await this.registerSongAndGetBars(songUri);
    newSongBars = newSongBars.slice(offsetBars);
    let currentPos = await this.manager.getPosition(this.mixDymoUri);
    let restOfOldSong = await this.store.removeParts(this.mixDymoUri, currentPos+1);
    let newSongTrans = newSongBars.slice(0, numBars);
    let oldSongTrans = await this.applyAlign(restOfOldSong, newSongTrans);
    await this.addPartsToMix(newSongBars.slice(numBars));
    let constraints = await this.applyCrossfade(oldSongTrans, newSongTrans);
    return this.loadAndTriggerTransition(...constraints);
  }

  async beatmatchCrossfade(songUri: string, numBars = 8, offsetBars = 8) {
    let newSongBars = await this.registerSongAndGetBars(songUri)
    newSongBars = newSongBars.slice(offsetBars);
    let currentPos = await this.manager.getPosition(this.mixDymoUri);
    let restOfOldSong = await this.store.removeParts(this.mixDymoUri, currentPos+1);
    let newSongTrans = newSongBars.slice(0, numBars);
    let oldSongTrans = await this.applyPairwiseAlign(restOfOldSong, newSongTrans);
    console.log(oldSongTrans.length, newSongTrans.length)
    await this.addPartsToMix(newSongBars.slice(numBars));
    let uris1 = await this.applyCrossfade(oldSongTrans, newSongTrans);
    let uris2 = await this.applyBeatmatch(oldSongTrans, newSongTrans, uris1[0]);
    return this.loadAndTriggerTransition(...uris1, ...uris2)
    /*  .then(async () => {
        console.log("triples", await this.store.size());
        console.log("observers", await this.store.getValueObserverCount());
      });*/
  }

  async addPartsToMix(parts: string[]) {
    return Promise.all(parts.map(p => this.store.addPart(this.mixDymoUri, p)));
  }

  //returns uris of parts of old song that are part of transition
  async applyAlign(restOfOldSong: string[], newSongTransitionBars: string[]): Promise<string[]> {
    //only keep the bars needed for the transition
    //TODO MAKE DURATION DEPENDENT ON NEW SONG!!!!
    let oldSongBars = restOfOldSong.slice(0, newSongTransitionBars.length);
    let oldSongSeq = await this.generator.addDymo(null, null, uris.SEQUENCE);
    await Promise.all(oldSongBars.map(p => this.store.addPart(oldSongSeq, p)));
    let newSongSeq = await this.generator.addDymo(null, null, uris.SEQUENCE);
    await Promise.all(newSongTransitionBars.map(p => this.store.addPart(newSongSeq, p)));
    await this.generator.addConjunction(this.mixDymoUri, [oldSongSeq, newSongSeq]);
    return oldSongBars;
  }

  async applyPairwiseAlign(restOfOldSong: string[], newSongTransitionBars: string[]) {
    let oldSongBars = restOfOldSong.slice(0, newSongTransitionBars.length);
    let barPairs = _.zip(oldSongBars, newSongTransitionBars);
    barPairs.forEach(bp => this.generator.addConjunction(this.mixDymoUri, bp));
    return oldSongBars;
  }

  async applyBeatmatch(oldSongBars: string[], newSongBars: string[], rampUri: string) {
    //create tempo transition
    let tempoParam = await this.generator.addCustomParameter(uris.CONTEXT_URI+"Tempo");
    let newTempo = await this.getTempoFromBars(newSongBars);
    let oldTempo = await this.getTempoFromBars(oldSongBars);
    let tempoTransition = await this.makeSetsConstraint(
      [['t',[tempoParam]], ['r',[rampUri]]], 't == r*'+newTempo+'+(1-r)*'+oldTempo);
    //create beatmatch
    let beats = _.flatten(await Promise.all(oldSongBars.concat(newSongBars).map(p => this.store.findParts(p))));
    let beatMatch = await this.makeSetsConstraint(
      [['d',beats], ['t',[tempoParam]]], 'PlaybackRate(d) == t/60*DurationFeature(d)');
    let beatMatch2 = await this.makeSetsConstraint(
      [['d',beats], ['t',[tempoParam]]], 'DurationRatio(d) == 1/PlaybackRate(d)');
    console.log("beatmatched between tempos", oldTempo, newTempo);
    return [tempoTransition, beatMatch, beatMatch2];
  }

  async applyFadeIn(newSongBarsParts: string[]) {
    let fadeDuration = await this.getTotalDuration(newSongBarsParts);
    let fadeRamp = await this.generator.addRampControl(0, fadeDuration, 200);
    let fadeIn = await this.makeRampConstraint(fadeRamp, newSongBarsParts, 'Amplitude(d) == r');
    console.log("fading in for", newSongBarsParts.length, "bars ("+fadeDuration+" seconds)")
    return [fadeRamp, fadeIn]
  }

  async applyCrossfade(oldSongParts: string[], newSongParts: string[]) {
    //this duration calculation works even for tempointerpolated beatmatch!
    let fadeDuration = (await this.getTotalDuration(oldSongParts.concat(newSongParts))/2);
    let fadeRamp = await this.generator.addRampControl(0, fadeDuration, 200);
    let fadeIn = await this.makeRampConstraint(fadeRamp, newSongParts, 'Amplitude(d) == r');
    let fadeOut = await this.makeRampConstraint(fadeRamp, oldSongParts, 'Amplitude(d) == 1-r');
    console.log("crossfading in for", newSongParts.length, "bars (", fadeDuration, "seconds)");
    return [fadeRamp, fadeIn, fadeOut];
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
        }, 3000); //arbitrary time TODO REMOVE ONCE DONE WITH EVENTS!!!
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

  private async getTempoFromBars(barUris: string[]): Promise<number> {
    let avgDuration = _.mean(await this.getFeature(barUris, uris.DURATION_FEATURE));
    return 60/(avgDuration/4);
  }

  private async getTotalDuration(dymoUris: string[]): Promise<number> {
    return _.sum(await this.getFeature(dymoUris, uris.DURATION_FEATURE));
  }

  private async getFeature(dymoUris: string[], featureUri: string): Promise<number[]> {
    return Promise.all(dymoUris.map(d => this.store.findFeatureValue(d, featureUri)));
  }

}