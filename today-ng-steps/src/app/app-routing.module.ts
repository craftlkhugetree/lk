import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';
import { InitGuardService } from './services/init-guard/init-guard.service';

const routes: Routes = [
  { path: 'setup', component: SetupComponent, canActivate: [ InitGuardService ] },
  { path: 'main', redirectTo: '/main', pathMatch: 'full' },
  { path: 'summary', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  // { path: '**', redirectTo: '/setup', pathMatch: 'full' }, //这一句阻碍了main打开模态，使得所有都转到setup，所以路由守卫里的console url只有/setup
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
