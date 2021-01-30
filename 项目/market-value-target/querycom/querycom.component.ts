/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/12/12 08:00
 * @Version: 1.0
 */
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, MenuService } from '@delon/theme';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { ToolsService } from 'src/app/services/tools.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OrgChooseService } from '../../../services/orgchoose.service';
import { MarketValueTargetYearscoreExComponent } from '../yearscore-ex/yearscore-ex.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-market-value-target-querycom',
  templateUrl: './querycom.component.html',
})
export class MarketValueTargetQuerycomComponent extends MarketValueTargetYearscoreExComponent {

  clickTreeTable() {
    let argTmp:any;
    // 如果不是树顶就刷新表格数据
    if (this.event && this.event.node.title != '全部') {
      argTmp = this.event.node.origin.key;
    } else {
      argTmp = null;
      this.getIndex();
    }
    this.http
        .post('/cnic-organizationdepartment/ProvincialAction/getIndexSel', 
        { 
          cIndexUUID: argTmp,
          iIndexType: 1,
          dMkdir:  !!this.idxYear ? this.idxYear.getFullYear() : new Date().getFullYear(),
          cAccUniqueID: this.account.cAccUniqueID
         })
        .subscribe((res: any) => {
          if (res.code === 200) {
            this.idxList = !!res.data ? res.data : [];
            // this.getYearScore();
          } else {
            this.msg.warning(res.msg);
          }
        });
  }

  anotherClick() {
    this.http
  .post('/cnic-organizationdepartment/ProvincialAction/getIndexSel', 
  { 
    iIndexType: 1,
    cAccUniqueID: this.account.cAccUniqueID,
    dMkdir:!!this.idxYear ? this.idxYear.getFullYear() : null,
    iIndexXz2:this.idxSearchObj.iIndexXz2,
    iIndexXz1:this.idxSearchObj.iIndexXz1,
    iStite: parseInt(this.cStatus),
    iRelease: this.idxSearchObj.iRelease,
    cIndexName: this.idxSearchObj.cIndexName,
   })
  .subscribe((res: any) => {
    if (res.code === 200) {
      this.idxList = !!res.data ? res.data : [];
      // this.getYearScore();
    } else {
      this.msg.warning(res.msg);
    }
  });
  } 

   // 警示详情
   dangers(){
    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/getIdxPlanExeList',{
      iIndexType:1
    }).subscribe((r:any) => {
      if(r.code === 1) {
        this.yearArr = r.data.filter(i => i.bEnd === true);
        this.yearArr.forEach(i => {
            if(this.idxReport.cIndexUUID === i.cIndexUUID) {
              this.idxReport.checkObjList = i.checkObjList;
            }
          })
    
          let org = this.idxReport.checkObjList.filter(item => item.checkObjOrgName === this.depResponse);
      
          this.http.get('/cnic-organizationdepartment/YearEndScoreAction/getWholeInfoBycOrgDupUUID/'+org[0].checkObjOrgDupUUID)
          .subscribe((res:any) => {
            if(res && res.code === 1) {
              this.dangerdata = res.data;
            }else{
              this.msg.warning(res.msg);
            }
          },
          () => {
            this.msg.error('请检查网络连接');
          },)
      }
      else{
        this.msg.warning(r.msg)
      }
    },
    () => {
      this.msg.error('请检查网络连接');
    },);
    this.isVisible2 = true;
  }

}