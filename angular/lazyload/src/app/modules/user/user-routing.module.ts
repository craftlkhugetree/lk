import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

import { AddressComponent } from './components/address/address.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path:'',component:UserComponent,
    children:[
      {path:'profile',component:ProfileComponent},
    ]
  },

  {
    path:'components/address',component:AddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
