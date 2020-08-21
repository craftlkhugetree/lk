import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { NzGridModule } from 'ng-zorro-antd/grid';
// import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as  differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  API_URL: string = "/api/";
  constructor(private http: HttpClient) {}

  getContacts(){    
    let a = this.http.get(this.API_URL+'333')
    // console.log("getContacts():",a,a.subscribe())
    return a
   }
   getContact(contactId:number){
    return this.http.get(`${this.API_URL + 'contacts'}/${contactId}`) 
   }
}

@Component({
  selector: 'backendget',
  providers: [RandomUserService],  
  templateUrl: './backendget.component.html'
})
export class BackendgetComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  tListOfData = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];


  dDataDate:Date = new Date();  //new 才能得到当天日期，默认为当前月份。

  dataQuery(result: Date): void {
    console.log('onChange: ', result,result.getTime(),this.dDataDate,this.dDataDate.getTime());   
    console.log('Month:',this.dDataDate.getMonth()+1) 
    let tmpDate = new Date(result.getTime());
    let tmpYear = tmpDate.getFullYear();
    let tmpMonth = tmpDate.getMonth()+1;  
    let tempD = this.tListOfData.filter(i=>(i.ayear===tmpYear && i.amonth===tmpMonth));
    console.log(tmpDate,tmpYear,tmpMonth,this.listOfData,this.tListOfData,tempD)
    this.listOfData = tempD;
  }
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  showConfirm(index:number): void {
    this.btnModal.confirm({
      nzTitle: '<i>确定要退回正式库吗?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        // this.tListOfData.splice(index,1);
        this.tListOfData = this.tListOfData.filter(i=> this.listOfData.slice(index,index+1)[0].id != i.id)
        this.listOfData = this.tListOfData;
        console.log('回退：',index,this.tListOfData);
      }
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    console.log(this.sortKey,this.sortValue)
    this.searchData();
  }

  constructor(private randomUserService: RandomUserService,    private btnModal: NzModalService) {}

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService  //为何一定要远程数据，本地不是有一份数据了吗？
      .getContacts() //感叹号(非空断言操作符) ，如果为空，会丢出断言失败。
      .subscribe((res: any) => {
        this.loading = false;
        this.listOfData = res.data;
        this.tListOfData = this.listOfData;
      });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  getRandomDateBetween() { // 生成当前时间一个月内的随机时间。
    var date = new Date();
    var e = date.getTime();//当前时间的秒数
    var f = date.getTime()-(300*24*60*60*1000); //300天之前的秒数
    let temp = new Date(this.RandomNumBoth(f,e))
    // return `${temp.getFullYear()}`+'年'+`${temp.getMonth()+1}`+'月';
    return temp;
  }
  RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    let num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  }
  

  ngOnInit(): void {
    this.searchData();
  }
}

