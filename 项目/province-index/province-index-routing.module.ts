import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinceIndexIndexManageComponent } from './index-manage/index-manage.component';
import { ProvinceIndexComprehensiveQueryComponent } from './comprehensive-query/comprehensive-query.component';
import { ProvinceIndexTempSubmittedPlanComponent } from './temp-submitted-plan/temp-submitted-plan.component';
import { ProvinceIndexPlanUploadComponent } from './plan-upload/plan-upload.component';
import { ProvinceIndexPlanVerifyComponent } from './plan-verify/plan-verify.component';
import { ProvinceIndexImplementationUploadComponent } from './implementation-upload/implementation-upload.component';
import { ProvinceIndexImplementationVerifyComponent } from './implementation-verify/implementation-verify.component';
import { ProvinceIndexIndexBatchReleaseComponent } from './index-batch-release/index-batch-release.component';

const routes: Routes = [

  { path: 'index-manage', component: ProvinceIndexIndexManageComponent,
  data: { title: '指标管理', reuse: true }, },
  { path: 'comprehensive-query', component: ProvinceIndexComprehensiveQueryComponent,
  data: { title: '综合查询', reuse: true },  },
  { path: 'temp-submitted-plan', component: ProvinceIndexTempSubmittedPlanComponent,
  data: { title: '临时填报计划', reuse: true },  },
  { path: 'plan-upload', component: ProvinceIndexPlanUploadComponent,
  data: { title: '落实计划上报', reuse: true },  },
  { path: 'plan-verify', component: ProvinceIndexPlanVerifyComponent,
  data: { title: '落实计划审核', reuse: true },  },
  { path: 'implementation-upload', component: ProvinceIndexImplementationUploadComponent,
  data: { title: '落实情况上报', reuse: true },  },
  { path: 'implementation-verify', component: ProvinceIndexImplementationVerifyComponent,
  data: { title: '落实情况审核', reuse: true },  },
  { path: 'indexBatchRelease', component: ProvinceIndexIndexBatchReleaseComponent,
  data: { title: '指标批量发布', reuse: true }, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceIndexRoutingModule { }
