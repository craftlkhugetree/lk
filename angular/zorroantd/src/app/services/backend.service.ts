import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService{

  constructor() { }
  createDb(){
    let companys =[
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:1,name:'lk 1',date:'2020-8-19'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
      {id:2,name:'lk 2',date:'2019-7-20'},
      {id:3,name:'lk 3',date:'2013-6-20'},
    ];
    return {companys};  //必须返回一个对象，不能没有花括号
  }
}
