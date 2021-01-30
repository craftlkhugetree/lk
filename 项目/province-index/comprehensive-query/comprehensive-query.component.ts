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
import { ProvinceIndexImplementationVerifyComponent } from '../implementation-verify/implementation-verify.component';

@Component({
  selector: 'app-province-index-comprehensive-query',
  templateUrl: './comprehensive-query.component.html',
})
export class ProvinceIndexComprehensiveQueryComponent extends ProvinceIndexImplementationVerifyComponent {
  public idxlabel: any = null;
  // search() {
  //   this.objFlag = false;
  //   this.idxSearchObj.dMkdir = !!this.idxYear ? this.idxYear.getFullYear() : null;
  //   const tmp:any = this.depList.filter(i => i.cOrgName === this.cS);
  //   if(tmp && tmp.length > 0) {
  //     this.idxSearchObj.iIndexXz1 = [
  //       tmp[0].cOrgUUID,]
  //       // cOrgName:tmp[0].cOrgName,
  //       // cOrgCode:tmp[0].cOrgCode,
  //   }else {
  //     this.idxSearchObj.iIndexXz1 = null;
  //   }
  //   this.getIndex();
  //   this.idxList = [];
  //   this.idxTitle = null;
  // }

  public cS: any = null;
  csChange(e: any):void {
    // console.log(e, this.cS)
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


  chooseExamDep(e: any) {
    this.depResponse = this.optionList[e].label;
    let a = this.depObj.deptList.filter(item => item.deptOrgName === this.depResponse);
    this.deptPersionFName = a[0].deptPersionFName;
    this.deptPersionJName = a[0].deptPersionJName;
    // for(let obj in a[0]) {
    //   this.depSelect[obj]  = a[0][obj]
    // }
    this.openPlan();
  }
}
