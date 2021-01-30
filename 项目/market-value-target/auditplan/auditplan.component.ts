/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/12/10 08:00
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
import { MarketValueTargetImplementReportComponent } from '../implement-report/implement-report.component';
@Component({
  selector: 'app-market-value-target-auditplan',
  templateUrl: './auditplan.component.html',
})
export class MarketValueTargetAuditplanComponent extends MarketValueTargetImplementReportComponent {
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

  // 审核模态框
  public selectedValue:any = '0';
  report(e: any) {
    this.selectedValue = '0';
    this.idxReport = e;
    this.optionList = this.createDownList(this.idxReport.kaoHe);
    this.depResponse = this.optionList[0].label;
    this.getPlanContent();
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
    let orgUUid:any = this.idxReport.kaoHe.filter(item => item.cOrgName === this.depResponse);
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getPlanAudit',{
      cIndexUUID: this.idxReport.cIndexUUID,
      iIndexXz: 2,
      cOrgUUID: orgUUid[0].cOrgUUID,
    })
    .subscribe((res:any) => {
      if(res.code === 200) {
    this.isReport = true;

        this.depPlanData = res.data;
        this.leader.cPersonName = this.depPlanData.buMen[0].cPersionFName;
        this.charger.cPersonName = this.depPlanData.buMen[0].cPersionJName;
        if(this.depPlanData.buMen[0].iStite === 7) {
           this.rJ = true;
           this.rJText = this.depPlanData.buMen[0].cDescribe
        }else {
          this.rJ = false;
          this.rJText = null;
        }
        if(this.depPlanData.buMen[0].iStite === 6) {
          this.hasBeenAudit = true;
        }
        const t = res.data;
        this.getPlanRadio(t.putTong);
    
      } else {
        this.msg.warning(res.msg);
      }
    })
  }

  public isReject:any = false;
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
    let cOrgDupUUID:any;
      if(num === 7 && !this.judgeText(this.rejectReason)) {
        this.msg.warning('请输入驳回原因！')
        return
      }
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

  // 选择考核对象下拉框
  public optionList: any = [];
 // 选择考核对象
 public depResponse:any ;
 chooseExamDep(e: any) {
  this.hasBeenAudit = false;
  this.depResponse = this.optionList[e].label;
  this.getPlanContent();
}
reportCancel() {
  this.resetReport();
  this.selectedValue = '0'
}


}
