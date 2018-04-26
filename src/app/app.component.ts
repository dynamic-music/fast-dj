import { Component, OnInit } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { FeatureExtractionService } from './feature-extraction.service';
import { getGuid } from './util';
import { Transition } from './types';
import { AutoDj } from './mix/auto-dj';

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
  status: StatusIndictator;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  private cyclicColours: Iterator<string>;
  private currentState: AppState;
  private songNames: string[] = [];
  private lastTransition: Transition;
  private lastTransitionRating: number;
  private transitionDone: boolean = false;
  private dj: AutoDj;

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

  constructor(private route: ActivatedRoute,
      private apiService: ApiService,
      private extractionService: FeatureExtractionService) {
    //GlobalVars.LOGGING_ON = true;
    this.cyclicColours = createColourCycleIterator([
      '#5bc0eb',
      '#fde74c',
      '#9bc53d',
      '#e55934',
      '#fa7921'
    ]);
    this.state = {
      inDevMode: false,
      status: {
        type: 'INITIALISING',
        message: 'Loading',
        colour: this.getNextColour()
      }
    };
    this.dj = new AutoDj(null, this.extractionService);
    this.dj.init().then(() => {
      this.status =  'READY';
      this.message = 'Drop audio here'
    });
  }

  async ngOnInit() {
    this.route
    .queryParamMap
    .map(params => {
      this.state = {
        ...this.state,
        inDevMode: params.has('dev')
      };
    })
    .subscribe();

    (await this.dj.getBeatObservable())
    .subscribe(b => {
      this.status = this.state.status.type === "SPINNING" ?
        "spinning" : "SPINNING";
    })
  }

  private async dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.transitionDone = false;
    this.lastTransitionRating = null;
    const url = URL.createObjectURL(acceptedFile.file);
    this.songNames.push(acceptedFile.file.name);
    this.message = ("loading "+acceptedFile.file.name).toLowerCase();
    this.lastTransition = await this.dj.transitionToSong(url);
    this.message = "transitioning to " + acceptedFile.file.name.toLowerCase();
    console.log("duration", this.lastTransition.duration);
    setTimeout(() => {
      this.transitionDone = true;
      this.message = "playing " + acceptedFile.file.name.toLowerCase();
    }, this.lastTransition.duration*1000 + 1000);
  }

  private onRatingChange(event) {
    this.lastTransition.user = getGuid();
    this.lastTransition.rating = event.rating;
    this.lastTransition.names = this.songNames.slice(-2);
    this.apiService.addTransition(this.lastTransition);
  }

  private getNextColour(): string {
    return this.cyclicColours.next().value;
  }

}
