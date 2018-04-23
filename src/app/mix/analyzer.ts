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

  async getData(song1: string, song2: string) {
    return [
      await this.getTempo(song1),
      await this.getTempo(song2),
      await this.getTempoRatio(song1, song2),
      await this.getTempoRatio(song2, song1),
      await this.getTempoMultiple(song1, song2),
      await this.getTempoMultiple(song2, song1),
      await this.getRegularity(song1),
      await this.getRegularity(song2),
    ]
  }

  getMainSongBody(songUri: string): Pair<number> {
    return {first:0,second:1};
  }

  async getTempo(songUri: string): Promise<number> {
    const durations = await this.getBeatDurations(songUri);
    console.log("tempo", 60/math.mean(durations))
    return 60/math.mean(durations);
  }

  async getTempoMultiple(song1Uri: string, song2Uri: string): Promise<number> {
    const tempoRatio = await this.getTempoRatio(song1Uri, song2Uri);
    return tempoRatio % 1;
  }

  async getTempoRatio(song1Uri: string, song2Uri: string): Promise<number> {
    const tempoRatio = await this.getTempo(song1Uri) / await this.getTempo(song2Uri);
    console.log("tempo ratio", tempoRatio);
    return tempoRatio;
  }

  async hasRegularBeats(songUri: string): Promise<boolean> {
    return await this.getRegularity(songUri) < .1;
  }

  async getRegularity(songUri: string): Promise<number> {
    const durations = await this.getBeatDurations(songUri);
    return math.std(durations);
  }

  async tempoSimilar(song1Uri: string, song2Uri: string): Promise<boolean> {
    const ratio = await this.getTempoRatio(song1Uri, song2Uri);
    return this.isSimilar(1, ratio);
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