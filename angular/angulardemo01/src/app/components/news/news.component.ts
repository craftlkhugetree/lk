import { Component, OnInit, ViewChild } from '@angular/core';
import { Xliff2 } from '@angular/compiler';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
 
  @ViewChild('myBox') myBox:any;  //获取dom节点
  @ViewChild('header') header:any;  //获取子组件
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.myBox.nativeElement )
    this.myBox.nativeElement.style.width='100px'
    this.myBox.nativeElement.style.height='100px'
    this.myBox.nativeElement.style.background='#aaa'
    console.log(this.myBox.nativeElement.innerHTML)

    
  }
  getChildRun(){
    //调用子组件里的方法
    this.header.run()
  }

  [x: string]: any;

  public title ='我是一个新闻组件';  /**定义数据与绑定数据 */

  username:string = "LK"; /*属性不是数据，不能加var，默认是public*/
  public student:string = "I'm a student";
  public content="<h2>我是一个html标签 </h2>";

  userinfo:object = { /**在TypeScript中如果按JS的方式去获取对象属性，
    有时会提示形如Property 'value' does not exist on type 'Object'的错误。可以不设置object改为any，或者这样引用userinfo["username"] */
    age:'20',
    username:"张三"
  };
  public message:any;

  arr = ['1111','2222','3333']
  public list:any[] = ['hello',223232,'world']
  public list1:Array<string> = ['hello','must be string','world']
  public userlist:any[]=[{
    username:'lk',
    age:20
  },{
    username:'kkb',
    age:21
  }];

  public car:any[]=[
    {
      carN:"baoma",
      list:[
      {
        name:"x1",
        price:20
      },
      {
        name:"X2",
        price:30
      }]
    },
   {
     carN: "audi",
     list:[
      {
        name:"Q1",
        price:33
      },
      {
        name:"Q2",
        price:44
      }]
    }
  ]

  constructor() {
    this.message = "构造函数赋值";
  };


  ngOnInit(): void {
  }

}