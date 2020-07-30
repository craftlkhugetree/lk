import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title1:any; //利用Input装饰器，接收父组件传来的值
  @Input() getDadRun:any; //加括号表示要执行方法了，这里只是传递
  @Input() homieWhole:any;
  constructor() {
   }

  ngOnInit(): void {
  }

  run(){
    console.log("I'm Header run FUN.")
  }

  getParentMsg(){
    alert(this.title1)
    console.log(this.homieWhole.title)
    this.homieWhole.childRun()
  }

  

}
