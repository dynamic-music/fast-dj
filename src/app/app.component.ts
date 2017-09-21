import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { DymoGenerator, DymoTemplates, DymoManager, GlobalVars, uris } from 'dymo-core';
import { MixGenerator } from './mix/mix-generator';
import { FeatureExtractionService } from './feature-extraction.service';
import { ActivatedRoute } from '@angular/router';

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

interface AppState {
  inDevMode: boolean;
  isPlaying: boolean;
  status: StatusIndictator;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  private dymoGen: DymoGenerator;
  private mixGen: MixGenerator;
  private manager: DymoManager; 
  private previousDymos = [];
  private cyclicColours: Iterator<string>;
  private currentState: AppState;

  private get state(): AppState {
    return this.currentState;
  }
  private set state(newState: AppState) {
    this.currentState = newState;
  }

  private set status(type: string) {
    const status = {
      ...this.state.status,
      type
    };
    this.state = {
      ...this.state,
      status
    };
  }
  private set message(message: string) {
    const status = {
      ...this.state.status,
      colour: this.getNextColour(),
      message
    };
    this.state = {
      ...this.state,
      status
    };
  }

  constructor(private extractionService: FeatureExtractionService,
              private route: ActivatedRoute) {
    //GlobalVars.LOGGING_ON = true;
    this.cyclicColours = createColourCycleIterator([
      '#5bc0eb',
      '#fde74c',
      '#9bc53d',
      '#e55934',
      '#fa7921'
    ]);
    this.state = {
      isPlaying: false,
      inDevMode: false,
      status: {
        type: 'INITIALISING',
        message: 'Loading',
        colour: this.getNextColour()
      }
    };
    this.manager = new DymoManager(
      undefined,
      1,
      null,
      null,
      'https://semantic-player.github.io/dymo-core/audio/impulse_rev.wav'
    );
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
          this.status = this.state.status.type === "SPINNING" ? 
            "spinning" : "SPINNING";
        } 
        this.previousDymos = updatedDymos;
      });
  }

  ngOnInit() {
    this.route
    .queryParamMap
    .map(params => {
      this.state = {
        ...this.state,
        inDevMode: params.has('dev')
      };
    })
    .subscribe();
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
    if (!this.state.isPlaying) {
      this.state = {
        ...this.state,
        isPlaying: true
      };
      this.manager.startPlayingUri(dymoUri);
    }
  }

  private getNextColour(): string {
    return this.cyclicColours.next().value;
  }
}
