import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public peopleInfo:any={
    username:'1233z',
    sex:'1',
    cityList:['BJ','SH',"SZ"],
    city:'BJ',
    hobby:[{
      title:'吃饭',
      checked:false
    },{
      title:'睡觉',
      checked:false
    },{
      title:'运动',
      checked:true
    }],

    mark:""
  }
  constructor() { }

  ngOnInit(): void {
  }

  doSubmit(){
    //jquery dom
    // let usernameDom:any = document.getElementById('username')
    // console.log(usernameDom.value)

    //双向数据绑定，要先在app中引入
    console.log(this.peopleInfo)

  }

}
