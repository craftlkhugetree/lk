import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'user',  loadChildren:()=>import('./modules/user/user.module').then(mod=>mod.UserModule) 
  },
  {
    path:'article',loadChildren:()=>import('./modules/article/article.module').then(m=>m.ArticleModule) 
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
