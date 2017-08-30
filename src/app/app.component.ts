import { Component } from '@angular/core';
import {Ng2FileDropAcceptedFile} from 'ng2-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    console.warn(acceptedFile);
  }
}
