import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, uris } from 'dymo-core';
import { MixGenerator } from './mix/mix-generator';
import {
  FeatureExtractionService
} from './services/feature-extraction/feature-extraction.service';

function* createColourCycleIterator(colours: string[]) {
  let index = 0;
  const nColours = colours.length;
  while (true) {
    yield colours[index = ++index % nColours];
  }
}

interface StatusIndictator {
  colour: string;
  message: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager; 
  private isPlaying = false;
  private previousDymos = [];
  private currentStatus: StatusIndictator;
  private cyclicColours: Iterator<string>;
  private set status(type: string) {
    this.currentStatus = {
      ...this.currentStatus,
      type
    };
  }
  private set message(message: string) {
    this.currentStatus = {
      ...this.currentStatus,
      colour: this.getNextColour(),
      message
    };
  }

  constructor(private extractionService: FeatureExtractionService) {
    //GlobalVars.LOGGING_ON = true;
    this.cyclicColours = createColourCycleIterator([
      '#5bc0eb',
      '#fde74c',
      '#9bc53d',
      '#e55934',
      '#fa7921'
    ]);
    this.currentStatus = {
      type: 'INITIALISING',
      message: 'Loading',
      colour: this.getNextColour()
    };
    this.manager = new DymoManager(undefined, 1, null, null, 'https://semantic-player.github.io/dymo-core/audio/impulse_rev.wav');
    this.manager.init('https://semantic-player.github.io/dymo-core/ontologies/')
      .then(() => {
        let store = this.manager.getStore();
        this.dymoGen = new DymoGenerator(store);
        this.mixGen = new MixGenerator(this.dymoGen, this.manager);
        this.status =  'READY';
        this.message = 'Drop audio here'
      });
    this.manager.getPlayingDymoUris()
      .subscribe(updatedDymos => {
         // TODO identify which track is playing, and associate with a specific colour
        const nChanged = _.difference(updatedDymos, this.previousDymos).length;
        if (nChanged > 0) {
          this.status = this.currentStatus.type == "SPINNING" ? "spinning" : "SPINNING";
        } 
        this.previousDymos = updatedDymos;
      });
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    const url = URL.createObjectURL(acceptedFile.file);
    this.message = _.toLower("loading "+acceptedFile.file.name);
    //console.log("loading "+acceptedFile.file.name, this.manager.getStore().size())
    this.manager.getAudioBank().loadBuffer(url)
      .then(buffer => this.extractionService.extractBeats(buffer))
      .then(beats => DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, url, beats))
      .then(newDymo => this.manager.loadFromStore(newDymo)
        .then(() => this.mixGen.transitionImmediatelyByCrossfade(newDymo)))
      .then(() => this.keepOnPlaying(this.mixGen.getMixDymo()))
      .then(() => this.message = _.toLower(acceptedFile.file.name));
  }

  private keepOnPlaying(dymoUri: string) {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.manager.startPlayingUri(dymoUri);
    }
  }

  private getNextColour(): string {
    return this.cyclicColours.next().value;
  }
}
