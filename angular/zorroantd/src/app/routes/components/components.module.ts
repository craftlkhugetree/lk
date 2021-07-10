import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsSearchCardComponent } from './search-card/search-card.component';

const COMPONENTS = [
  ComponentsSearchCardComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    ComponentsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ComponentsModule { }
