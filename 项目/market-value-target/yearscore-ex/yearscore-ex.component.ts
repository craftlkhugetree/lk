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
import { MarketValueTargetYearscoreComponent } from '../yearscore/yearscore.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-market-value-target-yearscore-ex',
  templateUrl: './yearscore-ex.component.html',
})
export class MarketValueTargetYearscoreExComponent extends MarketValueTargetYearscoreComponent {
 // 警示详情
  public isVisible2 = false;
  public dangerdata:any = [];

  // 年终评分
  report(e:any){
    this.selectedValue = '0';
    this.fileList = [];
    this.idxReport = e;
    // this.getExist();
    this.isReport = true;
    this.optionList = this.createDownList(this.idxReport.kaoHe);
    this.depResponse = this.optionList[0].label;
    this.indexCon();
    // this.getPlan();
    // this.getPlanContent();
    this.openPlan();
  }
  reportCancel() {
    this.re();
  }
  reportOk(i?:any) {
    let org:any = []
    if(!!i) {
       org = [i]
    }else{
     org = this.idxReport.checkObjList.filter(item => item.checkObjOrgName === this.depResponse);
    }

    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/auditObScore',{
      checkOrgDupUUID: org[0].checkObjOrgDupUUID,
      checkObjOrgUUID: org[0].checkObjOrgUUID,
      deScore: this.scoreY,
    }).subscribe((res:any) => {
      if(res.code === 1) {
        this.clickTreeTable();
        this.msg.success(res.msg)
        this.re();
      }else{
        this.msg.warning(res.msg)
      }
    })
  }
  
  re() {
    this.isReport = false;
    this.deptPersionFName = null;
    this.deptPersionJName = null;
    // this.scoreObj.checkObjOrgUUID = null;
    // this.scoreObj.checkOrgDupUUID = null;
    this.scorePerson = null;
    this.scoreY = null;
    this.scoreDate =null;
    this.planList = [];
  }

  checkIdx(e: any, num: any) {
    if (this.isReport) {
      this.mName = {...e}
      this.fileList = [];
      this.isModal = true;
      this.fileList1 = [];
      this.isModal1 = true;
      this.planPicked = this.depPlanData.filter(i => i.cPlanContent === this.mName.plan)[0] || {};
      this.warnS = this.planPicked.iWhole+'';
      this.fileList1 = this.genFileList(this.planPicked.cSignFileList)
      this.fileList = this.genFileList(this.planPicked.cEvFileList)
      // 必须filter，否则不会刷新文件列表
      this.fileList1 = this.fileList1.filter(i => true);
    }
  }
  zeroCancel() {
    this.reQuery();
  }
  zeroOk() {
    this.reQuery();
  }
  reQuery() {
    this.isModal = false;
    this.planPicked = {};
  }

 
  // 警示详情
  dangers(){
    this.isVisible2 = true;
    
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

  handleCancel2(){ 
    this.isVisible2 = false;
    this.dangerdata = [];
  }



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
            this.getYearScore();
          } else {
            this.msg.warning(res.msg);
          }
        });
  }

  public yearArr:any = []
  getYearScore() {
    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/getIdxPlanExeList',{
      iIndexType:1
    }).subscribe((res:any) => {
      if(res.code === 1) {
        this.yearArr = res.data.filter(i => i.bEnd === true);
        this.idxList.forEach(e => {
          this.yearArr.forEach(i => {
            if(e.cIndexUUID === i.cIndexUUID) {
              e.checkObjList = i.checkObjList;
            }
          })
        });
        // console.log(this.yearArr, this.idxList);
        
      }else{
        this.msg.warning(res.msg);
        this.yearArr = [];
      }
    })
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
      this.getYearScore();
    } else {
      this.msg.warning(res.msg);
    }
  });
  }
}
