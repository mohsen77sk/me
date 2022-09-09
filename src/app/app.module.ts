import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SplashScreenModule } from './shared/splash-screen';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SplashScreenModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
