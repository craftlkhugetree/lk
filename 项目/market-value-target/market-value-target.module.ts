import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MarketValueTargetRoutingModule } from './market-value-target-routing.module';
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

const COMPONENTS = [
  MarketValueTargetDepadminComponent,
  MarketValueTargetIndexmainComponent,
  MarketValueTargetIndexreleaseComponent,
  MarketValueTargetAuditplanComponent,
  MarketValueTargetSituationComponent,
  MarketValueTargetQuerycomComponent,
  MarketValueTargetYearscoreComponent,
  MarketValueTargetYearscoreExComponent,
  MarketValueTargetYearqueryComponent,
  MarketValueTargetImplementReportComponent,
  MarketValueTargetImplementationReportComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MarketValueTargetRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MarketValueTargetModule { }
