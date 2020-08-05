/*这个是根模块，告诉ng如何组装应用 */

/**浏览器解析的模块 */
import { BrowserModule } from '@angular/platform-browser';
/*ng核心模块*/
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; //引入表单相关模块，才可以用双向数据绑定


/**根组件 */
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';
import { TodolistComponent } from './components/todolist/todolist.component';
//import { NewsComponent } from './src/app/components/news/news.component';

//引入并配置服务
import {StorageService} from './services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { TransitionComponent } from './components/transition/transition.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewnewsComponent } from './components/newnews/newnews.component';
import { HomieComponent } from './components/homie/homie.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';

import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component'

import { BackendService } from './backend.service'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';



/**装饰器接收一个元数据对象，告诉ng如何编译和启动应用 */
@NgModule({
  declarations: [ /**配置当前项目运行的组件 */
    AppComponent, NewsComponent, HomeComponent, FormComponent, SearchComponent, TodolistComponent, HeaderComponent, TransitionComponent, FooterComponent, NewnewsComponent, HomieComponent, LifecycleComponent, ContactListComponent, ContactDetailComponent, 
  ],
  imports: [      /**配置当前模块运行依赖的其他模块 */
    BrowserModule,
    FormsModule,
    // InMemoryWebApiModule.forRoot(BackendService),
    HttpClientInMemoryWebApiModule.forRoot(BackendService),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StorageService],  /**配置项目所需要的服务 */
  bootstrap: [AppComponent]
  /**指定应用的主视图（根组件），通过引导根AppModule来启动应用， */
})

/**根模块不需要导出任何东西，因为其他组件不需要导入根模块  */
export class AppModule { }
