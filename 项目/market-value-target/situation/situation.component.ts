/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/12/08 08:00
 * @Version: 1.0
 */
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper,MenuService } from '@delon/theme';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { ToolsService } from 'src/app/services/tools.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OrgChooseService } from '../../../services/orgchoose.service';
import { MarketValueTargetImplementationReportComponent } from '../implementation-report/implementation-report.component';
@Component({
  selector: 'app-market-value-target-situation',
  templateUrl: './situation.component.html',
})
export class MarketValueTargetSituationComponent extends MarketValueTargetImplementationReportComponent {
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

  
  public upVObj = {
    "cEvaluateType":null, //  "Ibgp",
    "cIndexPlanUUID":null, //  "8YmWI",
    "cOrgDupUUID":null, //  "#qHr",
    "iType":null, //  4409537562926468,
    "dBegin":null, //  "2011-05-07 00:null, // 33:null, // 31",
    "dFinish":null, //  "1991-02-20 21:null, // 47:null, // 52",
    "cPlanContent":null, //  "D9^A[Ph",
    "cPlanFile":null, //  ")!h(C",
    "cSituation":null, //  "MM9dMO",
    "cExisting":null, //  "I]Zc",
    "cNextPlan":null, //  "kNhcTo",
    "cSignFile":null, //  "tPye",
    "iStite":null, //  -4837302723151556,
    "cDescribe":null, //  "g*W$IrQ",
    "cEvaluate":null, //  "9XyQ",
    "cWork":null, //  "yc2K",
    "cEvFile":null, //  "VWFB",
    "dPubufts":null, //  "^x%v0"
    "fileList":null,
    'iWhole':null,
    'cWholeD':null,
    'rejectDes':null,
    "cAccUniqueID": this.account.cAccUniqueID,
    "cSendOrgUUID": this.current_org.cOrgUUID,
    "cSendOrgName": this.current_org.cOrgName,
    "cPersonUUID": this.login.cPersonUUID,
    "cPersonName": this.login.cPersonName,
    iIndexType:1,
    cIndexUUID:null,
  }

    // 查看计划
    public isModal1 = false;
    public planPicked:any = {};
    public fileList1 = [];
    clickPlan(e:any, num:any) {
      this.title = e.plan;
      this.mName = {...e}
      if (this.isReport) {
        this.isModal1 = true;
      this.planPicked = { ...this.depPlanData[num] };
      // this.warnSChange(this.warnS);
      this.fileList1 = this.genFileList(this.planPicked.cSignFileList);
      // 必须filter，否则不会刷新文件列表
      this.fileList1 = this.fileList1.filter(i => true);
      }
    }

    genVerifiedPlan(a:any) {
      this.reObj();
      for(let obj in this.planPicked) {
        this.upVObj[obj] = this.planPicked[obj];
      }
      this.fileList = this.genFileList(a.cEvFileList);
      this.fileList = this.fileList.filter(i => true);
      this.fileListBK = [...a.cEvFileList];
      
      this.warnS = this.planPicked.iWhole+'';
      this.mName.flag === 7 ? this.rejectReason = true : this.rejectReason = false;
      this.mName.flag === 6 ? this.hasBeenAudit = true : this.hasBeenAudit = false;
    }

    pickName(item:any) {
      this.mName = { ...item };
      this.planPicked = this.depPlanData.filter(i => i.cPlanContent === this.mName.plan)[0] || {};
      // this.warnSChange(this.warnS);
      this.genVerifiedPlan(this.planPicked)
    }

    zeroCancel() {
      this.resetClick();
      this.reObj();
      this.mName = {};
    }
    zeroOk() {
      this.genVerifiedPlan(this.planPicked);
      this.resetClick()
    }
    resetClick() {
      this.isModal1 = false;
      this.fileList1 = [];
      this.planPicked = {};
    }

    genFileList(t:any) {
      const fl = []
      if (t && t.length > 0) {
        t.forEach(item => {
          fl.push({
            name: item.cDocument,
            url: item.cAddress,
            uid: item.cFileCode,
          });
        });
      }
      return fl;
    }

  // 审核模态框
  report(e: any) {
    this.selectedValue = '0';
    this.fileList = [];
    this.idxReport = e;
    // this.getExist();
    this.optionList = this.createDownList(this.idxReport.kaoHe);
    this.depResponse = this.optionList[0].label;
    this.getPlan();
    this.openPlan();
  }

  getExist() {
    this.http
    .get('/cnic-organizationdepartment/IndexPlanExecuteAction/getExetInfoFromAudit/'+this.idxReport.cIndexUUID)
    .subscribe((res: any) => {
      if (res.code === 1) {
        
      } else {
        this.msg.warning(res.msg);
      }
    });
  }

  openPlan() {
    this.planList = [];
    let orgUUid:any = this.idxReport.kaoHe.filter(item => item.cOrgName === this.depResponse);
    const obj = {
      cIndexUUID: this.idxReport.cIndexUUID,
      checkObjOrgUUID: orgUUid[0].cOrgUUID,
      iIndexType: 1,
      cPlanContent: null,
    };
    this.http
      .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoBywhereStr', obj)
      .subscribe((res: any) => {
        if (res.code === 1) {
    this.isReport = true;

          const t = res.data;
          this.depPlanData = this.planOrder(res.data);
          // this.warnS = res.data.length > 0 ? res.data[0].iWhole+'' : null;
          // this.upVObj.cWholeD = res.data.length > 0 ? res.data[0].cWholeD : null;
          this.getPlanRadio(t);
        } else {
    this.isReport = false;

          this.msg.warning(res.msg);
        }
        this.mName.plan = null;
      });
  }

  

  reportCancel() {
    this.resetP();
  }

  reportOk(str?:any) {
    if(this.hasBeenAudit) {
      this.msg.warning('已审核，无法修改！')
      return;
    }

    this.upVObj.cEvaluateType = str;
    this.upVObj.iWhole = parseInt(this.warnS);
    if(str === 'reject') {
      this.upVObj.rejectDes = this.rejectReason;
      if(!this.judgeText(this.rejectReason)) {
        this.msg.warning('请输入驳回原因！');
        return;
      }
    }
    if(!this.judgeText(this.mName.plan)) {
      this.msg.warning('请选择计划！');
      return;
    }
    if(!this.upVObj.iWhole) {
      this.msg.warning('请选择警示标识！');
      return;
    }
    this.uploadFiles();
  }

  reObj() {
    this.upVObj = {
      "cEvaluateType":null, //  "Ibgp",
      "cIndexPlanUUID":null, //  "8YmWI",
      "cOrgDupUUID":null, //  "#qHr",
      "iType":null, //  4409537562926468,
      "dBegin":null, //  "2011-05-07 00:null, // 33:null, // 31",
      "dFinish":null, //  "1991-02-20 21:null, // 47:null, // 52",
      "cPlanContent":null, //  "D9^A[Ph",
      "cPlanFile":null, //  ")!h(C",
      "cSituation":null, //  "MM9dMO",
      "cExisting":null, //  "I]Zc",
      "cNextPlan":null, //  "kNhcTo",
      "cSignFile":null, //  "tPye",
      "iStite":null, //  -4837302723151556,
      "cDescribe":null, //  "g*W$IrQ",
      "cEvaluate":null, //  "9XyQ",
      "cWork":null, //  "yc2K",
      "cEvFile":null, //  "VWFB",
      "dPubufts":null, //  "^x%v0"
      "fileList":null,
      'iWhole':null,
      'cWholeD':null,
      'rejectDes':null,
      "cAccUniqueID": this.account.cAccUniqueID,
      "cSendOrgUUID": this.current_org.cOrgUUID,
      "cSendOrgName": this.current_org.cOrgName,
      "cPersonUUID": this.login.cPersonUUID,
      "cPersonName": this.login.cPersonName,
      iIndexType:1,
      cIndexUUID:null,
    };
    this.warnS = null;
    this.fileList = [];
    this.hasBeenAudit = false;
  }
  resetP() {
    this.reObj();
    this.isReport = false;
    this.planPicked = {};
    this.depPlanData = [];
    this.depArr = [];
    this.mName = {};
    this.fileArr = [];
    this.fileList = [];
    this.fileListBK = []
    this.delFile = [];
    this.warnS = null;
    this.isReject = false;
  }

  chooseExamDep(e:any) {
    this.deptPersionFName = this.deptPersionJName = null;
    this.depResponse = this.optionList[e].label;
    this.reObj();
    this.getPlan();
    this.openPlan();
  }

  public depSelect = {deptPersionFName:null,deptPersionJName:null};
  public deptPersionJName:any = null;
  public deptPersionFName:any = null;
  getPlan() {
    this.depArr = [];
    this.planList = [];
    let orgUUid:any = this.idxReport.kaoHe.filter(item => item.cOrgName === this.depResponse);
    this.http
      .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoByIdx_Org', {
        cIndexUUID: this.idxReport.cIndexUUID,
        iIndexType: 1,
        checkObjOrgUUID: orgUUid[0].cOrgUUID,
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
    this.isReport = true;

          this.depArr = [...res.data];
          // let a  = res.data.deptList.filter(item => item.deptOrgName === this.depResponse)[0] || {};
          // this.depSelect  = this.depArr.deptList.filter(item => item.deptOrgName === this.depResponse)[0] || {};
          this.deptPersionFName = res.data.CPERSIONFNAME;
          this.deptPersionJName = res.data.CPERSIONJNAME;
          // this.getGolbalWarn();
        } else {
    this.isReport = false;

          this.msg.warning(res.msg);
          this.depArr = [];
        }
      });
  }

  public warnArr = ['超期','即将超期','进度正常','指标完成']
  warnSChange(e:any) {
    const t = parseInt(e)
    if(t>0 && t<5) {
    this.planPicked.iWhole = parseInt(e);
    }
  }

  saveIdx() {
    this.fileList.length === 0 ? (this.upVObj.fileList = null) : (this.upVObj.fileList = this.fileArr);
    this.delFile.length > 0 ? this.deleteFile(this.delFile) : null;
    this.upVObj.cIndexUUID = this.idxReport.cIndexUUID;
    this.http
      .post(
        '/cnic-organizationdepartment/IndexPlanExecuteAction/auditOrRejectExecuteInfo',
        this.upVObj
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.msg.success(res.msg);
        } else {
          this.msg.warning(res.msg);
        }
        this.resetP();
      });
  }

    urgeUpload(e:any) {
      this.mName = { ...e };
      this.planPicked = this.depPlanData.filter(i => i.cPlanContent === this.mName.plan)[0] || {};
      // let orgUUid:any = this.idxReport.kaoHe.filter(item => item.cOrgName === this.depResponse);

      this.http.post('/cnic-organizationdepartment/IndexPlanExecuteAction/urgeReportExecuteInfo',{
        "cAccUniqueID": this.account.cAccUniqueID,
        "cSendOrgUUID": this.current_org.cOrgUUID,
        "cSendOrgName": this.current_org.cOrgName,
        "cPersonUUID": this.login.cPersonUUID,
        "cPersonName": this.login.cPersonName,
        iIndexType:1,
        cOrgDupUUID:this.planPicked.cOrgDupUUID,
        cIndexUUID:this.idxReport.cIndexUUID,
        cIndexPlanUUID: this.planPicked.cIndexPlanUUID,
      }).subscribe((res:any) => {
        if(res.code === 1) {
          this.msg.success(res.msg);

        }else{
          this.msg.warning(res.msg)
        }
      })
    }
}
