import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public picUrl ="https://www.baidu.com/img/flexible/logo/pc/result.png"

  public list:any[]=[
    {
      title:'first'
    },
    {
      title:"second"
    },
    {
      title:"third"
    }
  ]

  public flag:boolean = true;
  public orderStatus:number= 1;   /**1表示已支付，2表示确认，3表示已发货，4表示已收货,5表示无效 */
  public attr:string = "pink";

  public today:any=new Date();

  public title:string = '执行方法获得数'


  public keywords:string = 'placeholder?G'


  constructor() { 
    console.log(this.today)
  }

  ngOnInit(): void {
    /**指令和组件初始化完成，并不是真正的dom加载完成 */
    let oBox=document.getElementById('box')
    console.log(oBox.innerHTML)
    oBox.style.color="red"

    //获取不到dom节点
    // let oBox1=document.getElementById('box1')
    // console.log(oBox1.innerHTML)
    // oBox1.style.color="blue"
  }

  //视图加载以后触发的方法，建议dom操作放在这里
  ngAfterViewInit(): void { 
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let oBox1=document.getElementById('box1')
    console.log(oBox1.innerHTML)
    oBox1.style.color="blue" 
  }

  
  run(){
    alert('这是一个自定义方法')
  }
  getData(){
    alert(this.title)
  }
  setData(){
    this.title='我是被改变的title数据'
  }

  runEvent(e){
    let dom:any = e.target;
    dom.style.color = "yellow";
  }

  keyDown(e){
    console.log(e.keyCode);
    if(e.keyCode==13){
      console.log("按了回车键")
    }else{
      console.log(e.target)
      console.log(e.target.value)
    }
  }

  changeKeywords(){
    this.keywords = 'Keywords has been changed.'
  }
  getKeywords(){
    console.log(this.keywords)
  }
}
