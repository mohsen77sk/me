import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout';

const routes: Routes = [
  // Redirect empty path to '/resume'
  { path: '', pathMatch: 'full', redirectTo: 'resume' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'resume',
        loadChildren: () =>
          import('./modules/resume/resume.module').then((m) => m.ResumeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
