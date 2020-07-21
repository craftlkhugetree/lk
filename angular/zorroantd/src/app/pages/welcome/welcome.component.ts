import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  testTab:any = [
    {
      a:1,
      b:2,
      c:3
    },
    {
      a:2,
      b:2,
      c:3
    },
    {
      a:3,
      b:2,
      c:3
    }
  ]

  idT = document.getElementById("abc")

  constructor() { }

  ngOnInit() {
    this.funThreeDot("...[]", ...[1, 2, 3]);  // len = 3
    this.funThreeDot("[]数组对象", [1,2,3]);       // len = 1，当做数组对象
    console.log("数组内对象",this.testTab)
    console.log("getid",this.idT)
  }
  
  funThreeDot(p1: string, ...args) {
    console.log(p1+"len = %d", args.length);
  };
  edit(i){};
  del(i){};
  act(){};

}