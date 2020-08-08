import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../shared/web-socket.service'

/**
 * 依赖库
npm install ws --save  
类型定义文件 
npm install @types/ws -save   */

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

 //注意：在组件中注入服务的时候需要在module的provider中写明
 constructor(private wsService:WebSocketService) { }

  ngOnInit() {
    // 订阅了服务器发送过来的消息，并把消息打印在控制台上
    this.wsService.createObservableSocket("ws://localhost:8085")
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log("流已经结束")
    );
  }

  //此方法需要在html模板中写明
  sendMessageToServer(){
    this.wsService.sendMessage("hello from client");
  }


}
