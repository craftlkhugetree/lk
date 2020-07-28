import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  // { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: 'monitor', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule) }
  {path:'monitor', component:MonitorComponent},
  {path:'welcome', component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
