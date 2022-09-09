import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule, layoutConfig } from './layout';
import { ConfigModule } from './shared/config';
import { MediaWatcherModule } from './shared/media-watcher';
import { SplashScreenModule } from './shared/splash-screen';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Services
    ConfigModule.forRoot(layoutConfig),
    MediaWatcherModule,
    SplashScreenModule,

    // Layout module of your application
    LayoutModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
