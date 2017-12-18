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

  getTempo(songUri: string): number {
    const beats = _.flatMap(this.store.findParts(songUri), p => this.store.findParts(p));
    const durations = beats.map(b => this.store.findFeatureValue(b, uris.DURATION_FEATURE));
    console.log("tempo",60/math.mean(durations) )
    return 60/math.mean(durations);
  }

  getTempoRatio(song1Uri: string, song2Uri: string): number {
    console.log("tempo ratio", this.getTempo(song1Uri)/this.getTempo(song2Uri))
    return this.getTempo(song1Uri)/this.getTempo(song2Uri);
  }

  hasRegularBeats(songUri: string): boolean {
    const beats = _.flatMap(this.store.findParts(songUri), p => this.store.findParts(p));
    const durations = beats.map(b => this.store.findFeatureValue(b, uris.DURATION_FEATURE));
    //TODO GET A MEASURE THAT WORKS!!!!
    console.log("regularity", math.std(durations))
    return math.std(durations) < .1;
  }

  tempoSimilar(song1Uri: string, song2Uri: string): boolean {
    const ratio = this.getTempoRatio(song1Uri, song2Uri);
    return this.isSimilar(1, ratio);
  }

  tempoCloseToMultiple(song1Uri: string, song2Uri: string): boolean {
    const ratio = this.getTempoRatio(song1Uri, song2Uri);
    return this.isSimilar(ratio, ratio);
  }

  private isSimilar(n1: number, n2: number): boolean {
    //TODO MAKE POWER-BASED DISTANCE
    return Math.abs(n1 - n2) < .1;
  }

}