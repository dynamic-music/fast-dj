import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2FileDropModule } from 'ng2-file-drop';
import { ApiService } from './api.service';
import { RouterModule } from '@angular/router';
import { DevControlsComponent } from './dev-controls/dev-controls.component';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    DevControlsComponent
  ],
  imports: [
    BrowserModule,
    Ng2FileDropModule,
    RouterModule.forRoot([]),
    StarRatingModule.forRoot()
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
