import { Component,OnInit } from '@angular/core';
@Component({
  selector: 'app-workplace',
  template: `
    <div class="gutter-example">
      <div nz-row nzGutter="3">
        <div nz-col class="gutter-row" nzSpan="3">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
      </div>
    </div>
    <div class="gutter-example">
      <div nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }">
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
        <div nz-col class="gutter-row" nzSpan="6">
          <div class="gutter-box">col-6</div>
        </div>
      </div>
    </div>
    <nz-card nzTitle="">
      <div nz-row nzGutter="24">
        <div nz-col nzSpan="24">
          四上库变更记录
        </div>
      </div>
    </nz-card>
  `,
  styles: [
    `
      .gutter-box {
        background: #00a0e9;
        padding: 5px 0;
      }
    `
  ]
})


export class WorkplaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}