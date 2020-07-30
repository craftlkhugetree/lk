
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
  import { WelcomeComponent } from './components/home/welcome/welcome.component';
  import { SettingComponent } from './components/home/setting/setting.component';
import { ProductComponent } from './components/product/product.component';
  import { PcateComponent } from './components/product/pcate/pcate.component';
  import { PlistComponent } from './components/product/plist/plist.component';
import { NewscontentComponent } from './components/newscontent/newscontent.component';
import { ProductcontentComponent } from './components/productcontent/productcontent.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'setting', component: SettingComponent },
      {path:'**',redirectTo:'welcome'}  //匹配不到时跳转到默认路由
    ]
  },
  {path: 'news',component:NewsComponent},
  {
    path: 'product', component: ProductComponent,
    children: [
      { path: 'pcate', component: PcateComponent },
      { path: 'plist', component: PlistComponent },
      {path:'**',redirectTo:'plist'}  //匹配不到时跳转到默认路由
    ]
  },
  {path: 'newscontent/:aid',component:NewscontentComponent},
  {path: 'productcontent/:pid',component:ProductcontentComponent},
  {path:'**',redirectTo:'home'}  //匹配不到时跳转到默认路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
