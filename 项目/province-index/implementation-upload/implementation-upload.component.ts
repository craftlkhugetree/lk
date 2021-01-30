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
import { ProvinceIndexPlanVerifyComponent } from '../plan-verify/plan-verify.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-province-index-implementation-upload',
  templateUrl: './implementation-upload.component.html',
})
export class ProvinceIndexImplementationUploadComponent extends ProvinceIndexPlanVerifyComponent {
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
    cIndexUUID:null,
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
    iIndexType:2,
    //   [{
    //     "cAddress":null, //  "文件链接地址",
    //     "cDocument":null, //  "文件名",
    //     "cFileCode":null, //  "文件编码"
    // }]
  };

  reUpImpObj() {
    this.upImpObj = {
      cIndexUUID:null,
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
      iIndexType:2,
    };
    this.planN = {};
    this.hasBeenAudit = false;
    this.depPlanData = [];
    this.isReport = false;
    this.fileArr = [];
    this.fileList = [];
    this.fileListBK = [];
    this.delFile = [];
    this.tmpPlanList = [];
    this.planList = [];
  }
  // public planStatus = '0'

  // public planStatusList = [
  //   {key:'0',label:'未上报'},
  //   {key:'1',label:'未上报已超时'},
  //   {key:'2',label:'已上报'},
  //   {key:'3',label:'已审核'},
  //   {key:'4',label:'被驳回'},
  // ]
  // choosePlanStatus(e:any) {

  // }

  // 指标计划
  public isPlanList = false;
  public planN: any = {};
  openPlan() {
    this.planList = [];
    const obj = {
      cIndexUUID: this.idxReport.cIndexUUID,
      checkObjOrgUUID: this.current_org.cOrgUUID,
      iIndexType: 2,
      cPlanContent: this.mName.plan,
    };
    this.http
      .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoBywhereStr', obj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          const t:any = res.data.filter(i => i.iType === 4);
          const three:any = res.data.filter(i => i.iType !== 4);
          this.depPlanData = this.planOrder(res.data);
          t && t.length > 0 ? this.getPlanRadio(t) : null;
          three && three.length > 0 ? this.getPlanRadio(three) : null;
        } else {
          this.msg.warning(res.msg);
        }
        this.mName.plan = null;
      });
    if (this.isReport) {
      this.isModal = true;
    }
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
              this.upOkSaveFailed = [];
              for (let i = 0; i < res.body.listData.length; i++) {
                const url =
                  this.login.cFileLoadServerInfo +
                  '/' +
                  res.body.listData[i].cDirRelativePath +
                  '/' +
                  res.body.listData[i].cUpDocumentName;

                this.upOkSaveFailed.push(res.body.listData[i].cDLCode);
                
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
    this.upImpObj.cIndexUUID = this.idxReport.cIndexUUID;
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
          this.deleteFile(this.upOkSaveFailed)
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
    this.tabIndex = 0;
  }

  public depObj:any = {}
  getPlan() {
    this.depObj = {}
    this.planList = [];
    // let orgUUid:any = this.idxReport.zeRen.filter(item => item.cOrgName === this.depResponse);
    this.http
      .post('/cnic-organizationdepartment/IndexPlanExecuteAction/getPlanInfoByIdx_Org', {
        // this.http.post('/cnic-organizationdepartment/ProvincialAction/getPlanAudit',{
        cIndexUUID: this.idxReport.cIndexUUID,
        // iIndexXz: 1,
        iIndexType: 2,
        checkObjOrgUUID: this.current_org.cOrgUUID,
        // cOrgUUID: this.current_org.cOrgUUID,
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isReport = true;
          this.depObj = res.data;
          this.impStatus[0].value = res.data.IORDER;
          this.impStatus[1].value = res.data.CINDEXNAME || this.idxReport.cIndexName;
          this.impStatus[2].value = res.data.CPERSIONFNAME ;
          this.impStatus[3].value = res.data.CPERSIONJNAME ;
          // this.getGolbalWarn();
        } else {
          this.msg.warning(res.msg);
          this.depObj = {};
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
        cOrgDupUUID: this.depObj.CORGDUPUUID,
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
