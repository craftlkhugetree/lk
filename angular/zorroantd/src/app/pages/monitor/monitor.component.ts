import { Component, OnInit} from '@angular/core';
// import {Document} from '@angular/common'"

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  ddd = [110,333];
  pNo:number ;
  expression:boolean = false;
  

    

  constructor() { }

  ngOnInit() {
   this.pNo = 2;
   console.log("tsInit:test")
  //  this.change();  //放在这是不会找到a[0]的，因为页面还没加载好
  }

  change(){
    var a = document.getElementsByTagName('th');
    a[0].innerText = "document能用了，改了Title";
    console.log(a,a[0])
  }
  // timePK = new Date()

  // window.console.log("tsInit:test")
}
