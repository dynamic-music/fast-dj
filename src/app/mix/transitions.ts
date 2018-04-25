import { DymoGenerator, ExpressionGenerator, DymoStore, uris } from 'dymo-core';

export class Transition {
  constructor(songUri: string, numBars = 8, offsetBar = 8) {

  }
  trigger() {

  }
}

abstract class TimingComponent {
  constructor(protected generator: DymoGenerator, protected store: DymoStore) {}
  abstract apply(mixUri: string, position: number, numBars: number);
}

/*class Align extends TimingComponent {
  async apply(mixUri: string, position: number, newSongBars: string[]) {

  }
}

class Beatmatch extends TimingComponent {

}

async function getTotalDuration(dymoUris: string[]): Promise<number> {
  return _.sum(await this.getFeature(dymoUris, uris.DURATION_FEATURE));
}*/