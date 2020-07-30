import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public msg="我是子组件的一个属性"

  @Output() private outer = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  run(){
    alert("我是子组件的一个方法")
  }

  sendParent(){
    this.outer.emit("I'm child data")

  }
}
