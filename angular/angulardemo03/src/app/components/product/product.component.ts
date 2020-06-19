import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  gotoNewsContent(){
    //js路由跳转 普通和动态
    this.router.navigate(['/productcontent','123555']) 
  }

  goHome(){
    this.router.navigate(['/home'])
  }

  goNews(){
    //跳转并进行get传值
    let queryParams:NavigationExtras={
      queryParams:{'aid':123}
    }
    this.router.navigate(['/news'],queryParams)
  }
}
