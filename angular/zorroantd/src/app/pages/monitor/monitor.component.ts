import { Component, OnInit } from '@angular/core';

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
  }

  change(){}
  // timePK = new Date()

  // window.console.log("tsInit:test")
}
