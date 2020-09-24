import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
// import { STColumn, STComponent } from '@delon/abc/table';
// import { SFSchema } from '@delon/form';
// import { NzTableModule } from 'ng-zorro-antd/table';
// import { properties } from 'ng-zorro-antd';

@Component({
  selector: 'app-spatial-data-overlay-land-evaluation',
  templateUrl: './land-evaluation.component.html',
})
export class SpatialDataOverlayLandEvaluationComponent implements OnInit {
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  accTemp = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  account = this.accTemp.account;

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) {
    // console.log("current_org",this.current_org);
    // console.log("accTemp",this.accTemp);
    // console.log("account",this.account);
  }

  ngOnInit() {
    this.initdata();
  }

  // searchObj = {
  //   // cdataname: null,  //企业名称,
  //   // cotherpartnername: null,// 关联企业名称,
  //   // partTax: null,// 地方税收
  //   // mainTax: null,//主要税收,
  //   // floorArea: null,// 占地面积,
  //   // cOtherPartnerShortCode: null, // 统一社会信誉代码,
  //   // cPartnerCName: null,// 分类名称,
  //   // dCreateDate: null,// 创建时间,
  //   // cMaker: null,// 创建者,
  //   // cLatitudeLongitude: null,// 地理坐标,
  //   // cDCName: null,// 地区名称,
  //   // cOrgName: null,// 组织名称,
  //   // cComPubNum: null,// 企业公众号,
  //   // cPartWWW: null,// 街道,
  //   // cIndName: null,// 伙伴代码,
  //   // cPossName: null,// 属地名称,
  //   // cGardName: null,// 园区名称,
  //   // cTradeName: null,// 行业,
  //   // 组织UUID
  //   cOrgUUID: null,
  //   // 帐套UUID
  //   cAccUniqueID: null,
  // };

  searchObj = {
    // 组织ID
    cOrgUUID: this.current_org.cOrgUUID,
    // 帐套ID
    cAccUniqueID: this.account.cAccUniqueID,
  };

  landEvaluatingTable: any;
  // sortNo:number[] = [];
  // basicT:any;
  nzPageSize: number = 10;
  nzPageIndex: number = 1;
  checkShow(resData: any) {
    for (var item of resData) {
      for (var i in item) {
        if (item[i] === null) {
          item[i] = '无资料';
        }
      }
    }
  }

  initdata() {
    // this.http.post('http://192.168.10.114:18092/cnic-dcas/AnalysisBySynthesisAction/getSpatialDataOverlay', this.searchObj)
    this.http
      .post('/cnic-dcas/AnalysisBySynthesisAction/getSpatialDataOverlay', this.searchObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.checkShow(res.data);
          // console.log("res",res.data)
          this.landEvaluatingTable = res.data;
          // for(var i=0;i<this.landEvaluatingTable.length;i++){
          //   this.landEvaluatingTable[i].sortNo = i+1;
          // }
          // for(var i=0;i<res.data.length;i++){
          //   this.sortNo[i]=i+1;
          // }
          // console.log("sortNo",this.sortNo)
          // this.basicT = document.getElementById("basicTable");
          // console.log(this.basicT)
        } else {
          this.message.error(res.msg);
        }
      });
    // console.log("landEvaluatingTable",this.landEvaluatingTable)
  }

  //  sortNo = (sortNumber:Number) => { sortNumber = this.landEvaluatingTable.index+1}

  // data = [];
  // initdata() {
  //   this.http.post('/cnic-dcas/AnalysisBySynthesisAction/getSpatialDataOverlay', this.searchObj).subscribe(res => {
  //     if (res.code === 1) {
  //       // console.log(res);
  //       this.scene.on('loaded', () => {
  //         // tslint:disable-next-line: prefer-for-of
  //         for (let i = 0; i < res.data.length; i++) {
  //           if (res.data[i].cLatitudeLongitude) {
  //             // tslint:disable-next-line: prefer-const
  //             let arr = res.data[i].cLatitudeLongitude.split(',');
  //             // 创建默认 marker
  //             const popup = new Popup({
  //               offsets: [0, 20],
  //             }).setHTML('<div>' + res.data[i].cotherpartnername + '</div>');

  //             const marker = new Marker()
  //               .setLnglat({ lng: parseFloat(arr[0]), lat: parseFloat(arr[1]) })
  //               .setPopup(popup);

  //             this.scene.addMarker(marker);
  //           }
  //         }
  //       });
  //     } else {
  //       this.msg.error(res.msg);
  //     }
  //   });
  // }
}
