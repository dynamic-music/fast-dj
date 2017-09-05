import * as _ from 'lodash';
import { DymoGenerator, ExpressionGenerator, DymoManager, uris } from 'dymo-core';

export class MixGenerator {

  private mixDymoUri: string;
  private expressionGen;

  constructor(private generator: DymoGenerator, private manager: DymoManager) {
    this.expressionGen = new ExpressionGenerator(generator.getStore());
  }

  getMixDymo() {
    return this.mixDymoUri;
  }

  transitionImmediatelyToRandomBars(songDymoUri: string, durationInBars: number): string {
    if (!this.mixDymoUri) {
      this.mixDymoUri = this.generator.addDymo();
    }
    let songParts = this.generator.getStore().findParts(songDymoUri);
    let randomBar = _.random(songParts.length-durationInBars);
    songParts.slice(randomBar, randomBar+durationInBars).forEach(p =>
      this.generator.getStore().addPart(this.mixDymoUri, p));
    return this.mixDymoUri;
  }

  transitionImmediatelyByCrossfade(songDymoUri: string, duration: number): string {
    if (!this.mixDymoUri) {
      this.mixDymoUri = this.generator.addDymo();
    }
    let newSongParts = this.generator.getStore().findParts(songDymoUri);

    let currentPosition = this.manager.getNavigatorPosition(this.mixDymoUri, 1);
    console.log(currentPosition)

    let removedParts;

    if (currentPosition) {
      removedParts = this.generator.getStore().removeParts(this.mixDymoUri, currentPosition+1);

      _.range(0, duration).forEach(i => {
        var currentTransitionPart = this.generator.addDymo(this.mixDymoUri, null, uris.CONJUNCTION);
        this.generator.getStore().addPart(currentTransitionPart, removedParts[i]);
        this.generator.getStore().addPart(currentTransitionPart, newSongParts[i]);
      });
    }

    newSongParts.slice(duration).forEach(p => this.generator.getStore().addPart(this.mixDymoUri, p));

    let ramp = this.generator.addControl('', uris.RAMP);

    this.expressionGen.addConstraint(this.mixDymoUri,
      '∀ d in '+JSON.stringify(removedParts)+' => ∀ r in ["'+ramp+'"] => Amplitude(x) == 1-r');

    this.expressionGen.addConstraint(this.mixDymoUri,
      '∀ d in '+JSON.stringify(newSongParts)+' => ∀ r in ["'+ramp+'"] => Amplitude(x) == r');

    //TODO LOAD CONSTRAINTS

    return this.mixDymoUri;
  }

}