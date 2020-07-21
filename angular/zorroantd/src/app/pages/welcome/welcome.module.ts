import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

// import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  // imports: [WelcomeRoutingModule,NzTableModule],
  imports: [WelcomeRoutingModule,NgZorroAntdModule,CommonModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
