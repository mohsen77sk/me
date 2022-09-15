import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslocoModule } from '@ngneat/transloco';

import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    TranslocoModule,
  ],
  exports: [ThemeComponent],
})
export class ThemeModule {}
