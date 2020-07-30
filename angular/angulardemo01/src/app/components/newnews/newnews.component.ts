import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-newnews',
  templateUrl: './newnews.component.html',
  styleUrls: ['./newnews.component.css']
})
export class NewnewsComponent implements OnInit {

  @ViewChild('footer') footer:any
  constructor() { }

  ngOnInit(): void {
  }

  getChild(){
    this.footer.run()
  }
  broadtoDad(e){
    console.log(e)  //e就是子组件emit给父组件的数据
  }
}
