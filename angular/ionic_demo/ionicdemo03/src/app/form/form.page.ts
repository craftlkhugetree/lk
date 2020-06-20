import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  public peopleInfo:any={
    username:'',
    age:20,
    flag:true,
    payType:'1',
    checkBoxList:[
      {val:'吃饭',isChecked:true},
      {val:'睡觉',isChecked:false},
      {val:'coding',isChecked:false},
    ],
    cityList:['北京','上海','深圳'],
    city:'北京'
  }
  constructor() { }

  ngOnInit() {
  }

}
