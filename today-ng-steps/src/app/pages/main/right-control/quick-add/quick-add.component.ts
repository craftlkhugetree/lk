import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: [ './quick-add.component.less' ]
})
export class QuickAddComponent implements OnInit {
  @Output() addd = new EventEmitter<string>(); //子传父

  constructor() { }

  ngOnInit() {
  }

  addTodo(title: string) {
    if (title) { this.addd. next(title); }
  }

  consoleLogg(nzinputPro:string){
    console.log(nzinputPro)
  }

}
