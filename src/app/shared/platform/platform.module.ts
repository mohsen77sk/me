import { NgModule } from '@angular/core';
import { PlatformService } from './platform.service';

@NgModule({
  providers: [PlatformService],
})
export class PlatformModule {
  /**
   * Constructor
   */
  constructor(private _PlatformService: PlatformService) {}
}
