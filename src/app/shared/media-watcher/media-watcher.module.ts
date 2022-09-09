import { NgModule } from '@angular/core';
import { MediaWatcherService } from './media-watcher.service';

@NgModule({
  providers: [MediaWatcherService],
})
export class MediaWatcherModule {
  /**
   * Constructor
   */
  constructor(private _mediaWatcherService: MediaWatcherService) {}
}
