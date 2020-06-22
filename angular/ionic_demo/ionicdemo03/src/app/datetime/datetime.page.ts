import { Component, OnInit } from '@angular/core';
import { scheduled } from 'rxjs';
import sd from 'silly-datetime'

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {

  public nowday;
  constructor() { 
    this.nowday= sd.format(new Date(),'YYYY-MM-DD HH:mm')
  }

  ngOnInit() {
  }

  public day='2019-03-15'

  public customPickerOptions = {
    buttons: [{
      text:'取消',
      handler: ()=> {
        console.log("点击取消");
        
      }
    },{
      text:'确认',
      handler:()=>{
        console.log(this.nowday);
        console.log("点击确认")
      } 
    }]
  }
  datetimeChange(e) {
    console.log(e);
    console.log(this.nowday);
  }
}
