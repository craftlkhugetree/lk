import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newscontent',
  templateUrl: './newscontent.component.html',
  styleUrls: ['./newscontent.component.css']
})
export class NewscontentComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.route.queryParams)
    //get传值
    this.route.queryParams.subscribe((data)=>{
      console.log(data)
    })

    //动态路由获取传值
    this.route.params.subscribe((data)=>{
      console.log(data)
    })
  }

}
