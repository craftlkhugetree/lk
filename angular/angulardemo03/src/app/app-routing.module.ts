import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NewscontentComponent } from './components/newscontent/newscontent.component';
import { ProductcontentComponent } from './components/productcontent/productcontent.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path: 'news',component:NewsComponent},
  {path: 'product',component:ProductComponent},
  {path: 'newscontent/:aid',component:NewscontentComponent},
  {path: 'productcontent/:pid',component:ProductcontentComponent},
  {path:'**',redirectTo:'home'}  //匹配不到时跳转到默认路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
