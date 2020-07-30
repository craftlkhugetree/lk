import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key,value){
    localStorage.setItem(key,JSON.stringify(value))
  }

  get(key){
    //return 'Hello fuwu!'
    return JSON.parse(localStorage.getItem(key))
    //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
  }

  remove(key){
    localStorage.removeItem(key)
  }
}
