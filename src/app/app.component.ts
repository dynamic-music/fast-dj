import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { DymoGenerator, DymoTemplates, MixGenerator, DymoManager, GlobalVars, uris } from 'dymo-core';
import {
  FeatureExtractionService
} from './services/feature-extraction/feature-extraction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager;
  private isPlaying = false;
  private previousDymos = [];

  constructor(private extractionService: FeatureExtractionService) {
    GlobalVars.LOGGING_ON = true;
    this.manager = new DymoManager();
    this.manager.init('https://semantic-player.github.io/dymo-core/ontologies/')
      .then(() => {
        let store = this.manager.getStore();
        this.dymoGen = new DymoGenerator(store);
        this.mixGen = new MixGenerator(this.dymoGen);
      });
    this.manager.getPlayingDymoUris()
      .subscribe(updatedDymos => {
        if (_.difference(updatedDymos, this.previousDymos).length > 0) {
          console.log(updatedDymos);
        }
        this.previousDymos = updatedDymos;
      });
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    const url = URL.createObjectURL(acceptedFile.file);
    this.manager.getAudioBank().loadBuffer(url)
      .then(buffer => this.extractionService.extractBeats(buffer))
      .then(beats => DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, url, beats))
      .then(newDymo => this.manager.loadFromStore(newDymo)
        .then(() => this.mixGen.transitionToSong(newDymo, 1)))
      .then(mixDymo => this.keepOnPlaying(mixDymo));
  }

  private keepOnPlaying(dymoUri: string) {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.manager.startPlayingUri(dymoUri);
    }
  }

}
