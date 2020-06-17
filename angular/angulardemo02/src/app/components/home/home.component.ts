import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import {filter,map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public request:RequestService) { }

  ngOnInit(): void {
    //1、同步
    let data=this.request.getData();
    console.log(data)


    //callback获取异步数据
    // let callbackData = this.request.getCallbackData();
    // console.log(callbackData) //undefined

    //2、回调函数法，就是给getCallbackData(fun)一个函数参数，fun(data)返回值
    this.request.getCallbackData((data)=>{
      console.log(data) //这里data是用的服务原型里的数据，因为参数是一个函数。
    })

    //3、Promise获取异步数据
    var promiseData=this.request.getPromiseData();
    promiseData.then((data)=>{
      console.log(data)
    })

    //4、Rxjs方法
    // var rxjsData=this.request.getRxjsData()
    // rxjsData.subscribe((data)=>{
    //   console.log(data)
    // })

    //5、Rxjs过一秒后撤回刚才的操作
    var streem = this.request.getRxjsData();
    var d= streem.subscribe((data)=>{
      console.log(data)
    })
    setTimeout(()=>{
      d.unsubscribe()
    },1000)

    //6、promise来定时1ms执行多次，但是不行
    var intervalData=this.request.getPromiseIntervalData();
    intervalData.then((data)=>{
      console.log(data)
    })

    //7、Rxjs执行多次
    // var intervalDataRxjs=this.request.getRxjsIntervalData();
    // intervalDataRxjs.subscribe((data)=>{
    //   console.log(data)
    // })
    //8、用工具处理数据
    var streemNum=this.request.getRxjsIntervalNum();
    //var streemSSNum=this.request.getRxjsIntervalNum();
    //同一个对象的subscribe()操作其所有数据

    // streemNum.pipe(
    //   map((value)=>{
    //       return value*value;
    //   })
    // ).subscribe((data)=>{
    //   console.log(data)
    // })

    // streemNum.pipe(
    //   filter((value)=>{
    //     if(value%2==0){
    //       return true;
    //     }
    //   })
    // ).subscribe((data)=>{
    //   console.log(data)
    // })
 
    streemNum.pipe(
      filter((value)=>{
        if(value%2==0){
          return true;
        }
      }),map((value)=>{
          return value*value;
        })
    ).subscribe((data)=>{
      console.log(data)
    })
  }
}
