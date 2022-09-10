import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule, layoutConfig } from './layout';
import { ConfigModule } from './shared/config';
import { MediaWatcherModule } from './shared/media-watcher';
import { SplashScreenModule } from './shared/splash-screen';
import { AppTranslocoModule } from './shared/transloco';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Utils
    ConfigModule.forRoot(layoutConfig),
    MediaWatcherModule,
    SplashScreenModule,
    AppTranslocoModule,

    // Layout module of your application
    LayoutModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
