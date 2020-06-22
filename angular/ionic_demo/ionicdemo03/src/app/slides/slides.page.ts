import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('slide2') slide2;
  @ViewChild('slide1') slide1;

  slideOpts={
    effect:'flip', //轮播效果
    autoplay: {
      delay: 2000.
    },
    loop : true,
  }

  slideNext(){
    this.slide2.slideNext();
  }

  slideUpdate(){
    this.slide2.slideUpdate();  //请求数据完成后，若轮播图工作异常，则更新轮播图
  }

  slideDidChange( ){
    console.log('111')
    this.slide1.startAutoplay()
  }
}
