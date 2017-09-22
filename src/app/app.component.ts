import { Component, OnInit } from '@angular/core';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { ActivatedRoute } from '@angular/router';
import { FeatureExtractionService } from './feature-extraction.service';
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

  constructor(private route: ActivatedRoute, private extractionService: FeatureExtractionService) {
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
    this.dj.getBeatObservable().subscribe(b => {
      this.status = this.state.status.type === "SPINNING" ?
        "spinning" : "SPINNING";
    })
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
    this.message = ("loading "+acceptedFile.file.name).toLowerCase();
    this.dj.transitionToSong(url)
      .then(() => this.message = acceptedFile.file.name.toLowerCase());
  }

  private getNextColour(): string {
    return this.cyclicColours.next().value;
  }
}
