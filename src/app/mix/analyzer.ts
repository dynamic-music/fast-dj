import * as _ from 'lodash';
import * as math from 'mathjs';
import { DymoStore, uris } from 'dymo-core';

export interface Pair<T> {
  first: T,
  second: T
}

export class Analyzer {

  //TODO private resultsCache = Map<string,

  constructor(private store: DymoStore) {}

  getMainSongBody(songUri: string): Pair<number> {
    return {first:0,second:1};
  }

  async getTempo(songUri: string): Promise<number> {
    const durations = await this.getBeatDurations(songUri);
    console.log("tempo", 60/math.mean(durations))
    return 60/math.mean(durations);
  }

  async getTempoRatio(song1Uri: string, song2Uri: string): Promise<number> {
    const tempoRatio = await this.getTempo(song1Uri) / await this.getTempo(song2Uri);
    console.log("tempo ratio", tempoRatio);
    return tempoRatio;
  }

  async hasRegularBeats(songUri: string): Promise<boolean> {
    const durations = await this.getBeatDurations(songUri);
    //TODO GET A MEASURE THAT WORKS!!!!
    console.log("regularity", math.std(durations))
    return math.std(durations) < .1;
  }

  async tempoSimilar(song1Uri: string, song2Uri: string): Promise<boolean> {
    const ratio = await this.getTempoRatio(song1Uri, song2Uri);
    return this.isSimilar(1, ratio);
  }

  async tempoCloseToMultiple(song1Uri: string, song2Uri: string): Promise<boolean> {
    const ratio = await this.getTempoRatio(song1Uri, song2Uri);
    return this.isSimilar(ratio, ratio);
  }

  private isSimilar(n1: number, n2: number): boolean {
    //TODO MAKE POWER-BASED DISTANCE
    return Math.abs(n1 - n2) < .1;
  }

  private async getBeatDurations(songUri: string): Promise<number[]> {
    const beats = await this.getBeats(songUri);
    return await Promise.all(beats.map(b => this.store.findFeatureValue(b, uris.DURATION_FEATURE)));
  }

  private async getBeats(songUri: string): Promise<string[]> {
    const bars = await this.store.findParts(songUri);
    return _.flatten(await Promise.all(bars.map(p => this.store.findParts(p))));
  }

}