import { Component, OnInit} from '@angular/core';
// import {Document} from '@angular/common'"
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [],
})
export class FeatureModule {}

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  // styleUrls: ['./monitor.component.css']
  styles:[
    `
    ::ng-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
      color:#fff;
      background: #1890ff;
      border-radius:0;
  }
  ::ng-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
      border-radius:0; 
  }
  
  
  ::ng-deep div.ant-card-head.ng-star-inserted{
      padding:0 0;
  }
  // ::ng-deep  .ant-layout *{
  //   border:hidden;
  // }
  // ::ng-deep nz-tabset .ant-tabs-bar{
  //   border:hidden;
  // }
  // ::ng-deep .ant-tabs.ant-tabs-card .ant-tabs-extra-content {
  //   width:60%; //template放在一条线上
  // }

  
  
    `
  ]
})
export class MonitorComponent implements OnInit {
  ddd = [110,333];
  pNo:number ;
  expression:boolean = false;
  // radioValue = 'A';
  tabIndex:number = 0;
 nzPageIndex0:number=1;
 nzPageSize0:number=10;
 nzPageIndex1:number=1;
 nzPageSize1:number=10;
 styObj = {
    width:"60%",
    // margin:"auto 10%",
}
  UserReceiveList = [
    {
      cVerifier:111111,
      dVerifySysTime:2,
      iReadCount:3,
      iReplyCount:4
    }
  ];
  UserCreateList = [{
    cTitle:1,
    cMaker:222222,
    iReadCount:3,
    dCreateSysTime:4
  }];
  isReceiveLoading = true;
  isCreateLoading = true;
  selectedValue = '统计平台导入';
 

    

  constructor() { }

  ngOnInit() {
   this.pNo = 2;
   console.log("tsInit:test")
  //  this.change();  //放在这是不会找到a[0]的，因为页面还没加载好
  }

  change(){
    var a = document.getElementsByTagName('th');
    a[0].innerText = "document能用了，改了Title";
    console.log(a,a[0])
  }
  // timePK = new Date()

  // window.console.log("tsInit:test")
}
