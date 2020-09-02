import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
// import { NzGridModule } from 'ng-zorro-antd/grid';
// import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as  differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ElementRef } from '@angular/core';
import { AfterViewInit,ViewChild } from '@angular/core';

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number = 1,
    pageSize: number = 25,
    sortField: string,
    sortOrder: string,
    genders: string[]
  ): Observable<{}> {
    let params = new HttpParams() //链式语法构建 HttpParams 对象。这是因为 HttpParams 对象是不可变的，通过 set()方法可以防止该对象被修改。
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    const params1= new HttpParams()
    .set('orderBy', '"$key"')
    .set('limitToFirst', "1");
    // let courses$ = this.http
    // .get("/courses.json", {params1})
    // .do(console.log)
    // .map(data => _.values(data));

    const params2= new HttpParams();
    params2.set('orderBy', '"$key"');
    params2.set('limitToFirst', "1");
    console.log("params:",params1,genders,params,params2);
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'table-sort-combine',
  providers: [RandomUserService],  
  templateUrl: './table-sort-combine.component.html'
})
export class TableSortCombineComponent implements OnInit {
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  tListOfData = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];
  searchValue=''




  dDataDate:Date = new Date();  //new 才能得到当天日期，默认为当前月份。

  dataQuery(result: Date): void {
    console.log('点击日期与new Date(): ', result,result.getTime(),this.dDataDate,this.dDataDate.getTime());   
    console.log('Month:',this.dDataDate.getMonth()+1) 
    let tmpDate = new Date(result.getTime());
    let tmpYear = tmpDate.getFullYear();
    let tmpMonth = tmpDate.getMonth()+1;  
    let tempD = this.tListOfData.filter(i => (new Date(i.dob.date).getMonth()+1)===tmpMonth );
    console.log("条件查询日期：",tmpDate,tmpYear,tmpMonth,this.listOfData,this.tListOfData,tempD)
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
        // this.tListOfData.splice(index,1);  splice等不起作用，只有filter能自动更新页面。而且注意slice的数据是在[0]里
        this.tListOfData = this.tListOfData.filter(i => this.listOfData.slice(index,index+1)[0].email != i.email)
        this.listOfData = this.listOfData.filter(i => this.listOfData.slice(index,index+1)[0].email != i.email)
        let querylen = this.listOfData.length;
        if(querylen===0){
          this.listOfData = this.tListOfData;
        }
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

  constructor(private randomUserService: RandomUserService,    private btnModal: NzModalService,private renderInput:Renderer2) {}
  @ViewChild('myInput',{static:false}) myInput: ElementRef; //终于找到了这个DOM

  searchData(reset: boolean = false): void {  //选择日期查询，取得全部数据后，本地筛选
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService  //为何一定要远程数据，本地不是有一份数据了吗？
      .getUsers(this.pageIndex, this.pageSize, this.sortKey!, this.sortValue!, this.searchGenderList) //感叹号(非空断言操作符) ，如果为空，会丢出断言失败。
      .subscribe((data: any) => {
        this.loading = false;
        this.total = 100;
        this.tListOfData = data.results;
        this.tListOfData.map(i => i.dob.date=new Date(i.dob.date))
        // this.listOfData = this.tListOfData.filter(i => (new Date(i.dob.date).getMonth()+1)===(new Date().getMonth()+1) )//仅看相同月份，不考虑年
        this.listOfData = this.tListOfData
        // for(var i=0;i<this.total;i++){
        //  (this.listOfData[i] as any).ayear = this.getRandomDateBetween().getFullYear();
        //  (this.listOfData[i] as any).amonth = this.getRandomDateBetween().getMonth()+1;
        // }
      });
  }

  // 表格搜索
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // sort(sortName: string, value: string): void {
  //   this.sortName = sortName;
  //   this.sortValue = value;
  //   this.search();
  // }

  search(): void {  //输入查询日期
    // document.getElementById('getFocusInput').focus(); //在这里执行document语句？
    let tdate = new Date(this.searchValue)
    let ttmp = this.tListOfData.filter(i => tdate.getFullYear()===new Date(i.dob.date).getFullYear()) //仅展示同一年
    this.listOfData = ttmp
    // this.dDataDate = tdate //选项口与搜索框同步
    // const filterFunc = (item: { name: object,gender: string, email:string,registeredTimeDate: string }) => {
    //   return (
    //     (this.listOfData.length  //长度为零时，三元选择符选后者。
    //       ? this.listOfData.some(
    //           registeredTimeDate => item.registeredTimeDate.indexOf(registeredTimeDate) !== -1,
    //         )
    //       : false) && item.companyName.indexOf(this.searchValue) !== -1
    //   );
    // };
    // const data = this.data.filter((item: { companyName: string; companyCode: string; registeredTimeDate: string }) =>
    //   filterFunc(item),
    // );
    // this.listdata = data.sort((a, b) =>
    //   this.sortValue === 'ascend'
    //     ? a[this.sortName!] > b[this.sortName!]
    //       ? 1
    //       : -1
    //     : b[this.sortName!] > a[this.sortName!]
    //     ? 1
    //     : -1,
    // );
  }
  keydown(e:any){
    if(e.which===13){
      this.search()
    }
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  // getRandomDateBetween() { // 生成当前时间十个月内的随机时间。
  //   var date = new Date();
  //   var e = date.getTime();//当前时间的秒数
  //   var f = date.getTime()-(300*24*60*60*1000); //300天之前的秒数
  //   let temp = new Date(this.RandomNumBoth(f,e))
  //   // return `${temp.getFullYear()}`+'年'+`${temp.getMonth()+1}`+'月';
  //   return temp;
  // }
  // RandomNumBoth(Min,Max){
  //   var Range = Max - Min;
  //   var Rand = Math.random();
  //   let num = Min + Math.round(Rand * Range); //四舍五入
  //   return num;
  // }
  

  ngOnInit(): void {
    this.searchData();
    
  
    // let domT = this.renderInput.selectRootElement('tr>th'); 
    // console.log(domT)

  }

  // 注意这里使用的ngAfterViewInit是初始化完组件视图及其子视图之后调用的，也就是先执行了ngOnInit之后才会执行下面这句
  ngAfterViewInit() {
    // console.log(this.myInput.nativeElement)
    // this.myInput.nativeElement.focus()
    // let domT = this.renderInput.selectRootElement('#nzDropdownMenu');
    // domT.removeAttribute('readonly')
    // domT.focus();
    //这里是重点，需要一个定时器，因为一般操作dom都是异步检查详情我会留下参考的链接
    //   setTimeout(() => {
    //     this.zz.nativeElement.focus();
    //   }, input
    // }
  }
  ngAfterViewChecked() {
   
    console.log(this.myInput.nativeElement)
    this.myInput.nativeElement.focus() 
  }

}

