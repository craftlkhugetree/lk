import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homie',
  templateUrl: './homie.component.html',
  styleUrls: ['./homie.component.css']
})
export class HomieComponent implements OnInit {
  public title:string="Frontpage's title!父组件传值给子组件"

  constructor() { }

  ngOnInit(): void {
  }

  childRun(){
    alert("这是父组件的方法")
  }
}
