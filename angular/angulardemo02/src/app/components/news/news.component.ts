import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  //当做一个服务

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(public http:HttpClient) { }

  public list:any[] = []
  ngOnInit(): void {
  }

  getData(){
    let api= "http://a.itying.com/api/productlist"
    this.http.get(api).subscribe((res:any)=>{
      console.log(res)
      this.list=res.result
    })
  }

  doLogin(){
    alert("login")
    //存在跨域
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    var api='http://127.0.0.1：3000/dologin'
    this.http.post(api,{"username":"LK","age":20},httpOptions).subscribe((res)=>{
      console.log(res)
    })
  }

}
