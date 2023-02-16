import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameModule } from '@the-days/game';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, GameComponent],
  imports: [
    BrowserModule,
    GameModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
