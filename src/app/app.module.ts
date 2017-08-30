import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2FileDropModule }  from 'ng2-file-drop';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2FileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
