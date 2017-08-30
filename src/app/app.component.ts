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
  private isPlaying = false;

  constructor() {
    this.dymoGen = new DymoGenerator();
    this.exprGen = new ExpressionGenerator(this.dymoGen.getManager().getStore());
    this.manager = this.dymoGen.getManager();
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    const url = URL.createObjectURL(acceptedFile.file);
    console.warn(url);
    const newDymoUri = this.dymoGen.addDymo(null, url);
    let rampUri = this.dymoGen.addControl(null, uris.RANDOM);
    this.exprGen.addConstraint(newDymoUri, `
      ∀ d in ["`+newDymoUri+`"]
      => ∀ c in ["`+rampUri+`"]
      => Amplitude(d) == c
    `);
    this.manager.reloadFromStore()
      .then(() => {
        if (!this.isPlaying) {
          this.manager.startPlaying();
          this.isPlaying = true;
        }
      });
  }
}
