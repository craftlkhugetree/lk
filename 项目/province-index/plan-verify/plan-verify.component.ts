/**
 * @Author: Adrian
 * @Date: 2020/12/23 15:00
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
import { ProvinceIndexPlanUploadComponent} from '../plan-upload/plan-upload.component'

@Component({
  selector: 'app-province-index-plan-verify',
  templateUrl: './plan-verify.component.html',
})
export class ProvinceIndexPlanVerifyComponent extends ProvinceIndexPlanUploadComponent {
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

  // 全局超期标志
  // public warnS:any = '0';
  // warnSChange(e:any) {
  //   this.warnS = e+'';
  // }

  public selectedValue:any = '0';
  public depResponse:any ;
  chooseExamDep(e:any) {
    this.hasBeenAudit = false;
    this.depResponse = this.optionList[e].label;
    this.getPlanContent();
  }
  choosePlanClass(e:any) {

  }
 
  public optionList = [];
  // public planClassList = [
  //   {key:'0',label:'临时填报计划'},
  //   {key:'1',label:'月计划'},
  //   {key:'2',label:'季度计划'},
  //   {key:'3',label:'自定义计划'},
  // ];
  // public selectedPlanClass = null;
   // 审核模态框
   report(e: any) {
    this.selectedValue = '0';
    this.idxReport = e;
    this.optionList = this.createDownList(this.idxReport.zeRen);
    this.depResponse = this.optionList[0].label;
    this.getPlanContent();
    this.tabIndex = 0;
  //   this.getDepOrg();
  }

  createDownList(arr:any) {
    const tmp:any = [];
    for(let i=0, len=arr.length; i<len; i++) {
      tmp.push({
        key: i+'',
        label: arr[i].cOrgName,
      })
    }
    return tmp;
  }

  getPlanContent() {
    this.depPlanData = null;
    this.planList = [];
    let orgUUid:any = this.idxReport.zeRen.filter(item => item.cOrgName === this.depResponse);
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getPlanAudit',{
      cIndexUUID: this.idxReport.cIndexUUID,
      iIndexXz: 1,
      cOrgUUID: orgUUid[0].cOrgUUID,
    })
    .subscribe((res:any) => {
      if(res.code === 200) {
    this.isReport = true;
        this.depPlanData = res.data;

        if(this.depPlanData.buMen[0].iStite === 6) {
          this.hasBeenAudit = true;
        }

        const t = res.data;
        if(this.depPlanData.buMen[0].iStite === 7) {
          this.rJ = true;
          this.rJText = this.depPlanData.buMen[0].cDescribe
       }else {
         this.rJ = false;
         this.rJText = null;
       }
       t.putTong && t.putTong.length>0 ? this.getPlanRadio(t.putTong) : null;
       t.linShi && t.linShi.length>0 ? this.getPlanRadio(t.linShi) : null;
      } else {
        this.msg.warning(res.msg);
      }
    })
  }

  // 警示描述
  public warnName:any = null;


    // 文件删除按钮
    removeReport = (file: UploadFile) => true;

    public isReject:any = false;
    public planLength = 500;
    public rejectReason:any = null;
    rejectPlan() {
      this.isReject = true;
      this.rejectReason = null;
    }
    rejectCancel() {
      this.isReject = false;
      this.rejectReason = null;
    }

    audit(num:any) {
      if(this.hasBeenAudit) {
        this.msg.warning('该考核对象计划已审核，无法修改！')
        return;
      }
  
      if(num === 7 && !this.judgeText(this.rejectReason)) {
        this.msg.warning('请输入驳回原因！')
        return
      }
      let cOrgDupUUID:any;
      this.depPlanData.buMen.forEach(e => {
        e.cOrgName === this.depResponse ? cOrgDupUUID=e.cOrgDupUUID : null;
      });
      this.http.post('/cnic-organizationdepartment/ProvincialAction/getPlanApprove',{
        cOrgDupUUID: cOrgDupUUID,
        iStite: num,
        cDescribe: this.rejectReason,
        cAccUniqueID: this.account.cAccUniqueID, //  "帐套唯一标识",
      }).subscribe((res:any) => {
        if(res.code === 200) {
          this.clickTreeTable();
          this.msg.success(res.msg)
          this.resetReport();
          this.isReject = false;
          this.rejectReason = null;
          this.selectedValue = '0'
        } else {
          this.msg.warning(res.msg)
        }
      })
    }

    reportCancel() {
      this.resetReport();
      this.selectedValue = '0'
    }
    

}