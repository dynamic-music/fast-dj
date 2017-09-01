import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2FileDropModule } from 'ng2-file-drop';
import {
  FeatureExtractionService
} from './services/feature-extraction/feature-extraction.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2FileDropModule
  ],
  providers: [
    FeatureExtractionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
