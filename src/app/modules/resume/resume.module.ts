import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';

import { ResumeComponent } from './resume.component';

const routes: Route[] = [
  {
    path: '',
    component: ResumeComponent,
  },
];

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    TranslocoModule,
  ],
})
export class ResumeModule {}
