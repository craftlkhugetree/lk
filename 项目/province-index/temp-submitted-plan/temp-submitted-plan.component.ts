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
import { ProvinceIndexPlanUploadComponent } from '../plan-upload/plan-upload.component';
// import { ProvinceIndexIndexManageComponent } from '../index-manage/index-manage.component'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-province-index-temp-submitted-plan',
  templateUrl: './temp-submitted-plan.component.html',
})
export class ProvinceIndexTempSubmittedPlanComponent extends ProvinceIndexPlanUploadComponent {
  public idxTemp:any = {
    iType: null, // "临时计划状态 11已发布 12 未发布",
    cIndexPlanUUID: null, //  "计划uuid",
    planOrder: new Date().getFullYear(), //  "指标年份",
    dBegin: null, //  "开始时间",
    dFinish: null, //  "完成时间",
    cPlanContent: null, //  "计划内容",
    fileList: null, //
    // "cAddress": "地址",
    // "cDocument": "文件名称",
    // "cFileCode": "文件编码"
  };

  public status: any;
  cast(e: any) {
    const tObj:any = {  "cAccUniqueID": this.account.cAccUniqueID,
    "cSendOrgUUID": this.current_org.cOrgUUID,
    "cSendOrgName": this.current_org.cOrgName,
    "cPersonUUID": this.login.cPersonUUID,
    "cPersonName": this.login.cPersonName,};

    for(let obj in e) {
      tObj[obj] = e[obj]
    }
    this.http.post('/cnic-organizationdepartment/TemporaryPlanAction/sendMsgAboutTemporaryPlan',
   tObj).subscribe((res:any) => {
      if(res.code === 1) {
        this.getTempPlan(e.planOrder);
        this.msg.success(res.msg)
      }else{
        this.msg.warning(res.msg)
      }
    })
    // this.tPlanList[e].btnFlag = !this.tPlanList[e].btnFlag;
  }

  public isEdit = false;
  public title: any;
  public flag: any = null;
  public index: any = null;
  public fileOP: any = null;
  edit(e: any, num: any) {
    this.isEdit = true;
    this.flag = num;
    this.index = e;
    this.fileOP = '选择文件';
    if (num === 1) {
      this.title = '新增计划';
    }
    if (num === 2) {
      this.title = '编辑计划';
      this.singlePlan();
    }
    if (num === 3) {
      this.fileOP = '文件列表';
      this.title = '查看计划';
      this.singlePlan();
    }
  }

  resetNew() {
    this.idxTemp = {
      iType: null, // "临时计划状态 11已发布 12 未发布",
      cIndexPlanUUID: null, //  "计划uuid",
      planOrder: null, //  "指标年份",
      dBegin: null, //  "开始时间",
      dFinish: null, //  "完成时间",
      cPlanContent: null, //  "计划内容",
      fileList: null, //
      // "cAddress": "地址",
      // "cDocument": "文件名称",
      // "cFileCode": "文件编码"
    };
    this.index = null;
    this.inputDisable = false;
    this.isEdit = false;
    this.fileList = [];
    this.delFile = [];
    this.fileArr = [];
    this.fileListBK = [];
    this.dateRange = null;
  }

  editCancel() {
    this.resetNew();
  }

  editOk() {
    if (!this.idxYear1) {
      this.msg.warning('请选择年份！');
      return;
    }
    this.idxTemp.planOrder = new Date(this.idxYear1).getFullYear();

    if (!this.dateRange || this.dateRange.length === 0) {
      this.msg.warning('请选择计划时间范围！')
      return;
    }
    this.idxTemp.dBegin = this.dateRange[0];
    this.idxTemp.dFinish = this.dateRange[1];
    if (!this.judgeText(this.idxTemp.cPlanContent)) {
      this.msg.warning('请输入计划内容！');
      return;
    }
    this.flag !== 3 ? this.uploadFiles() : this.resetNew();
  }

  cancelCast(e: any) {
    const tObj:any = {  "cAccUniqueID": this.account.cAccUniqueID,
    "cSendOrgUUID": this.current_org.cOrgUUID,
    "cSendOrgName": this.current_org.cOrgName,
    "cPersonUUID": this.login.cPersonUUID,
    "cPersonName": this.login.cPersonName,};

    for(let obj in e) {
      tObj[obj] = e[obj]
    }
    
    this.http.post('/cnic-organizationdepartment/TemporaryPlanAction/cancelSendMsgAboutTemporaryPlan',
    tObj).subscribe((res:any) => {
       if(res.code === 1) {
         this.getTempPlan(e.planOrder);
         this.msg.success(res.msg)
       }else{
         this.msg.warning(res.msg)
       }
     })
    // this.tPlanList[e].btnFlag = !this.tPlanList[e].btnFlag;
  }

  cancel() {}

  public dateRange: any = null;
  onChange(e: any) {
    // console.log(e, this.dateRange);
  }

  public idxYear1: any = new Date();
  idxYearChange1(e: any) {}

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
              this.upOkSaveFailed = []
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
            }
          });
      }
    }
  }

  // 放在文件上传成功的回调内
  saveIdx() {
    this.fileList.length === 0 ? (this.idxTemp.fileList = null) : (this.idxTemp.fileList = this.fileArr);
    // 新增指标
    if (this.flag === 1) {
      this.http
        .post('/cnic-organizationdepartment/TemporaryPlanAction/saveTemporaryPlan', this.idxTemp)
        .subscribe((res: any) => {
          if (res.code === 1) {
            this.msg.success(res.msg);
            this.getTempPlan(this.idxTemp.planOrder);
            setTimeout(() => {
              this.resetNew();
            },500);
          } else {
            this.msg.warning(res.msg);
            this.deleteFile(this.upOkSaveFailed);
          }
        });
    }

    // 编辑指标
    if (this.flag === 2) {
      // this.idxTemp.iType = this.idxTemp.ITYPE;
      // this.idxTemp.cIndexPlanUUID = this.idxTemp.CINDEXPLANUUID;
      this.http.post('/cnic-organizationdepartment/TemporaryPlanAction/updateTemporaryPlan', this.idxTemp).subscribe((res: any) => {
        if (res.code === 1) {
          this.delFile.length > 0 ? this.deleteFile(this.delFile) : null;
          this.msg.success(res.msg);
          this.getTempPlan(this.idxTemp.planOrder);
          setTimeout(() => {
            this.resetNew();
          },500);
        } else {
          this.msg.warning(res.msg);
          this.deleteFile(this.upOkSaveFailed);
        }
      });
    }
  }

  // 将服务器上已存在的文件删除
  deleteFile(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      this.http.get(this.login.cFileServerInfo + '/Sys_DocumentLibray_CNICM/deleteDocument/' + arr[i]).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
          } else {
            this.msg.error(res.Result.cRsultInfo);
          }
        },
        () => {
          this.msg.error('请检查网络连接');
        },
      );
    }
  }
  // 删除文件
  remove = (file: UploadFile): boolean => {
    if (this.flag === 3) {
      return false;
    } else {
      for (let i = 0, len = this.fileListBK.length; i < len; i++) {
        if (this.fileListBK[i].cAddress === file.url && this.fileListBK[i].cDocument === file.name) {
          this.delFile.push(file.uid);
        }
      }
      return true;
    }
  };

  ngOnInit() {
    this.orgServe.orgChooseEventer.subscribe((res: any) => {
      if (res.cOrgUUID ) {
        this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
      }
    });
    this.getTempPlan(this.idxTemp.planOrder);
  }

  getTempPlan(year:any) {
    let tmp:any = null;
    if(!year) {
      tmp = new Date().getFullYear();
    }
    else if(typeof year === "object") {
      tmp = year.getFullYear()
    } 
    else if(typeof year === "number") {
      tmp = year
    }
    this.http.post('/cnic-organizationdepartment/TemporaryPlanAction/getTemporaryPlanList',
    {planOrder: tmp}).subscribe((res:any) => {
      if(res.code === 1) {
        this.tmpPlanList = res.data;
        this.tmpPlanList.forEach(i => {
          i.attach = this.genFileList(i.PlanFileList);
          // 必须filter，否则不会刷新文件列表
          i.attach = i.attach.filter(j => true);
        })
      }else {
        this.msg.warning(res.msg)
      }
    })
  }

  removeplan = (file:UploadFile) => {
    return false;
  }

  public begin:any = new Date();
  public end:any = new Date();
  singlePlan() {
    this.http.get('/cnic-organizationdepartment/TemporaryPlanAction/getTemporaryPlanByID/'+this.index.cIndexPlanUUID)
    .subscribe((res:any) => {
      if(res.code === 1) {
        for(let obj in res.data[0]) {
          this.idxTemp[obj] = res.data[0][obj]
        }
        // this.idxTemp.cPlanContent = this.idxTemp.CPLANCONTENT;
        this.idxYear1 = new Date(this.idxTemp.planOrder + '/01/01');
        this.begin = this.idxTemp.dBegin;
        this.end = this.idxTemp.dFinish;
        this.dateRange = [this.begin, this.end];
        this.fileListBK = this.idxTemp.PlanFileList;
        this.fileList = this.genFileList(this.idxTemp.PlanFileList);
      }else{
        this.msg.warning(res.msg);
      }
    })
  }
}
