import * as _ from 'lodash';
import { Component } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, uris } from 'dymo-core';
import { MixGenerator } from './mix/mix-generator';
import {
  FeatureExtractionService
} from './services/feature-extraction/feature-extraction.service';

function* createColourCycleIterator(colours) {
  let index = 0;
  const nColours = colours.length;
  while (true) {
    yield colours[index = ++index % nColours];
  }
}

interface IndicatorStyle {
  isBeat: boolean;
  colour: string;
}

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
  private currentStyle: IndicatorStyle;
  private cyclicColours: Iterator<string>;

  constructor(private extractionService: FeatureExtractionService) {
    GlobalVars.LOGGING_ON = true;
    this.cyclicColours = createColourCycleIterator([
      '#5bc0eb',
      '#fde74c',
      '#9bc53d',
      '#e55934',
      '#fa7921'
    ]);
    this.currentStyle = {
      isBeat: false,
      colour: this.getNextColour()
    };
    this.manager = new DymoManager();
    this.manager.init('https://semantic-player.github.io/dymo-core/ontologies/')
      .then(() => {
        let store = this.manager.getStore();
        this.dymoGen = new DymoGenerator(store);
        this.mixGen = new MixGenerator(this.dymoGen, this.manager);
      });
    this.manager.getPlayingDymoUris()
      .subscribe(updatedDymos => {
         // TODO identify which track is playing, and associate with a specific colour
        const nChanged = _.difference(updatedDymos, this.previousDymos).length;
        if (nChanged > 0) {
          const trackChanged = nChanged === this.previousDymos.length;
          const colour = trackChanged ? 
            this.getNextColour() : this.currentStyle.colour;
            this.currentStyle = {
              colour,
              isBeat: true
            };
        } else {
          this.currentStyle = {
            ...this.currentStyle,
            isBeat: false
          };
        }
        this.previousDymos = updatedDymos;
      });
  }

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    const url = URL.createObjectURL(acceptedFile.file);
    this.manager.getAudioBank().loadBuffer(url)
      .then(buffer => this.extractionService.extractBeats(buffer))
      .then(beats => DymoTemplates.createAnnotatedBarAndBeatDymo2(this.dymoGen, url, beats))
      .then(newDymo => this.manager.loadFromStore(
          newDymo
        ).then(() => this.mixGen.transitionImmediatelyToRandomBars(newDymo, 2))
      )
      .then(mixDymo => this.keepOnPlaying(mixDymo));
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
