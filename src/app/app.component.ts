import { Component } from '@angular/core';
import {Ng2FileDropAcceptedFile} from 'ng2-file-drop';
import { DymoGenerator, ExpressionGenerator, DymoManager, uris } from 'dymo-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private dymoGen: DymoGenerator;
  private exprGen: ExpressionGenerator;
  private manager: DymoManager;

  constructor() {
    this.dymoGen = new DymoGenerator();
    this.exprGen = new ExpressionGenerator(this.dymoGen.getManager().getStore());
    this.manager = this.dymoGen.getManager();
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    const url = URL.createObjectURL(acceptedFile.file);
    console.warn(url);

    

    const newDymoUri = this.dymoGen.addDymo(null, url);

    //scheduleGen.generateTransition(uris.IMMEDIATE, newDymoUri)
    //scheduleGen.generateTransition(uris.CROSSFADE, newDymoUri)
    //scheduleGen.generateTransition(uris.BEATMATCH, newDymoUri)
    //IF NOTHING PLAYING YET, SIMPLY ADD, ELSE MAKE TRANSITION

    const rampUri = this.dymoGen.addControl(null, uris.BROWNIAN);
    const constraintUri = this.exprGen.addConstraint(newDymoUri, `
      ∀ d in ["`+newDymoUri+`"]
      => ∀ c in ["`+rampUri+`"]
      => Amplitude(d) == c
    `);
    //this.scheduleGen
    this.manager.loadFromStore(newDymoUri, rampUri, constraintUri)
      .then(() => {
        this.manager.startPlaying();
      });
  }
}
