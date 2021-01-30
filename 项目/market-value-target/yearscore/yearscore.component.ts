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
import { MarketValueTargetSituationComponent } from '../situation/situation.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-market-value-target-yearscore',
  templateUrl: './yearscore.component.html',
})
export class MarketValueTargetYearscoreComponent extends MarketValueTargetSituationComponent {
  constructor(
    http: _HttpClient,
    modal: ModalHelper,
    modalService: NzModalService,
    htp: HttpClient,
    msg: NzMessageService,
    toolsService: ToolsService,
    route: ActivatedRoute,
    router: Router,
    _elementRef: ElementRef,
    _render: Renderer2,
    orgServe: OrgChooseService,
    menuService: MenuService,
  ) {
    super(
      http,
      modal,
      modalService,
      htp,
      msg,
      toolsService,
      route,
      router,
      _elementRef,
      _render,
      orgServe,
      menuService,
    );
  }

  cSChange9(e:any) {

  }

  public formObj = new FormGroup({
    yearScore: new FormControl(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(100)],
    }),
  });
  // 获取评分
  get yearScore() {
    return this.formObj.controls.yearScore;
  }

  // 年终评分
  // public score:any;
  report(e: any) {
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

  reportOk() {
    if(this.hasBeenAudit) {
      this.msg.warning('评分已审核，无法提交！')
      return;
    }
    this.yearScore.markAsDirty();
    this.yearScore.updateValueAndValidity();
    if (this.yearScore.invalid) {
      return;
    }
    // console.log(this.yearScore.value);
    this.scoreObj.deScore = this.yearScore.value;
    this.scoreObj.cScoreP = this.login.cPersonName;

    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/saveObScore',
    this.scoreObj).subscribe((res:any) => {
      if(res.code === 1) {
        this.msg.success(res.msg)
        this.resetReport();
      }else{
        this.msg.warning(res.msg);
      }
    })
  }

  reportCancel() {
    this.resetReport();
  }

  resetReport() {
    this.scoreObj = {
      "checkObjOrgUUID":null, //  "考核对象uuid",
      "checkOrgDupUUID":null, //  "考核对象唯一标识uuid",
      "deScore":null, //  "年终评分",
      "cScoreD":null, //  "评分描述",
      "cScoreP":null, //  "年终评分人员"
    };
    this.isReport = false;
    this.hasBeenAudit = false;
    this.yearScore.reset();
  }

  public checkDep:any = [];
  public scorePerson:any = null;
  public scoreY:any = null;
  public scoreDate:any = null;
  indexCon() {
    // this.http.get(
    //   '/cnic-organizationdepartment/IndexPlanExecuteAction/getIdxDeptCheckObjInfoByID/'+this.idxReport.cIndexUUID)
    // .subscribe((res:any) => {

    // })

    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/getCheckObjScoreInfo',
    {cIndexUUID: this.idxReport.cIndexUUID, iIndexXz:2}).subscribe((res:any) => {
      if(res.code === 1) {
        this.checkDep = res.data;
    let org:any = this.checkDep.filter(item => item.CHECKOBJORGNAME === this.depResponse);

        this.deptPersionFName = org[0].CPERSIONFNAME;
        this.deptPersionJName = org[0].CPERSIONJNAME;
        this.scoreObj.checkObjOrgUUID = org[0].CHECKOBJORGUUID;
        this.scoreObj.checkOrgDupUUID = org[0].CHECKORGDUPUUID;
        this.yearScore.patchValue(org[0].DESCORE);
        this.scorePerson = org[0].CSCOREP;
        this.scoreY = org[0].DESCORE;
        this.scoreDate = org[0].DSCOREDATE ? new Date(org[0].DSCOREDATE) : null;
        this.checkScore();
      }else {
        this.msg.warning(res.msg)
      }
    })
  }
  
  public scoreObj = {
    "checkObjOrgUUID":null, //  "考核对象uuid",
    "checkOrgDupUUID":null, //  "考核对象唯一标识uuid",
    "deScore":null, //  "年终评分",
    "cScoreD":null, //  "评分描述",
    "cScoreP":null, //  "年终评分人员"
  }

  chooseExamDep(e:any) {
    this.deptPersionFName = this.deptPersionJName = null;
    this.depResponse = this.optionList[e].label;
    this.reObj();
    this.indexCon();
    this.openPlan();
  }

  
   // 评分是否已审核
   checkScore(){
    this.http.post('/cnic-organizationdepartment/YearEndScoreAction/getIdxPlanExeList',{
      iIndexType:1
    }).subscribe((r:any) => {
      if(!!r && r.code === 1) {
        r.data.filter(i => i.bEnd === true).forEach(i => {
            if(this.idxReport.cIndexUUID === i.cIndexUUID) {
              this.idxReport.checkObjList = i.checkObjList;
            }
          })
          let org:any = this.idxReport.checkObjList.filter(item => item.checkObjOrgName === this.depResponse);
          org[0].checkObjiScoreS === 6 ? this.hasBeenAudit = true : this.hasBeenAudit = false;
        }else{
          this.msg.warning(r.msg)
        }
      },
      () => {
        this.msg.error('请检查网络连接');
      })
    }
}
