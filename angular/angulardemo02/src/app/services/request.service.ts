import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  //在服务中解决异步问题



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  getData(){  //同步
    return "This is a service data8*******"
  }

  getCallbackData(cb){

    setTimeout(()=>{
      var data="LK--回调函数法"
      // return data;
      // function (data) => {
      //   console.log(data)
      // }
      cb(data)  //cb()是个回调函数
    },1000)
  }

  getPromiseData(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        var username="OPPO--Promise"
        resolve(username)
      },1000)
   
    })
  }
  getRxjsData(){
    return new Observable<any>((ob)=>{
      setTimeout(()=>{
        var username="KK--Rxjs"
        ob.next(username)
        ob.error('若失败，就传这个')
      },3000)
    })
  }

  getPromiseIntervalData(){
    return new Promise((resolve,reject)=>{
      setInterval(()=>{
        var username="promise执行多次setInterval失败"
        resolve(username)
      },1000)
    }) 
  }

  getRxjsIntervalData(){
    let count = 0;
    return new Observable<any>((ob)=>{
      setInterval(()=>{
        count++
        var username="KK--Rxjs多次Interval"+count;
        ob.next(username)
        //ob.error('若失败，就传这个')
      },1000)
    })
  }

  getRxjsIntervalNum(){
    let count = 0;
    return new Observable<any>((ob)=>{
      setInterval(()=>{
        count++
        ob.next(count)
      },1000)
    })
  }
}

