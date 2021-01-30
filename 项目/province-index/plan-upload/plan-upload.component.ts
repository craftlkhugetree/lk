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
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-province-index-plan-upload',
  templateUrl: './plan-upload.component.html',
})
export class ProvinceIndexPlanUploadComponent implements OnInit, AfterViewInit {
  // tslint:disable: member-ordering
  // tslint:disable: prefer-conditional-expression
  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));
  public rooterChange: any = null;
  public hasBeenAudit:any = false;

  constructor(
    public http: _HttpClient,
    public modal: ModalHelper,
    public modalService: NzModalService,
    public htp: HttpClient,
    public msg: NzMessageService,
    public toolsService: ToolsService,
    public route: ActivatedRoute,
    public router: Router,
    public _elementRef: ElementRef,
    public _render: Renderer2,
    public orgServe: OrgChooseService,
    public menuService: MenuService,
  ) {
    // 路由监听，路由改变时重新初始化富文本组件配置，解决切换菜单时组件不可编辑，数据清空的问题
    // angular的特性，是在切换tab时，会清空缓存，导致富文本组件没有重新渲染导致的。
    this.rooterChange = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.idxList = this.genTableData();
        this.getTableExam();
      }
    });
  }

  // 指标结构
  public idxData: any = {
    cIndexName: null, //  "指标名",
    dMkdir: new Date(), //  "指标年份",
    cParentUUID: null, //  "所属指标UUID,层级大于1时为必填",
    iLevel: null, //  "层级",
    iOrder: null, //  "同级菜单下的顺序",
    bEnd: null, //  "是否末级菜单",
    deScore: '', //  "考核权重",
    cEvaluation: '', //  "考核标准",
    cRemark: '', //  "备注",
    iIndexType: 2, //  "1市考,2省考,3省考落后",
    cAccUniqueID: this.account.cAccUniqueID, //  "帐套唯一标识",
    listFile: null,
    iIndexXz1: null,
    iIndexXz2: null,
  };

  public idxSearchObj = {
    cIndexName: null, //  "指标名",
    dMkdir: new Date(), //  "指标年份",
    iIndexXz1: null, //  "责任部门",
    iIndexXz2: null, //  "考核对象",
    iRelease: null, //  "指标状态",
    iIndexType: 2, //  "1市考,2省考,3省考落后",
    cAccUniqueID: this.account.cAccUniqueID, //  "帐套唯一标识"
  };

  // 计划结构
  public planObj = {
    cIndexUUID: null, //  "指标唯一标识",
    iIndexXz: 1, //  "1责任部门(省考),2考核对象(市考)",
    cOrgUUID: null, //  "部门UUID(组织)",
    cPersionF: null, //  "分管领导UUID",
    cPersionFName: null, //  "分管领导名称,如果UUID不为空则必传",
    cPersionFCode: null, //  "分管领导编号,如果UUID不为空则必传",
    cPersionJ: null, //  "具体负责人UUID",
    cPersionJName: null, //  "具体负责人名称,如果UUID不为空则必传",
    cPersionJCode: null, //  "具体负责人编号,如果UUID不为空则必传",
    iStite: null, //  "1暂存，5上报",
    iType: null, //  "1月,2季,3自定义,",
    IndexYue: null, // 月和季度，字符串数组
    IndexPlan: null,
    // {
    //   "dBegin":null, //  "开始时间",
    //   "dFinish":null, //  "结束时间",
    //   "cPlanContent":null, //  "计划内容"
    // }
  };

  resetObj() {
    this.planObj = {
      cIndexUUID: null, //  "指标唯一标识",
      iIndexXz: 1, //  "1责任部门(省考),2考核对象(市考)",
      cOrgUUID: null, //  "部门UUID(组织)",
      cPersionF: null, //  "分管领导UUID",
      cPersionFName: null, //  "分管领导名称,如果UUID不为空则必传",
      cPersionFCode: null, //  "分管领导编号,如果UUID不为空则必传",
      cPersionJ: null, //  "具体负责人UUID",
      cPersionJName: null, //  "具体负责人名称,如果UUID不为空则必传",
      cPersionJCode: null, //  "具体负责人编号,如果UUID不为空则必传",
      iStite: null, //  "1暂存，5上报",
      iType: null, //  "1月,2季,3自定义,",
      IndexYue: null, // 月和季度，字符串数组
      IndexPlan: null,
    };
    this.idxData = {
      cIndexName: null, //  "指标名",
      dMkdir: new Date(), //  "指标年份",
      cParentUUID: '', //  "所属指标UUID,层级大于1时为必填",
      iLevel: null, //  "层级",
      iOrder: null, //  "同级菜单下的顺序",
      bEnd: null, //  "是否末级菜单",
      deScore: '', //  "考核权重",
      cEvaluation: '', //  "考核标准",
      cRemark: '', //  "备注",
      iIndexType: 2, //  "1市考,2省考,3省考落后",
      cAccUniqueID: this.account.cAccUniqueID, //  "帐套唯一标识",
      listFile: null,
      iIndexXz1: null,
      iIndexXz2: null,
    };
    this.dep = null;
  }

  public objFlag = true;
  getIndex() {
    this.tableLoading = true;
    const obj = this.objFlag
      ? {
          iIndexType: 2,
          dMkdir: new Date().getFullYear(),
          cAccUniqueID: this.account.cAccUniqueID,
        }
      : this.idxSearchObj;
    // 1市考,2省考,3省考落后
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexTier', obj).subscribe(
      (res: any) => {
        if (res.code === 200) {
          this.nodes = !!res.data ? this.toTree(res.data) : [];
          this.addTextAll();
        } else {
          this.msg.warning(res.msg);
        }
      },
      () => {
        this.msg.error('请检查网络连接');
      },
    );
    setTimeout(() => {
      this.objFlag = true;
      this.tableLoading = false;
    }, 200);
  }

  public nodesAll_url = '/province-index/index-manage';
  addTextAll() {
    // this.idxList = [];
    window.location.pathname === this.nodesAll_url
      ? (this.nodes = [
          {
            title: '全部',
            key: '0',
            children: this.nodes,
          },
        ])
      : null;
    // window.location.href
    // scheme://host:port/path?query#fragment
  }

  toTree(data) {
    const tree: any = [];
    // 一级
    data.forEach(item => {
      tree.push({
        title: item.cIndexName,
        key: item.cIndexUUID,
        bEnd: item.bEnd,
        isLeaf: item.bEnd,
        children: item.children && item.children.length > 0 ? this.toTree(item.children) : [],
      });
    });
    return tree;
  }

  // 选择年份和对象
  public cStatus: any = null;
  public idxYear: any = new Date();
  idxYearChange(e: any) {
    // console.log(e, this.idxYear);
    // this.idxSearchObj.dMkdir = new Date(e).getFullYear();
  }
  cStatusChange(e: any) {
    // console.log(e, this.cStatus);
  }

  public cS: any = null;
  // 顶部搜索
  search() {
    this.objFlag = false;
    this.idxSearchObj.dMkdir = !!this.idxYear ? this.idxYear.getFullYear() : null;
    const tmp:any = this.depList.filter(i => i.cOrgName === this.cS);
    if(tmp && tmp.length > 0) {
      this.idxSearchObj.iIndexXz1 = [tmp[0].cOrgUUID,]
    }else {
      this.idxSearchObj.iIndexXz1 = null;
    }
      this.getIndex();
      this.anotherClick();
      this.idxTitle = null;
  }

  anotherClick() {
    this.http
  .post('cnic-organizationdepartment/ProvincialAction/getIndexSel', 
  { 
    iIndexType: 2,
    cAccUniqueID: this.account.cAccUniqueID,
    dMkdir:!!this.idxYear ? this.idxYear.getFullYear() : null,
    iIndexXz1:this.idxSearchObj.iIndexXz1,
    iStite: parseInt(this.cStatus),
    iRelease: this.idxSearchObj.iRelease,
    cIndexName: this.idxSearchObj.cIndexName,
   })
  .subscribe((res: any) => {
    if (res.code === 200) {
      this.idxList = !!res.data ? res.data : [];
    } else {
      this.msg.warning(res.msg);
    }
  });
  }

  cSChange(e: any) {}

  public idxLabel: any;
  public warnS: any = null;
  removeReport = (file: UploadFile) => true;

  // 选择左侧树展示指标
  public nodes: any = [];

  // 表格上方-点击左侧树得到的指标详情
  public idxTitle: any = null;
  // 左侧树-各级指标
  public event: any = null;
  nzEvent(e: any) {
    this.event = e;
    if (e) {
      this.idxTitle = e.node.origin.title;
      this.clickTreeTable();
      setTimeout(() => {
        this.setTreeHeight();
      }, 100);
    }
  }

  clickTreeTable() {
    let argTmp: any;
    // 如果不是树顶就刷新表格数据
    if (this.event && this.event.node.title != '全部') {
      argTmp = this.event.node.origin.key;
    } else {
      argTmp = null;
      this.getIndex();
    }
    this.http
      .post('cnic-organizationdepartment/ProvincialAction/getIndexSel', {
        cIndexUUID: argTmp,
        iIndexType: 2,
        cAccUniqueID: this.account.cAccUniqueID,
        dMkdir:  !!this.idxYear ? this.idxYear.getFullYear() : new Date().getFullYear(),
      })
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.idxList = !!res.data ? res.data : [];
        } else {
          this.msg.warning(res.msg);
        }
      });
  }

  expandBtn() {
    setTimeout(() => {
      this.setTreeHeight();
    }, 200);
  }

  public nzPageIndex0 = 1;
  public nzPageSize0 = 5;
  public tableLoading = false;
  public nzPageSizeOptions = [5, 10, 20, 30, 50];

  // 指标表格数据
  public idxList: any = [];
  public idxReport: any = {};
  // 上报模态框
  report(e: any) {
    this.idxReport = e;
    this.getPlanContent();
    this.tabIndex = 0;
    this.genMonth();
    this.getDepOrg();
  }

  getDepOrg() {
    this.http.get('/CNIC_M/Busi_OrgDepartment/getOrgDepartList/' + this.current_org.cOrgUUID).subscribe((res: any) => {
      if (res.Result.iRsult === 1) {
        this.depList = res.listTree;
      } else {
        this.msg.warning(res.Result.cRsultInfo);
      }
    });
  }
  public rJ = false;
  public rJText = null;
  public depPlanData: any = [];
  getPlanContent() {
    if(!this.current_org.cOrgName) {
      this.msg.warning('请选择右上角组织！')
      return;
    }
    this.depPlanData = [];
    this.http
      .post('/cnic-organizationdepartment/ProvincialAction/getPlanAudit', {
        cIndexUUID: this.idxReport.cIndexUUID,
        iIndexXz: 1,
        cOrgUUID: this.current_org.cOrgUUID,
      })
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.isReport = true;
          const t = res.data;
          this.depPlanData = res.data;
          if(this.current_org.cOrgName === t.buMen[0].cOrgName && t.buMen[0].iStite === 6) {
            this.hasBeenAudit = true 
          }

          if(this.depPlanData.buMen[0].iStite === 7) {
            this.rJ = true;
            this.rJText = this.depPlanData.buMen[0].cDescribe
         }else {
           this.rJ = false;
           this.rJText = null;
         }
          this.leader.cPersonName = t.buMen[0].cPersionFName;
          this.charger.cPersonName = t.buMen[0].cPersionJName;
          t.putTong && t.putTong.length>0 ? this.getPlanRadio(t.putTong) : null;
          t.linShi && t.linShi.length>0 ? this.getPlanRadio(t.linShi) : null;
        } else {
          this.msg.warning(res.msg);
        }
      });
  }

  getPlanRadio(a:any) {
    if (a[0] && a[0].iType) {
      const arr =  this.planOrder(a);
       
      if (a[0].iType === 4) {
        // this.tabIndex = 1;
        this.tmpPlanList = this.genDatePlan(arr);
      }else if (a[0].iType === 3) {
        this.cRadio = '2';
        this.chooseRadio('2');
        arr.forEach(item => {
          this.planList.push({
            time: window.location.pathname === '/province-index/plan-upload'
                  ? [new Date(item.dBegin), new Date(item.dFinish)] 
                  : this.formatDate(new Date(item.dBegin)) + '~' + this.formatDate(new Date(item.dFinish)),
            plan: item.cPlanContent,
            flag: item.executeStatus,
          });
        });
        this.changeDelBtn();
        this.planList.length > 1 ? this.planList.splice(0,1) : null;
      } else {
        this.cRadio = a[0].iType - 1 + '';
        this.chooseRadio(a[0].iType - 1 + '');
        arr.forEach((item, index) => {
          this.planList[index].plan = item.cPlanContent;
          this.planList[index].flag = item.executeStatus;
        });
      }
    }
  }

  genDatePlan(e: any) {
    const t = [];
    if (e.length > 0) {
      e.forEach(item => {
        t.push({
          time: this.formatDate(new Date(item.dBegin)) + '~' + this.formatDate(new Date(item.dFinish)),
          plan: item.cPlanContent,
          // flag: item.executeStatus,
          fileList: this.genFileList(item.wenJian),
        });
      });
    }
    return t;
  }

  formatDate(d: any) {
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  planOrder(arr:any) {
    let tmp: any;
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[j].iOrder < arr[i].iOrder) {
          tmp = { ...arr[j] };
          arr[j] = { ...arr[i] };
          arr[i] = { ...tmp };
        }
      }
    }
    return arr;
  }

  public isReport = false;
  reportOk(num?: any) {
    if(this.hasBeenAudit) {
      this.msg.warning('已审核，无法更改！')
      return;
    }

    if (!this.current_org.cOrgUUID) {
      this.msg.warning('请选择右上角组织！');
      return;
    }

    this.planObj.cIndexUUID = this.idxReport.cIndexUUID;
    this.planObj.cOrgUUID = this.current_org.cOrgUUID;
    this.planObj.iStite = num;
    if (this.cRadio === '0') {
      this.planObj.iType = 1;
    }
    if (this.cRadio === '1') {
      this.planObj.iType = 2;
    }
    if (this.cRadio === '2') {
      this.planObj.iType = 3;
    }
    if (!!this.leader.cPersonName) {
      this.planObj.cPersionF = this.leader.cPersonUUID;
      this.planObj.cPersionFName = this.leader.cPersonName;
      this.planObj.cPersionFCode = this.leader.cPersonCode;
    }
    if (!!this.charger.cPersonName) {
      this.planObj.cPersionJ = this.charger.cPersonUUID;
      this.planObj.cPersionJName = this.charger.cPersonName;
      this.planObj.cPersionJCode = this.charger.cPersonCode;
    }

    if (this.selectTime) {
      this.planObj.IndexYue = [];
      this.planList.length > 0 ? this.planList.forEach(item => {
        this.planObj.IndexYue.push(item.plan);
      }) : null;
    } else {
      this.planObj.IndexPlan = [];
      this.planList.length > 0 ? this.planList.forEach(item => {
        if(!!item.time && !!item.plan ) {
        this.planObj.IndexPlan.push({
          dBegin: new Date(item.time[0]),
          dFinish: new Date(item.time[1]),
          cPlanContent: item.plan,
        });
      }
      }) : null;
    }
    this.http
      .post('/cnic-organizationdepartment/ProvincialAction/getPlanToReport', this.planObj)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.clickTreeTable();
          this.msg.success(res.msg);
          this.resetReport();
        } else {
          this.msg.warning(res.msg);
        }
      });
  }

  resetReport() {
    this.hasBeenAudit = false;
    this.rJ = false;
    this.rJText = null;
    this.isReport = false;
    this.planList = [];
    this.tmpPlanList = [];
    this.selectTime = true;
    this.cRadio = '0';
    this.leader = {};
    this.charger = {};
    this.mName = {};
    this.tabIndex = 0;
    this.resetObj();
  }
  reportCancel() {
    this.resetReport();
  }

  public maxLength = 30;
  public leader: any = {};
  public charger: any = {};
  public isModal = false;
  public title: any;
  // 是部门还是人员
  public isDep: any = null;
  public isMan: any = null;
  // 哪个模态框
  public flagMod = null;
  nameSearch(num) {
    this.flagMod = num;
    if (num === 0) {
      this.title = '分管领导';
      // this.mName = this.leader;
    } else {
      this.title = '具体负责人';
      // this.mName = this.charger;
    }
    if (this.isReport) {
      this.isModal = true;
    }
  }

  // 人员模态框
  zeroCancel() {
    this.resetZero();
  }
  zeroOk() {
    const tmp = {
      cPersonUUID: this.mName.cPersonUUID,
      cPersonName: this.mName.cPersonName,
      cPersonCode: this.mName.cPersonCode,
    };
    this.flagMod === 0 ? (this.leader = { ...tmp }) : (this.charger = { ...tmp });
    this.resetZero();
  }
  public depSearch: any = null;

  resetZero() {
    this.manList = [];
    this.isModal = false;
    this.depSearch = null;
    this.mName = {};
  }

  public mName: any = {};
  searchmName() {
    const obj = {
      bEncrypt: true,
      pageNumber:  1,
      pageSize: 30,
      pageLoadNumber: 3,
      cDispColumn: this.toolsService.encrypt("iOrgPersonID,cPersonCode,cPersonName,cDeptName,cSex,cEmployState,cPerType,dWorkDate,dLeaveDate,iOrgPersonAccountID,pubufts,dContractDate,cEducation,cPositionName,cPostName,cJobNumber,dBirthday"),
      cEntityName: this.toolsService.encrypt("V_OrgPerson"),
      cWhereStr: this.toolsService.encrypt(""),
      parameters: {},
      isPage: true,
      querySQL: this.toolsService.encrypt(
        `select * from V_OrgPerson where cOrgUUID = '${this.current_org.cOrgUUID}' and cPersonName like '%${this.mName.cPersonName}%'`
      ),
    };
    this.http.post('/CNIC_M/DataPageBar/getDataPageLoadList_V1',obj).subscribe((res:any) => {
      if (res.Result.iRsult === 1) {
        this.manList = res.dataPage.results;
    } else {
      this.msg.error(res.Result.cRsultInfo);
    }
    })
  }

  public cRadio: any = '0';
  public radioValue = { '0': '月计划', '1': '季度计划', '2': '自定义时间' };
  public planClass: any;
  chooseRadio(e: any) {
    this.month = [];
    this.tabIndex = 0;
    if (e === '0') {
      this.selectTime = true;
      this.genMonth();
    }
    if (e === '1') {
      this.selectTime = true;
      this.genSeason();
    }
    if (e === '2') {
      this.selectTime = false;
      this.genIndividual();
      this.changeDelBtn();
    }
  }

  public isLoading = false;
  public planList:any = [];
  public nzPageIndex1 = 1;
  public nzPageSize1 = 6;
  public nzPageIndex2 = 1;
  public nzPageSize2 = 6;
  public isLoading2 = false;
  public tmpPlanList:any = [];
  
  removePlan = (file: UploadFile) => false;

  public month = [];
  // 是否自定义时间
  public selectTime = true;
  // public listOfData = [];
  public planLength = 200;
  genMonth() {
    this.month = [];
    for (let i = 1; i <= 12; i++) {
      const str = { time: `${i}月份`, plan: null };
      this.month.push(str);
    }
    this.planList = [...this.month];
    this.planClass = '月计划';
  }
  genSeason() {
    this.month = [];
    for (let i = 1; i <= 4; i++) {
      const str = { time: `第${i}季度`, plan: null };
      this.month.push(str);
    }
    this.planList = this.month.filter(i => true);
    this.planClass = '季度计划';
  }
  genIndividual() {
    this.month = [{ time: null, plan: null }];
    this.planList = this.month.filter(i => true);
    this.planClass = '自定义';
  }

  // 自定义时间
  public dateRange: any;
  rangeChange(e: any) {
    // console.log(e);
  }

  // 动态添加表格
  addRow(i: any): void {
    // this.month[i] = [];
    // if (i === this.planList.length - 1) {
    this.planList = [
      ...this.planList,
      {
        time: null,
        plan: null,
      },
    ];
    this.changeDelBtn();
  }

  changeDelBtn() {
    if (this.planList.length > 1) {
      this.delBtn = true;
    } else {
      this.delBtn = false;
    }
  }

  // 表格操作-删除
  public delBtn = false;
  delRow(i: any) {
    if (this.planList.length > 1) {
      this.planList.splice(i, 1);
      this.planList = [...this.planList];
    }
    this.changeDelBtn();
  }
  // 退出pop删除提示
  cancel() {}

  // 查看模态框
  public isCheck = false;
  public inputDisable = true;
  public idxName: any = '指标查看';
  // public bool = { false: '否', true: '是' };
  public bool = { '0': '否', '1': '是' };
  public fileList = [];
  public upOkSaveFailed = [];
  public dep: any;

  // 获得编辑模态窗口内容
  getEditInfo(cIndexUUID: object) {
    this.resetObj();
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexBend', cIndexUUID).subscribe((res: any) => {
      if (res.code === 200) {
        // 备份文件列表，以备文件删除和增加
        this.fileListBK = [...res.data[0].wenJian];

        const tmp: any = [...res.data[0].wenJian];
        if (tmp && tmp.length > 0) {
          tmp.forEach(item => {
            this.fileList.push({
              name: item.cDocument,
              url: item.cAddress,
              uid: item.cFileCode,
            });
          });
          // 必须filter，否则不会刷新文件列表
          this.fileList = this.fileList.filter(i => true);
        }
        for (let obj in res.data[0]) {
          this.idxData[obj] = res.data[0][obj];
        }
        // this.idxData.dMkdir = new Date(res.data[0].dMkdir + '-01-01').getFullYear();
        [this.idxData.iIndexXz1, this.dep] = this.getTextAndArr(this.idxData.zeRen);
        this.idxData.cUpContent =  this.transRecord(this.idxData.jiLu).join('');
      } else {
        this.msg.warning(res.msg);
      }
    });
  }

  transRecord(arr:any) {
    const tmp = [];
    if(arr.length > 0) {
      arr.forEach(i => {
        tmp.push('【'+this.dateFormat("YYYY-mm-dd HH:MM", new Date(i.dPubufts))+'>'+i.cUpContent+'】;')
      })
      return tmp;
    } else {
      return [];
    }
  }

  dateFormat(fmt, date) {
    let ret:any;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

  getTextAndArr(arr:any) {
    const tmpZeRen = [];
    const tmp = [];
    if(arr.length > 0) {
    arr.forEach(item => {
      tmpZeRen.push(item.cOrgName);

      // 构造idxData结构，编辑窗口可能不勾选，而直接保存。
      tmp.push({
        cOrgUUID: item.cOrgUUID, //  "部门UUID(组织)",
        cOrgName: item.cOrgName, //  "部门名称(组织)",
        cOrgCode: item.cOrgCode, //  "部门编号(组织)"
      });
    });
    return [tmp, tmpZeRen.join(',')];
  }
  else {
    return [null, null]
  }
  }

  check(e: any) {
    this.resetObj();
    this.fileList = [];
    this.isCheck = true;
    this.getEditInfo({ cIndexUUID: e.cIndexUUID });
  }
  checkCancel() {
    this.isCheck = false;
  }
  checkOk() {
    this.isCheck = false;
  }

  // 是否末级指标
  public lastLevel = '1';
  // 选择末级标识
  chooseBool(e?:any) {
    this.lastLevel === '0' ? (this.idxData.bEnd = false) : (this.idxData.bEnd = true);
  }

  public itemPlanName:any = null;
  public itemPlanTime:any = null;
  public itemPlanFlag:any = null;
  public idxPlanList:any = [];
  // 禁用文件删除按钮
  remove = (file: UploadFile) => false;
  //文件变动监听
  beforeUpload = (file: UploadFile): boolean => {
    // this.fileList = this.fileList.concat({ name: file.name, uid: file.uid });
    this.fileList = this.fileList.concat(file);
    return false;
  };

  // 判断输入符合条件
  judgeText(str: any) {
    if (!!str && !!str.replace(/\s*/g, '')) {
      return true;
    }
    return false;
  }

  // 暂存文件列表
  public fileArr = [];
  // 备份接口传来的文件
  public fileListBK = [];
  // 文件删除列表
  public delFile = [];

  uploadFiles() {
    this.event ? (this.idxData.iLevel = this.event.node.level + 1) : null;
    !!this.idxData.dMkdir ? this.idxData.dMkdir = new Date(this.idxData.dMkdir).getFullYear() + '' : null;
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

    if (this.idxData.bEnd!==false && !this.idxData.bEnd) {
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
            }
          });
      }
    }
  }

  saveIdx() {}

  // 设定树高与表格同高
  public tableHeightFlag = true;
  public treeHeightFlag = true;
  setTreeHeight() {
    const tableHeight = this._elementRef.nativeElement.querySelector('#idxCardTable');
    const card = this._elementRef.nativeElement.querySelector('#idxCardTree');
    const tree0 = this._elementRef.nativeElement.querySelector('#idxTree');
    // console.log(tableHeight.scrollHeight,tableHeight.offsetHeight,card.offsetHeight)
    const h = 660;
    if (!this.tableHeightFlag) {
      this._render.removeStyle(tableHeight, 'height');
      this.tableHeightFlag = true;
    }
    if (!this.treeHeightFlag) {
      this._render.removeStyle(card, 'height');
      this.treeHeightFlag = true;
    }
    if (!!card) {
      if (tableHeight.offsetHeight <= h && card.offsetHeight <= h) {
        this._render.setStyle(tableHeight, 'height', h + 'px');
        this._render.setStyle(card, 'height', h + 'px');
        this.tableHeightFlag = false;
        this.treeHeightFlag = false;
      } else if (card.offsetHeight <= tableHeight.offsetHeight && h <= tableHeight.offsetHeight) {
        this._render.setStyle(card, 'height', tableHeight.offsetHeight + 'px');
        this.treeHeightFlag = false;
      } else if (tableHeight.offsetHeight <= card.offsetHeight && h <= card.offsetHeight) {
        this._render.setStyle(tableHeight, 'height', card.offsetHeight + 'px');
        this.tableHeightFlag = false;
      }
    } else if (tableHeight.offsetHeight < h) {
      this._render.setStyle(tableHeight, 'height', h + 'px');
      this.tableHeightFlag = false;
    }
    // this._render.setProperty(tree, 'style', 'height:' + tableHeight.offsetHeight + 'px');
  }

  ngOnInit() {
    this.orgServe.orgChooseEventer.subscribe((res: any) => {
      if (res.cOrgUUID ) {
  this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));

        // this.current_org = this.orgServe.getCurrentOrg();
        // this.current_org.cOrgUUID = res.cOrgUUID;
        // this.current_org.cOrgName = res.cOrgName;
      }
    });
    // this.getIndex();
    this.clickTreeTable();
    this.getDep();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTreeHeight();
    }, 500);
  }
  // 指标表格数据
  genTableData() {
    const tmp: any = [];
    const tmpDep = ['市财政局', '市发改委', '市工信局', '市科技局', '市人社局'];
    for (let i = 1; i < 20; i++) {
      tmp.push({
        id: 30 + i,
        name: `评分标准 ${i}评分标准 ${i}评分标准 ${i}评分标准 ${i}评分标准 ${i}评分标准 ${i}`,
        // age: `${tmpDep[i % 5]}`,
        age: `${tmpDep[i % 5]}<br />${tmpDep[i % 4]}`,
        address: `<div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">市财政局精密计算设计科 ${i}</div>;;;;
        <div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">市发改委 ${i}</div>;;;;
        <div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">市工信局 ${i}</div>;;;;
        <div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">市科技局 ${i}</div>`,
        disabled: 1 / (i % 4),
        year: new Date().getFullYear() + '年',
        flag: this.mark[i % 4],
      });
    }
    return tmp;
  }

  // 四种指示灯
  public already = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#96c1ff;text-align: center;background:#edf4ff;border: 0.3px solid #96c1ff;border-radius: 8px;">审核通过</div>`;
  public notAudit = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#fdc15e;text-align: center;background:#fff7ea;border: 0.3px solid #fdc15e;border-radius: 8px;">未审核</div>`;
  public reject = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">驳回</div>`;
  public notUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#c0c0c0;text-align: center;background:#f8f8f8;border: 0.3px solid #c0c0c0;border-radius: 8px;">未上报</div>`;
    // 七种指示灯
    public timeoutNotUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时未上报</div>`;
    public timeoutUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时上报</div>`;
    public up = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">即将超时</div>`;
    // public up = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:green;text-align: center;background:#94d4cf;border: 0.3px solid #7b8d8c;border-radius: 8px;"></div>`;
    public mark = [this.already, this.notAudit, this.reject, this.notUp, this.timeoutNotUp, this.timeoutUp, this.up];
  
  // public mark = [this.already, this.notAudit, this.reject, this.notUp];

  // 修改考核对象样式
  getTableExam() {
    let pageLeft: any = this.nzPageSize0;
    this.nzPageIndex0 * this.nzPageSize0 <= this.idxList.length
      ? (pageLeft = this.nzPageSize0)
      : (pageLeft = this.idxList.length % this.nzPageSize0);
    for (let i = 0; i < pageLeft; i++) {

      let dutyDep: any = document.querySelector(`#dutyDep${i}`) as HTMLElement;
      if (dutyDep) {
        let str: any = this.idxList[(this.nzPageIndex0 - 1) * this.nzPageSize0 + i].age;
        document.querySelector(`#dutyDep${i}`).innerHTML = str;
      }

      let flag: any = document.querySelector(`#flag${i}`) as HTMLElement;
      if (flag) {
        let str: any = this.idxList[(this.nzPageIndex0 - 1) * this.nzPageSize0 + i].zeRen;
        document.querySelector(`#flag${i}`).innerHTML = this.depAndStyle(str);
      }


      let depTable: any = document.querySelector(`#dep${i}`) as HTMLElement;
      if (depTable) {
        let depArr: any = this.idxList[(this.nzPageIndex0 - 1) * this.nzPageSize0 + i].zeRen;
        let str: any = '';
        if (depArr && depArr.length > 0) {
          for (let i = 0, len = depArr.length; i < len - 1; i++) {
            str = str + depArr[i].cOrgName + '<br />';
          }
          str = str + depArr[depArr.length - 1].cOrgName;
          document.querySelector(`#dep${i}`).innerHTML = str;
        }
      }
    }
  }

  public depWrap =
    '<div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">';

  // 部门和红绿灯一起显示
  depAndStyle(str: any) {
    let tmp: any = '';
    if (str && str.length > 0) {
      for (let i = 0, len = str.length; i < len - 1; i++) {
        // tmp = tmp + this.depWrap + str[i].cOrgName + '</div>' + this.chooseLight(1) + '<br />';
        tmp = tmp + this.depWrap + str[i].cOrgName + '</div>' + this.chooseLight(str[i].iStite) + '<br />';
      }
      tmp = tmp + this.depWrap + str[str.length - 1].cOrgName + '</div>' + this.chooseLight(str[str.length - 1].iStite);
    }
    return tmp;
  }

  // 选择某种灯
  chooseLight(num: any) {
    let str = '';
    switch (num) {
      case 1:
        str = this.notUp;
        break;
        case 2:
        str = this.timeoutNotUp;
        break;
        case 4:
        str = this.timeoutUp;
        break;
      case 5:
        str = this.notAudit;
        break;
      case 6:
        str = this.already;
        break;
      case 7:
        str = this.reject;
        break;
        case 9:
        str = this.up;
        break;
      default:
        str = '无状态';
        break;
    }
    return str;
  }

  // 填充红绿灯。树表同高
  tableChange() {
    setTimeout(() => {
      this.getTableExam();
    }, 20);
    setTimeout(() => {
      this.setTreeHeight();
    }, 100);
  }

  public tabIndex: any = 0;
  public nodes1: any = [];

  // 表格展示部门和人员列表
  public manList: any = [];
  clickDep(e: any) {
    this.manList = [];
    const map = {
      pageNumber: 1,
      pageSize: 30,
      pageLoadNumber: 3,
      cDispColumn: this.toolsService.encrypt(
        'iOrgPersonID,cPersonCode,cPersonName,cDeptName,cSex,cEmployState,cPerType,dWorkDate,dLeaveDate,iOrgPersonAccountID,pubufts,dContractDate,cEducation,cPositionName,cPostName,cJobNumber,dBirthday',
      ),
      cEntityName: this.toolsService.encrypt('V_OrgPerson'),
      cWhereStr: this.toolsService.encrypt(''),
      cWhereStrSqlObject: {
        whereUnitList: [],
        groupUnitList: [],
        orderUnitList: [],
      },
      parameters: {},
      querySQL: this.toolsService.encrypt(
        "select * from V_OrgPerson where cDeptCode like '" +
          e.cTreeCode +
          "%' and cOrgUUID = '" +
          this.current_org.cOrgUUID +
          "'",
      ),
      isPage: true,
      bEncrypt: true,
    };
    this.http.post('/CNIC_M/DataPageBar/getDataPageLoadList_V1', map).subscribe(
      (res: any) => {
        if (res.Result.iRsult == 1) {
          this.manList = res.dataPage.results;
        } else {
          this.msg.warning(res.Result.cRsultInfo);
        }
      },
      () => {
        this.msg.error('请检查网络连接');
      },
    );
  }

  pickName(item: any) {
    this.mName = { ...item };
  }

  getDep(cOrgName?: any) {
    const tail: any = !!cOrgName ? cOrgName : null;
    this.http
      .get(
        `/cnic-organizationdepartment/DeptManageAction/getAllDepts/${this.account.iSysID}/${tail}`,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.depList = [...res.data];
          this.depList.forEach((item, index) => {
            item.id = index;
          });
        } else {
          this.msg.warning(res.msg);
        }
      });
  }

  public depList: any = [];
  public nodes2: any = [];
    // 将服务器上已存在的文件删除
    deleteFile(arr:any) {
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
}
