import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemogridbasicComponent } from './demogridbasic.page';

const routes: Routes = [
  {
    path: '',
    component: DemogridbasicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemogridbasicPageRoutingModule {}
