import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService{

  constructor() { }
  createDb(){
    let contacts =[
      {id:1,name:'lk 1'},
      {id:2,name:'lk 2'},
      {id:3,name:'lk 3'}
    ];
    return {contacts};  //必须返回一个对象，不能没有花括号
  }
}
