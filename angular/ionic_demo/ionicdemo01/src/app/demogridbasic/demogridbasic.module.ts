import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemogridbasicPageRoutingModule } from './demogridbasic-routing.module';

import { DemogridbasicComponent } from './demogridbasic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemogridbasicPageRoutingModule
  ],
  declarations: [DemogridbasicComponent]
})
export class DemogridbasicPageModule {}
