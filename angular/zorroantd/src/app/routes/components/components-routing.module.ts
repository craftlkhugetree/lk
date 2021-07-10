import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsSearchCardComponent } from './search-card/search-card.component';

const routes: Routes = [

  { path: 'searchCard', component: ComponentsSearchCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
