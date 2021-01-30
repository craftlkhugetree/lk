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
import { XlsxService } from '@delon/abc';
import { STColumn } from '@delon/abc/table';
import { MarketValueTargetYearscoreComponent } from '../yearscore/yearscore.component';

@Component({
  selector: 'app-market-value-target-depadmin',
  templateUrl: './depadmin.component.html',
})
export class MarketValueTargetDepadminComponent extends MarketValueTargetYearscoreComponent {
  public depObj = {
    cMaker: this.login.cPersonName,
    cMakerCode: this.login.cPersonCode,
    dCreateDate: new Date(),
    pubufts: new Date(),
    cOrgName: '',
    cOrgCode: '',
    cRdRule: '**  **  **',
    sys_Account: {
      iSysID: this.account.iSysID,
      pubufts: new Date(),
    },
  };
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
    private xlsx: XlsxService,
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



  // 表格数组
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  nzTotal = null; // 表格总数据

  // 批量删除二次确认
  isVisible = false;
  // 单个增加模态
  isVisible1 = false;
  creatid = null; // 编号
  creatname = null; // 部门名称
  creattime = new Date(); // 增加时间
  // 编辑模态
  isVisible2 = false;
  editid = null; // 编辑 id
  editname = null; // 编辑 部门名称
  edittime = new Date(); // 编辑时间
  editdata = null; // 所编辑的信息存储
  // 批量导入
  isVisible3 = false;
  // 下载模版表头
  templateHeader = [
    { name: '编号' },
    { name: '部门名称' },
    // { name: '创建日期' },
    // { name: '年' },
    // { name: '月' },
    { name: '' },
    { name: '' },
    { name: '*编号为偶数位正整数。模板不可更改,否则将无法正常显示*' },
  ];

 

  ngOnInit() {
    this.orgServe.orgChooseEventer.subscribe((res: any) => {
      if (res.cOrgUUID) {
  this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));

        // this.current_org = this.orgServe.getCurrentOrg();
      }
    });
    this.getDep();

    this.nzTotal = this.depList.length;
  }

  // 表格多选控制
  currentPageDataChange($event): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    if (this.listOfDisplayData.length > 0) {
      this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
      this.isIndeterminate =
        this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  // 删除确认 -- 单个删除
  confirm(data: any) {
    this.isLoading = true;
    this.http
      .post('/cnic-organizationdepartment/DeptManageAction/deleteObject', {
        list: [
          {
            cOrgUUID: data.cOrgUUID,
            iOrgID: data.iOrgID,
            cOrgName: data.cOrgName,
          },
        ],
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.getDep();
          this.msg.success(res.msg);
        } else {
          this.msg.warning(res.msg);
        }
        this.loadCircle();
      });
  }

  // 删除取消 -- 单个删除
  cancel() {}

  // 批量删除
  delete1() {
    const cmm:any = Object.keys(this.mapOfCheckedId); // 取出表格选中的值 是true 还是false

    // 如果表格未选择删除数据 关闭模态 阻止下行
    if (cmm.length === 0) {
      this.isVisible = false;
      this.msg.warning('未选择删除数据!');
      return;
    }

    this.delArr = []
    cmm.forEach(item => {
      const tmp = this.depList[parseInt(item)];
      this.delArr.push({
        cOrgUUID: tmp.cOrgUUID,
            iOrgID: tmp.iOrgID,
            cOrgName: tmp.cOrgName,
      })
    });
    // 打开二次确认窗口
    this.isVisible = true;
  }

  public delArr = [];
  // 批量删除 -- 取消
  handleCancel() {
    this.isVisible = false;
  }
  // 批量删除 -- 确认
  handleOk() {
    this.isLoading = true;
    this.http
      .post('/cnic-organizationdepartment/DeptManageAction/deleteObject', 
      {
        list: this.delArr
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.getDep();
          this.msg.success(res.msg);
          this.mapOfCheckedId = {};
        } else {
          this.msg.warning(res.msg);
        }
      this.isVisible = false;
      this.loadCircle();
      });
  }

  // 增加模态
  increase() {
    this.creatid = null; // 清空编码
    this.creatname = null; // 清空名称
    this.isVisible1 = true;
  }

  judgeEven(num: any) {
    return /^[0-9]*$/.test(num) && num.toString().length % 2 === 0;
  }
  // 增加 -- 取消
  handleCancel1() {
    this.reset();
  }
  // 增加 -- 确认
  handleOk1() {
    if (!this.judgeEven(this.creatid)) {
      this.msg.warning('请输入编号，编号为偶数位正整数!');
      return;
    }
    if (!this.judgeText(this.creatname)) {
      this.msg.warning('请输入部门名称');
      return;
    }
    this.isLoading = true;
    this.depObj.cOrgName = this.creatname;
    this.depObj.cOrgCode = this.creatid;
    this.depObj.dCreateDate = new Date();
    this.http
      .post('/cnic-organizationdepartment/DeptManageAction/saveDeptObj', this.depObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.getDep();
          this.msg.success(res.msg);
          this.reset();
        } else {
          this.msg.warning(res.msg);
        }
        this.loadCircle();
      });
  }

  reset() {
    this.isVisible1 = false;
    this.isLoading = false;
    this.isVisible2 = false;
  }
  loadCircle() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  // 编辑
  edit(data: any) {
    // console.log(data);
    this.editid = data.cOrgCode;
    this.editname = data.cOrgName;
    // this.edittime = new Date();
    this.editdata = { ...data };
    this.isVisible2 = true;
  }
  // 编辑 -- 取消
  handleCancel2() {
    this.isVisible2 = false;
  }
  // 编辑 -- 确认
  handleOk2() {
    if (!this.judgeEven(this.editid)) {
      this.msg.warning('请输入编号，编号为偶数位正整数!');
      return;
    }
    if (!this.judgeText(this.editname)) {
      this.msg.warning('请输入部门名称');
      return;
    }
    this.isLoading = true;
    this.editdata.cOrgCode = this.editid;
    this.editdata.cOrgName = this.editname;
    this.editdata.cModCode = this.login.cPersonCode;
    this.editdata.cModName = this.login.cPersonName;
    this.editdata.cRdRule = this.depObj.cRdRule;
    this.http
      .post('/cnic-organizationdepartment/DeptManageAction/updateDeptObj', this.editdata)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.getDep();
          this.msg.success(res.msg);
          this.reset();
        } else {
          this.msg.warning(res.msg);
        }
        this.loadCircle();
      });
  }

  // 批量导入
  BatchImport() {
    this.isVisible3 = true;
  }
  handleCancel3() {
    this.isVisible3 = false;
  }
  handleOk3() {
    const fileArr = this.fileDate[this.sheetName];
    const tmp = [];
    if(!fileArr) {
      this.msg.warning('请使用下载的模板')
      return;
    }
    for(let i=1,len=fileArr.length; i<len; i++) {
      if(fileArr[i].length > 0) {
        tmp.push({
          cOrgCode: fileArr[i][0],
          cOrgName: fileArr[i][1],
          cMaker: this.login.cPersonName,
          cMakerCode: this.login.cPersonCode,
    cRdRule: '**  **  **',

          pubufts: new Date(),
          dCreateDate: new Date(),
          sys_Account: {
            iSysID: this.account.iSysID,
            cAccUniqueID: this.account.cAccUniqueID
          }
        })
      }
    }
 
    this.http.post('/cnic-organizationdepartment/DeptManageAction/saveBatch',
    {list:tmp}).subscribe((res:any) => {
      if(res.code === 1) {
        this.msg.success(res.msg);
        this.getDep();
    this.isVisible3 = false;
      } else {
        this.msg.warning(res.msg);
      }
    })
  }

  // 下载模版
  // tslint:disable-next-line: member-ordering
  columns: STColumn[] = [];
  public sheetName = '部门导入';
  download() {
    this.columns = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.templateHeader.length; i++) {
      this.columns.push({
        title: this.templateHeader[i].name,
        index: this.templateHeader[i].name,
      });
    }
    // tslint:disable-next-line: no-shadowed-variable
    const data = [this.columns.map(i => i.title)];
    data.push(...[]);
    this.xlsx.export({
      filename: '批量导入部门.xlsx',
      sheets: [
        {
          data,
          name: this.sheetName,
        },
      ],
    });
  }

  // 上传文件

  // 渲染文件
  public fileDate:any;
  change(e: Event) {
    // console.log(e)
    // @ts-ignore：
    if (e.target.files.length > 1) {
      this.msg.warning('只能上传1个文件!');
      return;
    }
    const file = (e.target as HTMLInputElement).files![0];
    this.xlsx.import(file).then(res => {
        this.fileDate=res
        // console.log(res)
      });
  }
}
