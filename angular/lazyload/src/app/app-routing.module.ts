import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'user999',loadChildren:()=>import('./modules/user/user.module').then(mod=>mod.UserModule) //#后是类名，懒加载，无需import
  },
  {
    path:'article',loadChildren:'./modules/article/article.module' //#后是类名，懒加载，无需import
  },
  {
    path:'product',loadChildren:'./modules/product/product.module#ProductModule' //#后是类名，懒加载，无需import
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
