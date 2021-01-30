import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketValueTargetDepadminComponent } from './depadmin/depadmin.component';
import { MarketValueTargetIndexmainComponent } from './indexmain/indexmain.component';
import { MarketValueTargetIndexreleaseComponent } from './indexrelease/indexrelease.component';
import { MarketValueTargetAuditplanComponent } from './auditplan/auditplan.component';
import { MarketValueTargetSituationComponent } from './situation/situation.component';
import { MarketValueTargetQuerycomComponent } from './querycom/querycom.component';
import { MarketValueTargetYearscoreComponent } from './yearscore/yearscore.component';
import { MarketValueTargetYearscoreExComponent } from './yearscore-ex/yearscore-ex.component';
import { MarketValueTargetYearqueryComponent } from './yearquery/yearquery.component';
import { MarketValueTargetImplementReportComponent } from './implement-report/implement-report.component';
import { MarketValueTargetImplementationReportComponent } from './implementation-report/implementation-report.component';

const routes: Routes = [

  { 
    path: 'depadmin', 
    component: MarketValueTargetDepadminComponent,
    data: { title: '部门管理', reuse: true },
   },
  { 
    path: 'indexmain', 
    component: MarketValueTargetIndexmainComponent,
    data: { title: '指标管理', reuse: true },
   },
  { 
    path: 'indexrelease', 
    component: MarketValueTargetIndexreleaseComponent,
    data: { title: '指标批量发布', reuse: true },
   },
  { 
    path: 'auditplan', 
  component: MarketValueTargetAuditplanComponent,
  data: { title: '落实计划审核', reuse: true },
 },
  { 
    path: 'situation', 
    component: MarketValueTargetSituationComponent,
    data: { title: '落实情况审核', reuse: true },
   },
  { 
    path: 'querycom', 
    component: MarketValueTargetQuerycomComponent,
    data: { title: '指标综合查询', reuse: true },
   },
  { 
    path: 'yearscore', 
    component: MarketValueTargetYearscoreComponent,
    data: { title: '年终评分', reuse: true },
   },
  { 
    path: 'yearscoreEx', 
    component: MarketValueTargetYearscoreExComponent,
    data: { title: '年终评分预审', reuse: true },
   },
  { 
    path: 'yearquery', 
    component: MarketValueTargetYearqueryComponent,
    data: { title: '分析展示', reuse: true },
  }
  ,
  { 
    path: 'implement-report', 
    component: MarketValueTargetImplementReportComponent,
    data: { title: '落实计划上报', reuse: true },
   },
  { 
    path: 'implementation-report', 
    component: MarketValueTargetImplementationReportComponent,
    data: { title: '落实情况上报', reuse: true },
   }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketValueTargetRoutingModule { }
