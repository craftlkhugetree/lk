import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { PagesRoutingModule } from './pages-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [MonitorComponent,WelcomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgZorroAntdModule
  ]
})
export class PagesModule { }
