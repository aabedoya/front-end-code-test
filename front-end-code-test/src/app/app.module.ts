import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallSelectorComponent } from './ball-selector/ball-selector.component';
import { BetSlipComponent } from './bet-slip/bet-slip.component';

@NgModule({
  declarations: [
    AppComponent,
    BallSelectorComponent,
    BetSlipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
