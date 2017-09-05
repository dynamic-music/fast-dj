import * as _ from 'lodash';
import { DymoGenerator } from 'dymo-core';

export class MixGenerator {

  private mixDymoUri: string;

  constructor(private generator: DymoGenerator) {}

  transitionToSong(songDymoUri: string, durationInBars: number): string {
    if (!this.mixDymoUri) {
      this.mixDymoUri = this.generator.addDymo();
    }
    let songParts = this.generator.getStore().findParts(songDymoUri);
    let randomBar = _.random(songParts.length-durationInBars);
    console.log(randomBar)
    songParts.slice(randomBar, randomBar+durationInBars).forEach(p =>
      this.generator.getStore().addPart(this.mixDymoUri, p));
    return this.mixDymoUri;
  }

}