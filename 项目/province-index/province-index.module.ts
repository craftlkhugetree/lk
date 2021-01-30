import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProvinceIndexRoutingModule } from './province-index-routing.module';
import { ProvinceIndexIndexManageComponent } from './index-manage/index-manage.component';
import { ProvinceIndexComprehensiveQueryComponent } from './comprehensive-query/comprehensive-query.component';
import { ProvinceIndexTempSubmittedPlanComponent } from './temp-submitted-plan/temp-submitted-plan.component';
import { ProvinceIndexPlanUploadComponent } from './plan-upload/plan-upload.component';
import { ProvinceIndexPlanVerifyComponent } from './plan-verify/plan-verify.component';
import { ProvinceIndexImplementationUploadComponent } from './implementation-upload/implementation-upload.component';
import { ProvinceIndexImplementationVerifyComponent } from './implementation-verify/implementation-verify.component';
import { ProvinceIndexIndexBatchReleaseComponent } from './index-batch-release/index-batch-release.component';

const COMPONENTS = [
  ProvinceIndexIndexManageComponent,
  ProvinceIndexComprehensiveQueryComponent,
  ProvinceIndexTempSubmittedPlanComponent,
  ProvinceIndexPlanUploadComponent,
  ProvinceIndexPlanVerifyComponent,
  ProvinceIndexImplementationUploadComponent,
  ProvinceIndexImplementationVerifyComponent,
  ProvinceIndexIndexBatchReleaseComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ProvinceIndexRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProvinceIndexModule { }
