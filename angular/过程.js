1~~ 安装
node.js
node-v
npm -v
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install -g @angular/cli
ng v       


cmd:where node  
gnvm install 12.0.0
gnvm update latest      <n stable    or   n v12.0 >
gnvm ls
gnvm use 14.4.0


ng new projectName
npm i  安装依赖太慢，进入目录后用 cnpm install即可，依赖列表在package.json
或者 ng new projectName --skip-install


ng serve --open 编译并启动服务器



2~~ 
各目录和文件的功能，比如要支持IE 9-11,就在browserslist里删除not
ng g component components/news  增加一个组件news
新建的组件扩展了html的标签

3~~
news组件
类里面没有var声明数据，而都是属性，默认public;ts object各属性间用逗号隔开
angular模板里面绑定数据、属性、html，动态数据要加中括号，angular模板里面允许简单运算。
angular模板里面循环,*ngFor="let item of arr"里的item和arr很关键

4~~
home组件
循环数据，显示数据索引：*ngFor="let item of list;let key=index;"
*ngIf="!flag"
ngswitch条件判断
[ngClass]="{'red':true}"
*ngFor="let item of list;let key=index;" [ngClass]="{'red': key==0}"
管道：{{today| date:'yyyy-MM-dd HH:mm:ss'}}
表单事件，响应，keydown鼠标按下，keyup鼠标弹起
双向数据绑定只针对表单--MVVM,业务逻辑的数据是model,而这些html是视图
<input type="text" [(ngModel)]="keywords" />
<button (click)="changeKeywords()">改变keywords</button>
import {FormsModule} from '@angular/forms'; //引入表单相关模块，才可以用双向数据绑定
imports: [      /**配置当前模块运行依赖的其他模块 */
    BrowserModule,
    FormsModule,
  ],

5~~
form组件
获取表单里的值,人员等级，预约功能
()绑定事件，[]绑定动态属性
input radio select checkbox textarea的双向数据绑定ngmodel

6~~
search组件，todolist组件
搜索缓存数据，实现一个toDoList

7~~
search组件，todolist组件,Storage服务
实现todolist数据持久化
公共的方法定义到service，否则不同组件之间无法调用方法。服务之间可以相互调用。组件之间，只有父子组件可以传值。
先创建一个服务，引入创建的服务并声明，在用到的组件里还需要引入服务，初始化并使用服务
指定any类型很好用，能够避免很多报错，当然如果类型确定那就用它的类型。
(change)="checkboxch()" 触发事件，然后去ts里编写checkboxch()函数

8~~
home组件
ngAfterViewInit():  视图加载以后触发的方法，建议dom操作放在这里
ngOnInit(): /**指令和组件初始化完成，并不是真正的dom加载完成 */
news组件
viewchild获取dom节点：
(1)在模板中给dom起一个名字<div #myBox></div>
(2)在业务逻辑里引入ViewChild
import {Component, OnInit, ViewChild} from '@angular/core';
(3)写在类里面 @ViewChild('myBox') myBox:Any;
(4)在生命周期函数 ngAfterViewInit()里面获取dom
this.myBox.nativeElement
header组件
父组件通过ViewChild调用子组件的方法
transition组件 
动画， 侧边栏

9~~
组件通讯
父组件给子组件传值：（1）子组件可以获得父组件的数据（2）子组件可以执行父组件的方法
子组件给父组件传值：（1）父组件可以获得子组件的数据（2）。。。
非父子组件：（1）组件之间传值（2）共享方法