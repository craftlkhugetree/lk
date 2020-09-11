import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { PagesRoutingModule } from './pages-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TableSortCombineComponent } from './table-sort-combine/table-sort-combine.component';
import { WorkplaceComponent } from './workplace/workplace.component';
// import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { BackendgetComponent } from './backendget/backendget.component'; // <-- NgModel lives here
// import { BackendService } from '../services/backend.service'
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { ExceltxtComponent } from './exceltxt/exceltxt.component';
import { ExcelComponent } from './excel/excel.component'




@NgModule({
  declarations: [MonitorComponent,WelcomeComponent, TableSortCombineComponent, WorkplaceComponent, BackendgetComponent, ExceltxtComponent, ExcelComponent ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(BackendService),
    // NzRadioModule
  ]
})
export class PagesModule { }
