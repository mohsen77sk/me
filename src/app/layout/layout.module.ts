import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LanguagesModule } from './common/languages/languages.module';
import { SchemeModule } from './common/scheme/scheme.module';
import { ThemeModule } from './common/theme/theme.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LanguagesModule,
    SchemeModule,
    ThemeModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
