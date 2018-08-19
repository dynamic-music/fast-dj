import { Component, OnInit } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { FeatureExtractionService } from './feature-extraction.service';
import { getGuid } from './util';
import { Transition } from './mix/types';
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
  private lastTransitionRating: number = 0;
  private transitionDone: boolean = false;
  private ratingDone: boolean = false;
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
        message: 'loading',
        colour: this.getNextColour()
      }
    };
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

    this.dj = new AutoDj(null, this.extractionService);
    await this.dj.init();
    this.status = 'READY';
    this.message = 'drop audio here';
    this.dj.getBeatObservable()
      .subscribe(b => {
        this.status = this.state.status.type === "SPINNING" ?
          "spinning" : "SPINNING";
      })
  }

  private async dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    //TODO RECATIVATE MANDATORY RATING!!! if (this.ratingDone || this.state.status.type === 'READY') {
      this.transitionDone = false;
      this.ratingDone = false;
      this.lastTransitionRating = 0;
      const url = URL.createObjectURL(acceptedFile.file);
      this.songNames.push(acceptedFile.file.name);
      this.message = ("checking out "+acceptedFile.file.name).toLowerCase();
      this.lastTransition = await this.dj.transitionToSong(url);
      this.message = "transitioning to " + acceptedFile.file.name.toLowerCase();
      //when transition done:
      setTimeout(() => {
        this.transitionDone = true;
        this.message = "playing " + acceptedFile.file.name.toLowerCase();
      }, this.lastTransition.duration*1000 + 3000);
    }
  //}

  private onRatingChange(event) {
    if (this.lastTransition) {
      this.lastTransition.user = getGuid();
      this.lastTransition.rating = event.rating;
      this.lastTransition.names = this.songNames.slice(-2);
      this.apiService.addTransition(this.lastTransition);
      setTimeout(() => this.ratingDone = true, 2000);
    }
  }

  private getNextColour(): string {
    return this.cyclicColours.next().value;
  }

}
