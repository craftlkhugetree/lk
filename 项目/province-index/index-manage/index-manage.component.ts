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
import { ProvinceIndexTempSubmittedPlanComponent } from '../temp-submitted-plan/temp-submitted-plan.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-province-index-index-manage',
  templateUrl: './index-manage.component.html',
})
export class ProvinceIndexIndexManageComponent extends ProvinceIndexTempSubmittedPlanComponent {
  public idxLabel = null;

  public cS: any = null;
  public statusList = ['未发布', '已发布'];

  // 树组件上的编辑按钮flag
  public isNewEdit = true;
  public isNew = true;

  public inputDisable = false;

  // 指标编辑接口参数
  public updateIdx = {
    cIndexUUID: '', // "指标唯一标识",
    cIndexName: '', // "指标名",
    iOrder: '', // "指标序号",
    deScore: '', // "权重",
    cEvaluation: '', // "标准",
    cRemark: '', // "备注",
    listFile: null,
    // {
    //   "objectFile":  {
    //     "cAddress":'', // "计划附件地址(链接)",
    //     "cDocument":'', // "附件名称",
    //     "cFileCode":'', // "文件code",
    //     "cFileUUID":'', // "文件自有UUID"
    //   }
    // }
    cUpPersonCode: this.login.cPersonCode,
    cUpPerson: this.login.cPersonUUID,
    cUpContent: '', // "修改依据及内容,已发布情况下修改则为必填",
    cUpPersonName: this.login.cPersonName, // "修改人",
    iIndexXz1: null,
    iIndexXz2: null,
  };
  resetUpdateIdx() {
    this.updateIdx = {
      cIndexUUID: '', // "指标唯一标识",
      cIndexName: '', // "指标名",
      iOrder: '', // "指标序号",
      deScore: '', // "权重",
      cEvaluation: '', // "标准",
      cRemark: '', // "备注",
      listFile: null,
      cUpPersonCode: this.login.cPersonCode,
      cUpPerson: this.login.cPersonUUID,
      cUpContent: '', // "修改依据及内容,已发布情况下修改则为必填",
      cUpPersonName: this.login.cPersonName, // "修改人",
      iIndexXz1: null,
      iIndexXz2: null,
    };
  }

  // 给编辑界面赋值
  assignIdx() {
    for (let obj in this.idxData) {
      this.updateIdx[obj] = this.idxData[obj];
    }
  }

  // 获取树层级和搜索按钮使用同一个接口
  cSChange(e: any) {
    // console.log(e,typeof e)
    this.cS = parseInt(e);
    this.idxSearchObj.iRelease = this.cS;
  }

  // 点击树
  nzEvent(e: any) {
    this.event = e;
    if (e) {
      !e.node.origin.bEnd && e.node.title != '全部' ? (this.isNewEdit = false) : (this.isNewEdit = true);
      !e.node.origin.bEnd || e.node.level === 0 ? (this.isNew = false) : (this.isNew = true);
      // console.log(e);
      this.idxTitle = e.node.origin.title;
      // this.idxList = this.genTableData();

      this.clickTreeTable();
      setTimeout(() => {
        this.setTreeHeight();
      }, 100);
    }
  }

  // public flag:any = null;
  // 树组件上编辑按钮
  editIdx(num: any) {
    this.isEdit = true;
    this.flag = num;
    if (num === 1) {
      this.resetObj();
      this.title = '新增指标';
    }
    if (num === 2) {
      this.title = '编辑指标';
      this.lastLevel = '0';
      this.getEditInfo({ cIndexUUID: this.event.node.origin.key });
    }
  }

  // 树组件上删除按钮
  delForm(e: any) {
    this.http
      .post('cnic-organizationdepartment/ProvincialAction/getIndexDel', { cIndexUUID: this.event.node.origin.key })
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getIndex();
          this.resetNew();
          this.event = null;
          this.idxTitle = null;
          this.msg.success(res.msg);
        } else {
          this.msg.warning(res.msg);
        }
      });
  }

  // pop取消
  cancel() {
    this.resetNew();
  }
  resetNew() {
    this.isEdit = false;
    this.fileList = [];
    this.delFile = [];
    this.fileArr = [];
    this.fileListBK = [];
    this.isNew = true;
    this.isNewEdit = true;
    this.inputDisable = false;
    setTimeout(() => {
      this.lastLevel = '1';
    }, 50);
  }

  // 表格编辑按钮
  edit(e: any, num: any) {
    this.isEdit = true;
    this.flag = num;
    this.lastLevel = '1';
    this.index = e;

    this.getEditInfo({ cIndexUUID: this.idxList[e].cIndexUUID });

    if (num === 2) {
      this.title = '编辑指标';
      setTimeout(() => {
        this.idxData.cUpContent = null;
      }, 1000);
    }
    if (num === 3) {
      this.title = '查看指标';
      this.inputDisable = true;
    }
  }

  editCancel() {
    this.resetNew();
  }
  editOk() {
    this.flag !== 3 ? this.uploadFiles() : this.resetNew();
  }

  uploadFiles() {
    this.event ? (this.idxData.iLevel = this.event.node.level + 1) : null;
    !!this.idxData.dMkdir ? (this.idxData.dMkdir = new Date(this.idxData.dMkdir + '').getFullYear() + '') : null;
    this.chooseBool();

    if (!this.judgeText(this.idxData.cIndexName)) {
      this.msg.warning('请输入指标名称！');
      return;
    }

    const tmp: any = this.idxData.iOrder;
    if (!tmp) {
      this.msg.warning('请输入指标序号！');
      return;
    } else if (typeof tmp !== 'number' || tmp <= 0 || tmp.toString().indexOf('.') > 0) {
      this.msg.warning('指标序号为正整数！');
      return;
    }

    if (this.idxData.bEnd !== false && !this.idxData.bEnd) {
      this.msg.warning('请选择是否为末级指标！');
      return;
    }
    if (!this.idxData.dMkdir) {
      this.msg.warning('请选择年份！');
      return;
    }
    if (this.idxData.bEnd && (!this.idxData.iIndexXz1 || this.idxData.iIndexXz1.length === 0)) {
      this.msg.warning('请选择责任部门！');
      return;
    }
    if (this.idxData.bEnd && !this.judgeText(this.idxData.cUpContent) && this.idxData.iRelease === 1) {
      this.msg.warning('请输入修改的依据！');
      return;
    }

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

  // 放在文件上传成功的回调内
  saveIdx() {
    this.fileList.length === 0 ? (this.idxData.listFile = null) : (this.idxData.listFile = this.fileArr);
    // 新增指标
    if (this.flag === 1) {
      this.event.node.level > 0 ? (this.idxData.cParentUUID = this.event.node.origin.key) : null;
      this.http
        .post('cnic-organizationdepartment/ProvincialAction/getIndexInput', this.idxData)
        .subscribe((res: any) => {
          if (res.code === 200) {
            this.getIndex();
            this.idxData.bEnd ? this.clickTreeTable() : null;
            this.msg.success(res.msg);
            setTimeout(() => {
              this.resetNew();
            }, 500);
          } else {
            this.msg.warning(res.msg);
            this.deleteFile(this.upOkSaveFailed);
          }
        });
    }

    // 编辑指标
    if (this.flag === 2) {
      this.assignIdx();
      this.http
        .post('cnic-organizationdepartment/ProvincialAction/getIndexUpd', this.updateIdx)
        .subscribe((res: any) => {
          if (res.code === 200) {
            this.delFile.length > 0 ? this.deleteFile(this.delFile) : null;
            this.getIndex();
            this.idxData.bEnd ? this.clickTreeTable() : null;
            this.msg.success(res.msg);
            setTimeout(() => {
              this.resetNew();
            }, 500);
          } else {
            this.msg.warning(res.msg);
            this.deleteFile(this.upOkSaveFailed);
          }
        });
    }
  }

  // 删除末级指标
  delCast(num: any) {
    this.http
      .post('cnic-organizationdepartment/ProvincialAction/getIndexDel', { cIndexUUID: this.idxList[num].cIndexUUID })
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getIndex();
          if (this.event && this.event.node.origin.bEnd) {
            this.event = null;
            this.idxTitle = null;
            this.idxList = [];
          } else {
            this.clickTreeTable();
          }
          this.msg.success(res.msg);
        } else {
          this.msg.warning(res.msg);
        }
        this.resetNew();
      });
  }

  // 发布的指标，批量发布时需要修改函数内部
  public listIndex = [];

  dealWithCast(e: any, state: any) {
    const api =
      state === 'cast'
        ? 'cnic-organizationdepartment/ProvincialAction/getIndexIssue'
        : 'cnic-organizationdepartment/ProvincialAction/getIndexIssueNo';
    this.listIndex.push(this.idxList[e].cIndexUUID);
    this.http.post(api, { listIndex: this.listIndex }).subscribe((res: any) => {
      if (res.code === 200) {
        this.idxList[e].iRelease = !this.idxList[e].iRelease;
        this.clickTreeTable();
        this.msg.success(res.msg);
      } else {
        this.msg.warning(res.msg);
      }
      this.listIndex = [];
    });
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

  idxYearEdit(e: any) {}
  getDep(cOrgName?: any) {
    const tail: any = !!cOrgName ? cOrgName : null;
    this.http
      .get(`/cnic-organizationdepartment/DeptManageAction/getAllDepts/${this.account.iSysID}/${tail}`)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.depList = [...res.data];
          this.depList.forEach((item, index) => {
            item.id = index;
          });
          this.flag === 2 ? this.getChecked() : null;
        } else {
          this.msg.warning(res.msg);
        }
      });
  }
  depModal() {
    this.getDep();
    this.isModal = true;
  }
  searchDep() {
    this.getDep(this.depSearch);
    this.mapOfCheckedId = {};
  }

  // 表格内部勾选框
  public isAllDisplayDataChecked = false;
  public isIndeterminate = false;
  public numberOfChecked = 0;
  // Object
  public mapOfCheckedId: { [key: string]: boolean } = {};

  checkAll(value: boolean): void {
    this.depList.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.depList.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.depList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    // this.numberOfChecked = this.depList.filter((item,index) => this.mapOfCheckedId[index]).length;
    // console.log(this.mapOfCheckedId,this.numberOfChecked);
    // this.checkIn();
  }

  // 编辑窗口，获取已勾选部门
  getChecked() {
    this.mapOfCheckedId = {};
    if (!!this.idxData.iIndexXz1) {
      this.idxData.iIndexXz1.forEach(i => {
        let id: any;
        this.depList.forEach((j, index) => {
          j.cOrgName === i.cOrgName ? (id = index) : null;
        });
        this.mapOfCheckedId[id] = true;
      });
    }
  }

  // 将勾选保存
  checkIn() {
    const tmp = [];
    const tmpDep = [];
    // const index:any = Object.keys(this.mapOfCheckedId);

    for (let obj in this.mapOfCheckedId) {
      if (obj !== 'undefined' && !!obj && this.mapOfCheckedId[obj]) {
        tmp.push(this.depList[parseInt(obj)].cOrgName);
        tmpDep.push(this.depList[parseInt(obj)]);
      }
    }
    if (tmp.length === 0) {
      this.msg.warning('未选择部门');
      return;
    }
    this.dep = tmp.join(',');
    this.idxData.iIndexXz1 = [];
    tmpDep.forEach(item => {
      this.idxData.iIndexXz1.push({
        cOrgUUID: item.cOrgUUID, //  "部门UUID(组织)",
        cOrgName: item.cOrgName, //  "部门名称(组织)",
        cOrgCode: item.cOrgCode, //  "部门编号(组织)"
      });
    });
  }

  zeroOk() {
    this.checkIn();
    this.resetZero();
    this.mapOfCheckedId = {};
  }

  zeroCancel() {
    this.resetZero();
    this.mapOfCheckedId = {};
  }

  ngOnInit() {
    this.orgServe.orgChooseEventer.subscribe((res: any) => {
      if (res.cOrgUUID) {
        this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
      }
    });
    this.clickTreeTable();
    this.getDep();
  }
}
