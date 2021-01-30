/** @Author: Adrian
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
import { MarketValueTargetAuditplanComponent } from '../auditplan/auditplan.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-market-value-target-implementation-report',
  templateUrl: './implementation-report.component.html',
})
export class MarketValueTargetImplementationReportComponent extends MarketValueTargetAuditplanComponent {

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

  public planLength = 500;

  // 落实情况
  public impStatus = [
    { key: '指标序号', value: 1 },
    { key: '指标名称', value: this.idxTitle },
    // { key: '责任部门', value: '责任部门名称' },
    { key: '分管领导', value: '分管领导姓名' },
    { key: '具体负责人', value: '具体负责人姓名' },
    // { key: '原定本阶段计划', value: '本阶段计划本阶段计划本阶段计划本阶段计划本阶段计划' },
  ];

  public upImpObj = {
    cPlanContent: null, //  "计划内容",
    cOrgDupUUID: null, //  "指标与部门唯一标识",
    iType: null, //  "1月,2季,3自定义,4临时计划,11已发布的临时计划,12未发布的临时计划",
    dBegin: null, //  "开始时间",
    dFinish: null, //  "结束时间",
    cPlanFile: null, //  "计划文件",
    cSituation: null, //  "完成情况",
    cExisting: null, //  "存在问题",
    cNextPlan: null, //  "下一步计划",
    cSignFile: null, //  "领导签批资料",
    iStite: null, //  "落实情况状态标识,1未上报，2已超时未上报，3已上报，4已超时上报,5未审核,6审核通过,7驳回",
    fileList: null,
    rejectDes:null,
    "cAccUniqueID": this.account.cAccUniqueID,
    "cSendOrgUUID": this.current_org.cOrgUUID,
    "cSendOrgName": this.current_org.cOrgName,
    "cPersonUUID": this.login.cPersonUUID,
    "cPersonName": this.login.cPersonName,
    cIndexUUID:null,
    iIndexType:1
    //   [{
    //     "cAddress":null, //  "文件链接地址",
    //     "cDocument":null, //  "文件名",
    //     "cFileCode":null, //  "文件编码"
    // }]
  }
  reUpImpObj() {
    this.upImpObj = {
      cPlanContent: null, //  "计划内容",
      cOrgDupUUID: null, //  "指标与部门唯一标识",
      iType: null, //  "1月,2季,3自定义,4临时计划,11已发布的临时计划,12未发布的临时计划",
      dBegin: null, //  "开始时间",
      dFinish: null, //  "结束时间",
      cPlanFile: null, //  "计划文件",
      cSituation: null, //  "完成情况",
      cExisting: null, //  "存在问题",
      cNextPlan: null, //  "下一步计划",
      cSignFile: null, //  "领导签批资料",
      iStite: null, //  "落实情况状态标识,1未上报，2已超时未上报，3已上报，4已超时上报,5未审核,6审核通过,7驳回",
      fileList: null,
      rejectDes:null,
      "cAccUniqueID": this.account.cAccUniqueID,
      "cSendOrgUUID": this.current_org.cOrgUUID,
      "cSendOrgName": this.current_org.cOrgName,
      "cPersonUUID": this.login.cPersonUUID,
      "cPersonName": this.login.cPersonName,
      cIndexUUID:null,
      iIndexType:1,
    };
    this.planN = {};
    this.hasBeenAudit = false;
    this.depPlanData = [];
    this.isReport = false;
    this.fileArr = [];
    this.fileList = [];
    this.fileListBK = [];
    this.delFile = [];
  }
    // 指标计划
    public isPlanList = false;
    public planN: any = {};
    openPlan() {
      this.planList = [];
      const obj = {
        cIndexUUID: this.idxReport.cIndexUUID,
        checkObjOrgUUID: this.current_org.cOrgUUID,
        iIndexType: 1,
        cPlanContent: this.mName.plan,
      };
      this.http
        .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoBywhereStr', obj)
        .subscribe((res: any) => {
          if (res.code === 1) {
            const t = res.data;
            this.depPlanData = this.planOrder(res.data);
            this.getPlanRadio(t);
          } else {
            this.msg.warning(res.msg);
          }
          this.mName.plan = null;
        });
      if (this.isReport) {
        this.isModal = true;
      }
    }
  
  nameSearch() {
    this.isModal = true;
    this.mName = this.charger;
  }

  zeroCancel() {
    this.planN = {};
    this.rePlan();
  }
  zeroOk() {
    this.planN = { ...this.mName };

    if (this.judgeText(this.planN.plan)) {
      const tmp: any = this.depPlanData.filter(i => i.cPlanContent === this.planN.plan);
      if (tmp.length === 0) {
        this.msg.warning('该计划不存在或不完整，请重新选择！');
        return;
      } else {
        for (let obj in tmp[0]) {
          this.upImpObj[obj] = tmp[0][obj];
        }
        tmp[0].executeStatus === 6 ? this.hasBeenAudit = true : this.hasBeenAudit = false;
        this.upImpObj.iStite = tmp[0].executeStatus;
        this.mName.flag === 7 ? this.rejectReason = true : this.rejectReason = false;
        this.warnS = tmp[0].iWhole+'';

        // 备份文件列表，以备文件删除和增加
        this.fileListBK = [...tmp[0].cSignFileList];

        const t: any = [...tmp[0].cSignFileList];
        this.fileList = [];
        if (t && t.length > 0) {
          t.forEach(item => {
            this.fileList.push({
              name: item.cDocument,
              url: item.cAddress,
              uid: item.cFileCode,
            });
          });
          // 必须filter，否则不会刷新文件列表
          this.fileList = this.fileList.filter(i => true);
        }
      }
    } else {
      this.msg.warning('请选择计划！');
      return;
    }
    this.rePlan();
  }

  rePlan() {
    this.mName = {};
    this.isModal = false;
  }
  resetZero() {
    this.isModal = false;
    // this.idxPlanList = [];
  }


  // // 七种指示灯
  // public timeoutNotUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时未上报</div>`;
  // public timeoutUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时上报</div>`;
  // public up = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:green;text-align: center;background:#94d4cf;border: 0.3px solid #7b8d8c;border-radius: 8px;">已上报</div>`;
  // public already = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#96c1ff;text-align: center;background:#edf4ff;border: 0.3px solid #96c1ff;border-radius: 8px;">审核通过</div>`;
  // public notAudit = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#fdc15e;text-align: center;background:#fff7ea;border: 0.3px solid #fdc15e;border-radius: 8px;">未审核</div>`;
  // public reject = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">驳回</div>`;
  // public notUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#c0c0c0;text-align: center;background:#f8f8f8;border: 0.3px solid #c0c0c0;border-radius: 8px;">未上报</div>`;
  
  // public mark = [this.already, this.notAudit, this.reject, this.notUp, this.timeoutNotUp, this.timeoutUp, this.up];


  uploadFiles() {
      this.fileArr = [];
      if (this.fileList.length === 0) {
        this.saveIdx();
      } else {
        const formData = new FormData();
        // const reader = new FileReader();
        let serverFiles = 0;
        this.fileList.forEach((file: any, index) => {
          let fileF = true;
          for (let i = 0, len = this.fileListBK.length; i < len; i++) {
            if (this.fileListBK[i].cAddress === file.url && this.fileListBK[i].cDocument === file.name) {
              this.fileArr.push({
                cAddress: this.fileListBK[i].cAddress,
                cDocument: this.fileListBK[i].cDocument,
                cFileCode: this.fileListBK[i].cFileCode,
                cFileUUID: this.fileListBK[i].cFileUUID,
              });
              fileF = false;
              break;
            }
          }
          fileF ? formData.append('files[]' + index, file) : serverFiles++;
        });
        if (serverFiles === this.fileList.length) {
          this.saveIdx();
        } else {
          const req = new HttpRequest(
            'POST',
            this.login.cFileServerInfo +
              '/Sys_DocumentLibray_CNICM/upLoadImageDocument/' +
              this.account.iSysID +
              '/' +
              this.login.cUserName,
            formData,
            {
              // reportProgress: true,
            },
          );
  
          this.htp
            .request(req)
            .pipe(filter(e => e instanceof HttpResponse))
            .subscribe((res: any) => {
              if (res.body && res.body.Result.iRsult === 1) {
                for (let i = 0; i < res.body.listData.length; i++) {
                  const url =
                    this.login.cFileLoadServerInfo +
                    '/' +
                    res.body.listData[i].cDirRelativePath +
                    '/' +
                    res.body.listData[i].cUpDocumentName;
  
                  this.fileArr.push({
                    cAddress: url,
                    cDocument: res.body.listData[i].cDocumentName,
                    cFileCode: res.body.listData[i].cDLCode,
                    cFileUUID: res.body.listData[i].cDLID,
                  });
                }
                this.saveIdx();
              } else {
                this.msg.error(res.body.Result.cRsultInfo);
                // this.msg.error(res.Result.cRsultInfo);
              }
            });
        }
      }
    }
  
    saveIdx() {
      this.fileList.length === 0 ? (this.upImpObj.fileList = null) : (this.upImpObj.fileList = this.fileArr);
      this.delFile.length > 0 ? this.deleteFile(this.delFile) : null;
      this.upImpObj.cIndexUUID = this.idxReport.cIndexUUID
  
      this.http
        .post(
          '/cnic-organizationdepartment/IndexPlanExecuteAction/saveExecuteInfo',
          this.upImpObj,
        )
        .subscribe((res: any) => {
          if (res.code === 1) {
            this.msg.success(res.msg);
            this.reUpImpObj();
          } else {
            this.msg.warning(res.msg);
          }
        });
    }
  
    reportCancel() {
      this.reUpImpObj();
    }
  
    reportOk() {
      if(this.hasBeenAudit) {
        this.msg.warning('该计划已审核，无法上报！')
        return;
      }
      if (!this.current_org.cOrgUUID) {
        this.msg.warning('请选择右上角组织！');
        return;
      }
      if (!this.planN.plan) {
        this.msg.warning('请选择计划！')
        return;
      }
      this.uploadFiles();
    }
  
    // 审核模态框
    report(e: any) {
      this.reUpImpObj();
      this.idxReport = e;
      this.getPlan();
    }
  
    public depArr:any = []
    getPlan() {
      this.depArr = []
      this.planList = [];
      // let orgUUid:any = this.idxReport.zeRen.filter(item => item.cOrgName === this.depResponse);
      this.http
        .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoByIdx_Org', {
          // this.http.post('/cnic-organizationdepartment/ProvincialAction/getPlanAudit',{
          cIndexUUID: this.idxReport.cIndexUUID,
          // iIndexXz: 1,
          iIndexType: 1,
          checkObjOrgUUID: this.current_org.cOrgUUID,
          // cOrgUUID: this.current_org.cOrgUUID,
        })
        .subscribe((res: any) => {
          if (res.code === 1) {
      this.isReport = true;

            this.depArr = [...res.data];
            this.impStatus[0].value = res.data.IORDER;
            this.impStatus[1].value = res.data.CINDEXNAME || this.idxReport.cIndexName;
            this.impStatus[2].value = res.data.CPERSIONFNAME ;
            this.impStatus[3].value = res.data.CPERSIONJNAME ;
            // this.getGolbalWarn();
          } else {
            this.msg.warning(res.msg);
            this.depArr = [];
            this.impStatus = [
              { key: '指标序号', value: null },
              { key: '指标名称', value: null },
              { key: '分管领导', value: null },
              { key: '具体负责人', value: null },
            ];
          }
        });
    }
  
    getGolbalWarn() {
      this.http
        .post('/cnic-organizationdepartment/ProvincialAction/getGlobalRecord', {
          cOrgDupUUID: this.depArr[0].CORGDUPUUID,
        })
        .subscribe((res: any) => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.warnS = ''.toString();
            } else {
              this.warnS = '全局指示';
            }
          } else {
            this.msg.warning(res.msg);
          }
        });
    }
  
    // 删除文件
    removeReport = (file: UploadFile): boolean => {
      if(this.hasBeenAudit) {
        return false;
      }else{
      for (let i = 0, len = this.fileListBK.length; i < len; i++) {
        if (this.fileListBK[i].cAddress === file.url && this.fileListBK[i].cDocument === file.name) {
          this.delFile.push(file.uid);
        }
      }
      return true;
    }
    };
  
}