import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  ddd = [110,333];
  pNo:number;
  expression:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  change(){}
  // timePK = new Date()

}
