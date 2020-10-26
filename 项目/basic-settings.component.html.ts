import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { OrgChooseService } from '../../../services/orgchoose.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-eco-analysis-basic-settings',
  templateUrl: './basic-settings.component.html',
})
export class EcoAnalysisBasicSettingsComponent implements OnInit {
  tabIndex = 0;
  nzPageIndex0 = 1;
  nzPageSize0 = 10;
  nzPageIndex1 = 1;
  nzPageSize1 = 10;
  nzPageIndex2 = 1;
  nzPageSize2 = 10;
  nzPageIndex3 = 1;
  nzPageSize3 = 10;
  nzPageIndex4 = 1;
  nzPageSize4 = 10;

  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));
  org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  constructor(
    private modalService: NzModalService,
    private http: _HttpClient,
    private message: NzMessageService,
    private orgServe: OrgChooseService,
  ) {}
  // @ViewChild('nzTree0', { static: false }) nzTree0: NzTreeComponent;

  ngOnInit() {
    // this.getOrgList();
    setTimeout(() => {
      this.getData0();
      this.getData1();
      this.getData2();
      // this.getData3();
      this.getIndustryComm();
    }, 500);
    // console.log("session:",this.account,this.login,this.objNewCom,this.org);
    // setTimeout(() => {
    //   this.getChData();
    // }, 2000);
    // this.newGetData2();
    this.newGetData1();
    this.getAllClass();
    this.getAllHangye();
  }

  // getOrgList() {
  //   // 获取组织信息ID
  //   this.orgServe.getOrgListInfo(
  //     '023101',
  //     5090,
  //     (res: any) => {
  //       // this.IDlist = res.data.map((item: any) => {
  //       //   return item.cOrgUUID;
  //       // });
  //       // 查询初始项目统计表
  //       // this.initprojectData();
  //       // console.log(res);
  //       this.IDlist = res.data;
  //       this.cOrgUUIDList = res.data;
  //       // console.log("IDlist:", this.IDlist);
  //     },
  //     () => {},
  //   );
  // }
  /** 所属组织UUID集合 */
  // cOrgUUIDList: null; //必传
  // IDlist = [];

  // 判断输入符合条件
  judgeText(str: any) {
    if (!!str && !!str.replace(/\s*/g, '')) {
      // str = str.replace(/\\/g, '');
      return true;
    }
  }
  // 判断不输入符合条件
  judgeT(str: any) {
    if (!str || !str.replace(/\s*/g, '')) {
      return true;
    }
  }

  /**
   * tab0 新建企业分类*******************************************************************************
   */
  // tslint:disable-next-line: member-ordering
  isVisible0 = false;
  // tslint:disable-next-line: member-ordering
  ieVisible0 = false;
  iaVisible0 = false;
  isSpinning0 = false;
  isLoading0 = true;

  // tslint:disable-next-line: member-ordering
  objBase = {
    /** 所属帐套UUID */
    cAccUniqueID: this.account.cAccUniqueID, // 必传
    /** 所属组织UUID */
    // cOrgUUID: this.org.cOrgUUID,
    cOrgUUID: this.login.cOrgUUID,
    /** 所属部门UUID */
    cOrgDepUUID: this.login.cOrgDepUUID, // 必传
    /**
     * 规则类型
     * 1企业分类
     * 2数据池处理地
     * 3规则设置功能
     * 4各行业显示字段
     */
    ruleType: null,
    enterpriseClassificationTableID: null,
    enterpriseClassificationTableUUID: null,
  };

  // tslint:disable-next-line: member-ordering
  objNewCom = {
    // 社会信用代码
    cEnterprisecode: null,
    cEnterpriseNameClass: null,
    // 企业名称
    cEnterpriseName: null,
    ...this.objBase,
  };

  // sort and fill
  // checkShow(resData: any) {
  //   for (let item of resData) {
  //     item.createTime = new Date(item.createTime);
  //     for (let key of Object.keys(item)) {
  //       if (item[key] === null) {
  //         item[key] = '无资料';
  //       }
  //     }
  //     // console.table(item)
  //   }
  //   resData.sort((x, y) => {
  //     return y.createTime.getTime() - x.createTime.getTime();
  //   });
  // }

  // 包括自定义企业名称及其下级，最多3级
  public expandKeys0: any = ['100', '1001'];
  public nodes0 = [
    // {
    //   title: 'parent 1',
    //   key: '100',
    //   children: [
    //     {
    //       title: 'parent 1-0',
    //       key: '1001',
    //       children: [
    //         { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
    //         { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
    //       ],
    //     },
    //     {
    //       title: 'parent 1-1',
    //       key: '1002',
    //       children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }],
    //     },
    //   ],
    // },
  ];

  // key-显示的节点
  public valueKey0: string[] = [];
  // key-选择的节点
  public selectedKey: string[] = [];
  // 对象-选择的节点
  public selected: any[] = [];
  // 最高级别
  private LEVEL: number = 3;
  onChange0($event: string, index): void {
    this.isThirdLevel[index] = false;
    if ($event === null) {
      this.selected[index] = index.toString();
    } else {
      this.selectedKey[index] = $event;
    }
    const arrNum: any = this.selectedKey[index].split('-');
    let tmp = this.disData0[parseInt(arrNum[0])];
    for (let i = 1; i < arrNum.length; i++) {
      tmp = tmp.list[parseInt(arrNum[i])];
    }
    this.selected[index] = {
      name: tmp.name,
      UUID: tmp.UUID,
      level: arrNum.length,
      id: tmp.EnterpriseClassificationTableID,
    };
    if (arrNum.length === this.LEVEL) {
      this.isThirdLevel[index] = true;
    }
    console.log($event, this.selectedKey, this.nzTreeComponent0, arrNum, this.selected, index);
  }

  genNodes0() {
    this.valueKey0 = [];
    this.selectedKey = [];
    this.nodes0 = [];
    this.selected = [];
    this.isThirdLevel = [];
    for (let i = 0; i < this.disData0.length; i++) {
      let obj: any = {};
      obj.title = this.disData0[i].name;
      obj.key = i.toString();
      obj.children = [];
      this.getList(this.disData0[i].list, obj);
      this.valueKey0.push(obj.key);
      this.selectedKey.push(obj.key);
      this.selected.push({
        name: this.disData0[i].name,
        UUID: this.disData0[i].UUID,
        level: 1,
        id: this.disData0[i].EnterpriseClassificationTableID,
      });
      this.nodes0[i] = [...obj];
    }
    // console.log(this.valueKey0,this.selectedKey,this.nodes0,this.uniqName)
    // console.log(this.nzTreeComponent0)
  }

  getList(list: any, obj: any) {
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        let objtmp: any = {};
        objtmp.title = list[i].name;
        objtmp.key = obj.key + '-' + i;
        objtmp.children = [];
        if (list[i].list && list[i].list.length > 0) {
          objtmp.isLeaf = false;
          this.getList(list[i].list, objtmp);
        } else {
          objtmp.isLeaf = true;
        }
        obj.children.push(objtmp);
      }
    }
  }

  private uniqName: any = [];
  getUniqName() {
    this.uniqName = [];
    for (let i = 0; i < this.disData0.length; i++) {
      this.uniqName.push(this.disData0[i].name);
      if (this.disData0[i].list && this.disData0[i].list.length > 0) {
        this.getName(this.disData0[i].list);
      }
    }
    this.uniqName = this.uniqName.map(item => {
      return this.repSig(item);
    });
  }

  getName(list: any) {
    for (let i = 0; i < list.length; i++) {
      this.uniqName.push(list[i].name);
      // console.log(list)
      if (list[i].list && list[i].list.length > 0) {
        this.getName(list[i].list);
      }
    }
  }

  // 新增下级
  isSub = false;
  lowIndex = null;
  subName: string = null;
  isThirdLevel: boolean[] = [];
  subordinate(lowIndex: number): void {
    this.isSub = true;
    this.lowIndex = lowIndex;
    // this.treeNode = this.nzTreeComponent0.getTreeNodeByKey(this.selectedKey[this.lowIndex]);
  }
  subCancel() {
    this.isSub = false;
    this.subName = null;
    this.lowIndex = null;
  }
  subOk() {
    let tF = true;
    this.subName = this.repSig(this.subName);
    if (this.judgeText(this.subName)) {
      for (let i = 0; i < this.uniqName.length; i++) {
        if (this.subName === this.uniqName[i]) {
          tF = false;
          this.message.warning('分类名称重复，请重新命名！');
          // break;
        }
      }

      if (tF && this.selected[this.lowIndex].level < this.LEVEL) {
        // 为下级名称添加'-'
        for (let i = 1; i < this.LEVEL; i++) {
          if (this.selected[this.lowIndex].level === i) {
            let tmp = '';
            for (let j = 1; j <= i + 1; j++) {
              tmp += '-';
            }
            this.subName = tmp + this.subName;
          }
        }
        this.objNewCom.cEnterpriseNameClass = this.subName;
        this.objNewCom.ruleType = 1;
        // console.log('新增企业分类成功1：', this.objNewCom);
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objNewCom)
          .subscribe((res: any) => {
            if (res.code === 1) {
              const itsUUID = res.data.getAddBaseSettings[0].enterpriseClassificationTableUUID;
              this.postRelation(itsUUID);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入分类名称！');
    }
  }

  @ViewChild('nzTreeComponent0', { static: false }) nzTreeComponent0: NzTreeComponent;

  // 提交分类关系，配合提交分类名称的接口
  postRelation(UUIDD: string) {
    // console.log(this.selectedKey,tmpKey,this.nzTreeComponent0);
    let tmp: any = { ...this.objBase };
    tmp.cEnterpriseNameClass = UUIDD;
    tmp.ruleOfValue = null;
    tmp.ruleDescription = null;
    tmp.ruleType = 13;
    if (this.selected[this.lowIndex] && this.selected[this.lowIndex].level < this.LEVEL) {
      tmp.ruleDescription = this.selected[this.lowIndex].UUID;
    } else if (this.selected[this.lowIndex] && this.selected[this.lowIndex].level === this.LEVEL) {
      return;
    }
    this.http
      .post(
        // 'http://192.168.9.21:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
        tmp,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isSub = false;
          this.subName = null;
          this.lowIndex = null;
          this.getData0();
          this.message.success(res.msg);
        } else {
          this.message.warning(res.msg);
        }
      });
    setTimeout(() => {
      this.reset0();
    }, 500);
  }

  // 获取自定义企业树形关系
  disData0: any[] = [];
  getData0() {
    this.objNewCom.cEnterpriseNameClass = null;
    this.objNewCom.ruleType = null;
    this.objNewCom.enterpriseClassificationTableID = null;
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/selectClassFieldRelational',
        // 'http://192.168.9.21:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/selectClassFieldRelational',
        // '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getEnterprisesAreClassifiedAsAffiliatedEnterprisesCalss',
        this.objNewCom,
      )
      .subscribe((res: any) => {
        if (res.code === 200) {
          // this.checkShow(res.data);
          // this.disData0 = [...res.data.getEnterprisesAreClassifiedAsAffiliatedEnterprisesCalss];
          this.disData0 = [...res.data];
          this.getUniqName();
          this.genNodes0();
          this.isLoading0 = false;
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  reset0() {
    this.objNewCom = {
      // 社会信用代码
      cEnterprisecode: null,
      cEnterpriseNameClass: null,
      // 企业名称
      cEnterpriseName: null,
      ...this.objBase,
    };
  }

  // 新增企业分类
  newComName: string = null;
  newComClass() {
    this.isVisible0 = true;
  }
  newComCancel() {
    this.isVisible0 = false;
    this.newComName = null;
  }
  newComOk() {
    let tF = true;
    this.newComName = this.repSig(this.newComName);
    if (this.judgeText(this.newComName)) {
      for (let i = 0; i < this.uniqName.length; i++) {
        if (this.newComName === this.uniqName[i]) {
          tF = false;
          this.message.warning('分类名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objNewCom.cEnterpriseNameClass = this.newComName;
        this.objNewCom.ruleType = 1;
        // console.log('新增企业分类成功1：', this.objNewCom);
        this.http
          .post(
            '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
            // 'http://192.168.9.21:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
            this.objNewCom,
          )
          .subscribe((res: any) => {
            if (res.code === 1) {
              const itsUUID = res.data.getAddBaseSettings[0].enterpriseClassificationTableUUID;
              this.postRelation(itsUUID);
              // this.getData0();
              this.isVisible0 = false;
              this.newComName = null;
              // this.disData0 = this.disData0.filter(i => true);
              // this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入分类名称！');
    }
    setTimeout(() => {
      this.reset0();
    }, 500);
  }

  // 分配企业到分类
  aComIndex0: number = null;
  aComClass = null;
  assignCom(aComIndex0: number) {
    this.aComClass = this.selected[aComIndex0].name;
    this.iaVisible0 = true;
    this.isSpinning0 = true;
    this.aComIndex0 = aComIndex0;
    this.getNodes0();
  }

  searchF = false;
  searArr = [];
  allCheckedz = false;
  indeterminatez = true;
  searchValue0 = null;
  comSearch() {
    if (this.searchValue0.indexOf('\\') >= 0) {
      this.searchValue0 = this.searchValue0.replace(/\\/g, '');
      // this.searchValue3 = "";
    }
    this.isSpinning0 = true;
    this.searArr = [];
    this.searchF = true;
    this.allCheckedz = true;
    this.indeterminatez = false;
    for (let i = 0; i < this.checkOptionsOne0.length; i++) {
      if (this.checkOptionsOne0[i].label.search(this.searchValue0) !== -1) {
        let tmp = { ...this.checkOptionsOne0[i] };
        this.searArr.push(tmp);
        if (this.checkOptionsOne0[i].checked === false) {
          this.allCheckedz = false;
          this.indeterminatez = true;
        }
      }
    }
    this.isSpinning0 = false;
  }
  searchReset0() {
    this.allCheckedz = false;
    this.indeterminatez = true;
    this.searArr = [];
    this.searchF = false;
    this.searchValue0 = null;
  }

  updateAllCheckedz(): void {
    this.indeterminatez = false;
    if (this.allCheckedz) {
      this.searArr = this.searArr.map(item => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.searArr = this.searArr.map(item => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  updateSingleCheckedz(): void {
    if (this.searArr.every(item => !item.checked)) {
      this.allCheckedz = false; // the first must be no ,otherwise can't fit
      this.indeterminatez = false;
    } else if (this.searArr.every(item => item.checked)) {
      this.allCheckedz = true; // the first must be yes and assuming all are yes
      this.indeterminatez = false;
    } else {
      this.indeterminatez = true; // the first is no ,meanwhile some is yes
    }
    // console.log('allchecked:', this.allCheckedz, this.indeterminate3);
  }

  comCancel() {
    this.iaVisible0 = false;
    this.isSpinning0 = false;
    this.aComIndex0 = null;
    this.allCheckedz = false;
    this.indeterminatez = true;
    this.searArr = [];
    this.searchF = false;
    this.searchValue0 = null;
    this.cReset();
  }
  comOk() {
    this.postNodes0();
    this.iaVisible0 = false;
    this.isSpinning0 = false;
    this.aComIndex0 = null;
    this.allCheckedz = false;
    this.indeterminatez = true;
    this.searArr = [];
    this.searchF = false;
    this.searchValue0 = null;
    setTimeout(() => {
      this.reset0();
      this.cReset();
    }, 500);
  }
  cReset() {
    for (let i = 0; i < this.checkOptionsOne0.length; i++) {
      this.checkOptionsOne0[i].checked = false;
    }
  }

  // 获取所有企业
  industryComm: any[] = [];
  getIndustryComm() {
    this.http
      .post('/cnic-projectmanagement/enterpriseInformationImportAction/getBusinessInformation', {
        caccuniqueId: this.account.cAccUniqueID,
        nGoUUID: this.login.cOrgUUID,
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isSpinning0 = false;
          this.industryComm = res.data.getBusinessInformation;
          // console.log('获取工商信息：', this.industryComm, {
          //   caccuniqueId: this.account.cAccUniqueID,
          //   nGoUUID: this.login.cOrgUUID,
          // });
          setTimeout(() => {
            this.generateNode();
          }, 500);
          // console.log("nodessssss:",this.checkOptionsOne0)
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  generateNode() {
    this.checkOptionsOne0 = [];
    for (let i = 0; i < this.industryComm.length; i++) {
      this.checkOptionsOne0[i] = {};
      this.checkOptionsOne0[i].label = this.industryComm[i].companyName;
      this.checkOptionsOne0[i].checked = false;
      // this.checkOptionsOne0[i].checked = this.industryComm[i].companyId.toString();
      // this.nodes0[i].children = [];
    }
  }
  allChecked0 = false;
  indeterminate0 = true;
  checkOptionsOne0 = [
    // { label: 'Apple', value: 'Apple', checked: true },
    // { label: 'Pear', value: 'PearVal', checked: false },
    // { label: 'Orange', value: 'Orange', checked: false }
  ];

  postNode = [];
  gPostNode() {
    for (let j = 0; j < this.searArr.length; j++) {
      for (let i = 0; i < this.checkOptionsOne0.length; i++) {
        if (this.checkOptionsOne0[i].label === this.searArr[j].label) {
          this.checkOptionsOne0[i].checked = this.searArr[j].checked;
        }
      }
    }
    this.postNode = [];
    for (let i = 0; i < this.industryComm.length; i++) {
      if (this.checkOptionsOne0[i].checked === true) {
        let tObj = { ...this.objNewCom };
        tObj.cEnterpriseName = this.industryComm[i].companyName;
        tObj.cEnterprisecode = this.industryComm[i].companyCode;
        tObj.cEnterpriseNameClass = this.selected[this.aComIndex0].name;
        // tObj.cEnterpriseNameClass = this.disData0[this.aComIndex0].cEnterpriseNameClass;
        tObj.ruleType = 1;
        // console.log('pushwhat?', tObj);
        this.postNode.push(tObj);
        // console.log('postNode:', this.postNode);
      }
    }
    if (this.postNode.length === 0) {
      // console.log(this.industryComm);
      this.postFlag = true;
      let tObj = { ...this.objNewCom };
      // tObj.cEnterpriseName = this.industryComm[i].companyName;
      // tObj.cEnterprisecode = this.industryComm[i].companyCode;
      tObj.cEnterpriseNameClass = this.selected[this.aComIndex0].name;
      tObj.ruleType = 1;
      // console.log('pushwhat?', tObj);
      this.postNode.push(tObj);
      // console.log('postNode:', this.postNode);
    }
    this.searArr = [];
    this.reset0();
  }

  updateAllChecked0(): void {
    this.indeterminate0 = false;
    if (this.allChecked0) {
      this.checkOptionsOne0 = this.checkOptionsOne0.map(item => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.checkOptionsOne0 = this.checkOptionsOne0.map(item => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  updateSingleChecked0(cIndex): void {
    if (this.checkOptionsOne0.every(item => !item.checked)) {
      this.allChecked0 = false; // the first must be no ,otherwise can't fit
      this.indeterminate0 = false;
    } else if (this.checkOptionsOne0.every(item => item.checked)) {
      this.allChecked0 = true; // the first must be yes and assuming all are yes
      this.indeterminate0 = false;
    } else {
      this.indeterminate0 = true; // the first is no ,meanwhile some is yes
    }
    // console.log('allchecked:', this.allChecked0, this.indeterminate0, this.checkOptionsOne0[cIndex]);
  }

  // 获取所有选中的企业
  postFlag = false;
  getNodes0() {
    // let tmp = this.nzTreeComponent0.getCheckedNodeList();
    // getHalf's keys dominate defaultExpandedKeys
    // let t = this.nzTreeComponent0.getHalfCheckedNodeList();
    // console.log("treeComponent0:", tmp, t)
    let objTmp = this.selected[this.aComIndex0];
    this.objNewCom.cEnterpriseNameClass = objTmp.name;
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getEnterprisesAreClassifiedAsAffiliatedEnterprises',
        this.objNewCom,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isSpinning0 = false;
          let tmp = res.data.getEnterprisesAreClassifiedAsAffiliatedEnterprises;
          if (tmp.length === 0) {
            this.postFlag = false;
          } else if (tmp.length > 0) {
            this.postFlag = true;
            for (let i = 0; i < tmp.length; i++) {
              for (let j = 0; j < this.checkOptionsOne0.length; j++) {
                if (tmp[i].cEnterpriseName === this.checkOptionsOne0[j].label) {
                  this.checkOptionsOne0[j].checked = true;
                }
              }
            }
            if (tmp.length === this.checkOptionsOne0.length) {
              this.allChecked0 = true;
              this.indeterminate0 = false;
            } else {
              this.allChecked0 = false;
              this.indeterminate0 = true;
            }
          }
        } else {
          this.message.warning(res.msg);
        }
        setTimeout(() => {
          this.reset0();
        }, 500);
      });
  }

  postNodes0() {
    this.gPostNode();
    // let tmp = this.nzTreeComponent0.getCheckedNodeList();
    // getHalf's keys dominate defaultExpandedKeys
    // let t = this.nzTreeComponent0.getHalfCheckedNodeList();
    // console.log("nodes:", tmp, t)
    if (this.postFlag === true) {
      this.http
        .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdEnterpriseClassification', this.postNode)
        .subscribe((res: any) => {
          if (res.code === 1) {
            // console.log('修改的assign的企业：', this.postNode);
            // 通过tableID删掉复制的行业
            let tmp = res.data.getupdEnterpriseClassification;
            this.message.success(res.msg);

            if (tmp[0].cEnterpriseName === null) {
              this.http
                .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmp[0])
                .subscribe(() => {});
              this.getData0();
            }
          } else {
            this.message.warning(res.msg);
          }
        });
      this.postNode = [];
    } else if (this.postFlag === false) {
      this.http
        .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.postNode)
        .subscribe((res: any) => {
          if (res.code === 1) {
            this.message.success(res.msg);

            // console.log('添加的assign企业：', this.postNode);
          } else {
            this.message.warning(res.msg);
          }
        });
      this.postNode = [];
    }
  }

  // 修改企业类名
  eComIndex0: number = null;
  eComName: string = null;
  editCom(eComIndex0: number) {
    this.eComIndex0 = eComIndex0;
    this.eComName = this.selected[this.eComIndex0].name;
    this.ieVisible0 = true;
  }
  eComCancel() {
    this.ieVisible0 = false;
    this.eComName = null;
    this.eComIndex0 = null;
  }

  // 取掉下级名称前面的'-'和空格
  repSig(str) {
    // let sig = [',', '\\.', '\\\\', '/', '<', '>', ';', ':', '"', '{', '}', "'", '；', '。'];
    // for (let i = 0; i < sig.length; i++) {
    //   let p = new RegExp(sig[i], 'g');
    //   str = str.replace(p, '');
    //   // console.log("str:",str)
    // }
    let tmp = [];
    while (str.charAt(0) === '-' || str.charAt(0) === ' ') {
      tmp = str.split('');
      tmp.splice(0, 1);
      str = tmp.join('');
    }
    return str;
  }
  eComOk() {
    this.eComName = this.repSig(this.eComName);
    // console.log(this.eComName);
    if (this.judgeText(this.eComName)) {
      let tF = true;
      for (let i = 0; i < this.uniqName.length; i++) {
        if (this.eComName === this.uniqName[i]) {
          tF = false;
          this.message.warning('分类名称重复，请重新命名！');
          // break;
        }
      }

      if (tF) {
        // 为下级名称添加上'-'，一级名称不添加
        for (let i = 2; i <= this.LEVEL; i++) {
          if (this.selected[this.eComIndex0].level === i) {
            let tmp = '';
            for (let j = 1; j <= i; j++) {
              tmp += '-';
            }
            this.eComName = tmp + this.eComName;
          }
        }

        this.objNewCom.cEnterpriseNameClass = this.eComName;
        this.objNewCom.ruleType = 1;
        this.objNewCom.enterpriseClassificationTableID = this.selected[this.eComIndex0].id;
        this.objNewCom.enterpriseClassificationTableUUID = this.selected[this.eComIndex0].UUID;
        this.http
          // .post('http://192.168.9.21:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objNewCom)
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objNewCom)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('修改企业分类成功：', this.objNewCom);
              this.getData0();
              this.ieVisible0 = false;
              this.eComName = null;
              this.eComIndex0 = null;
              this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入分类名称！');
    }
    setTimeout(() => {
      this.reset0();
    }, 500);
  }

  // deleting enterprise classification
  delCom(indexDel: number) {
    let tmpObj: any = { ...this.objBase };
    tmpObj.cEnterpriseNameClass = this.selected[indexDel].UUID;
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/deleteClassFieldRelational',
        // 'http://192.168.9.21:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/deleteClassFieldRelational',
        // '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelEnterpriseClassification',
        tmpObj,
      )
      .subscribe((res: any) => {
        if (res.code === 200) {
          // console.log('删除企业分类成功：', tmpObj);
          this.getData0();
          this.message.success(res.msg);
        } else {
          this.message.warning(res.msg);
        }
      });
    // this.disData0 = this.disData0.filter(i => true);
  }
  dCancel() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
  }

  /**
   * tab1 预警规则设置*******************************************************************************
   */
  isVisible1 = false;
  ieVisible1 = false;
  isLoading1 = true;
  threshold: number = null;
  newAlertName: string = null;
  disData1 = [];
  objAlert = {
    ruleDescription: null,
    ruleOfValue: null,
    ...this.objBase,
  };

  // New rules
  newAlertRule() {
    this.isVisible1 = true;
  }
  newAlertCancel() {
    this.isVisible1 = false;
    this.newAlertName = null;
    this.threshold = null;
  }

  // 处理数据，特别是小数
  float2Str(num: number) {
    let n = num.toString().indexOf('.');
    if (n === -1) {
      return num;
    } else {
      // return parseFloat(num.toString().slice(0,n+4));
      return parseFloat(num.toFixed(3));
    }
  }

  // 阈值绝对值最大设为10000
  private thresholdMax: number = 10000;
  // 提交新规则
  newAlertOk() {
    let tF = true;
    if (
      this.judgeText(this.newAlertName) &&
      this.threshold !== null &&
      typeof this.threshold === 'number' &&
      this.threshold <= this.thresholdMax &&
      this.threshold >= -this.thresholdMax
    ) {
      for (let i = 0; i < this.disData1.length; i++) {
        if (this.newAlertName === this.disData1[i].ruleDescription) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.threshold = this.float2Str(this.threshold);
        this.objAlert.ruleDescription = this.newAlertName;
        this.objAlert.ruleOfValue = this.threshold.toString();
        this.objAlert.ruleType = 3;
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objAlert)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('newAlertname:', this.objAlert);
              this.getData1();
              this.isVisible1 = false;
              this.newAlertName = null;
              this.threshold = null;
              // if (this.disData1.length === 0) {
              //   this.disData1[0] = this.objAlert;
              // } else {
              //   this.disData1.splice(0, 0, this.objAlert);
              // }
              // this.disData1 = this.disData1.filter(i => true);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else if (this.judgeT(this.newAlertName)) {
      this.message.warning('请输入规则名称！');
    } else if (this.threshold === null || typeof this.threshold !== 'number') {
      this.message.warning('请输入阈值！');
    } else if (this.threshold > this.thresholdMax || this.threshold < -this.thresholdMax) {
      this.message.warning('阈值绝对值超过10000！');
    }
    setTimeout(() => {
      this.reset1();
    }, 500);
  }

  getData1() {
    this.objAlert.ruleDescription = null;
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdTheRulesSet', this.objAlert)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // this.checkShow(res.data);
          this.isLoading1 = false;
          this.disData1 = [...res.data.getupdTheRulesSet];
          // console.log('disData1:', this.disData1);
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  reset1() {
    this.objAlert = {
      ruleDescription: null,
      ruleOfValue: null,
      ...this.objBase,
    };
  }

  // editing rules
  eAlertIndex: number = null;
  eAlertName: string = null;
  eThreshold: number = null;
  editAlert(eAI: number) {
    this.ieVisible1 = true;
    this.eAlertIndex = eAI;
    this.eAlertName = this.disData1[eAI].ruleDescription;
    this.eThreshold = parseFloat(this.disData1[eAI].ruleOfValue);
  }
  eAlertCancel() {
    this.ieVisible1 = false;
    this.eAlertName = null;
    this.eThreshold = null;
    this.eAlertIndex = null;
  }
  eAlertOk() {
    let tF = true;
    if (
      this.judgeText(this.eAlertName) &&
      this.eThreshold !== null &&
      typeof this.eThreshold === 'number' &&
      this.eThreshold <= this.thresholdMax &&
      this.eThreshold >= -this.thresholdMax
    ) {
      // for (let i = 0; i < this.disData1.length; i++) {
      //   if (this.eAlertName === this.disData1[i].ruleDescription && i !== this.eAlertIndex) {
      //     tF = false;
      //     this.message.warning('名称重复，请重新命名！');
      //     break;
      //   }
      // }
      if (tF) {
        this.eThreshold = this.float2Str(this.eThreshold);
        this.objAlert.ruleDescription = this.eAlertName;
        this.objAlert.ruleOfValue = this.eThreshold.toString();
        this.objAlert.ruleType = 3;
        this.objAlert.enterpriseClassificationTableID = this.disData1[this.eAlertIndex].enterpriseClassificationTableID;
        this.disData1[this.eAlertIndex].ruleDescription = this.eAlertName;
        this.disData1[this.eAlertIndex].ruleOfValue = this.eThreshold;
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objAlert)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('eAlertname:', this.objAlert);
              // this.disData1.splice(0, 0, this.objAlert)
              this.disData1 = this.disData1.filter(i => true);
              this.ieVisible1 = false;
              this.eAlertName = null;
              this.eThreshold = null;
              this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else if (this.judgeT(this.eAlertName)) {
      this.message.warning('请输入规则名称！');
    } else if (this.eThreshold === null || typeof this.eThreshold !== 'number') {
      this.message.warning('请输入阈值!');
    } else if (this.eThreshold > this.thresholdMax || this.eThreshold < -this.thresholdMax) {
      this.message.warning('阈值绝对值超过10000！');
    }
    setTimeout(() => {
      this.reset1();
    }, 500);
  }

  // deleting rules
  delAlert(delIndex: number) {
    let tmpObj = this.disData1[delIndex];
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          console.log('删除规则成功：', delIndex, tmpObj);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.disData1 = this.disData1.filter(i => i.ruleDescription !== tmpObj.ruleDescription);
  }

  /**
   * tab2 处理地设置*******************************************************************************
   */
  isVisible2 = false;
  ieVisible2 = false;
  isLoading2 = true;
  areaCode: number = null;
  newAreaName: string = null;
  objArea = {
    // 数据处理地code
    dataProcessing: null,
    // 数据处理地
    dataProcessingCode: null,
    ...this.objBase,
  };
  disData2 = [];

  getData2() {
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getTheDataIsProcessedAccordingly', this.objArea)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isLoading2 = false;
          this.disData2 = res.data.getTheDataIsProcessedAccordingly;
          // console.log('disData2:', this.disData2);
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  reset2() {
    this.objArea = {
      // 数据处理地code
      dataProcessing: null,
      // 数据处理地
      dataProcessingCode: null,
      ...this.objBase,
    };
  }
  // new areacode
  newAreaCode() {
    this.isVisible2 = true;
  }
  newAreaCancel() {
    this.isVisible2 = false;
    this.areaCode = null;
    this.newAreaName = null;
  }
  // regInt = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
  regNum = /^(0|[1-9][0-9]*)$/;
  newAreaOk() {
    let tF = true;
    if (
      this.judgeText(this.newAreaName) &&
      !!this.areaCode &&
      this.regNum.test(this.areaCode.toString()) &&
      typeof this.areaCode === 'number'
    ) {
      for (let i = 0; i < this.disData2.length; i++) {
        if (this.newAreaName === this.disData2[i].dataProcessing) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
        if (this.areaCode.toString() === this.disData2[i].dataProcessingCode) {
          tF = false;
          this.message.warning('地点代码重复，请重新输入！');
          // break;
        }
      }
      if (tF) {
        this.objArea.ruleType = 2;
        this.objArea.dataProcessing = this.newAreaName;
        this.objArea.dataProcessingCode = this.areaCode.toString();
        // console.log('Area:', this.objArea);
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objArea)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.isVisible2 = false;
              this.areaCode = null;
              this.newAreaName = null;
              // console.log('Area:', this.objArea);
              this.getData2();
              this.message.success(res.msg);

              // if (this.disData2.length === 0) {
              //   this.disData2[0] = this.objArea;
              // } else {
              //   this.disData2.splice(0, 0, this.objArea);
              // }
              // this.disData2 = this.disData2.filter(i => true);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else if (this.judgeT(this.newAreaName)) {
      this.message.warning('请输入地区名称!');
    } else if (!this.areaCode || !this.regNum.test(this.areaCode.toString()) || typeof this.areaCode !== 'number') {
      this.message.warning('请输入地区代码!');
    }
    setTimeout(() => {
      this.reset2();
    }, 500);
  }

  // editing areacode
  eAreaIndex = null;
  eAreaName = null;
  eCode = null;
  editArea(eAreaIndex: number) {
    this.eAreaIndex = eAreaIndex;
    this.eCode = parseInt(this.disData2[this.eAreaIndex].dataProcessingCode);
    this.eAreaName = this.disData2[this.eAreaIndex].dataProcessing;
    this.ieVisible2 = true;
  }
  eAreaCancel() {
    this.ieVisible2 = false;
    this.eAreaIndex = null;
    this.eCode = null;
    this.eAreaName = null;
  }
  eAreaOk() {
    let tF = true;
    if (
      this.judgeText(this.eAreaName) &&
      !!this.eCode &&
      this.regNum.test(this.eCode.toString()) &&
      typeof this.eCode === 'number'
    ) {
      for (let i = 0; i < this.disData2.length; i++) {
        if (this.eAreaName === this.disData2[i].dataProcessing && i !== this.eAreaIndex) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
        if (this.eCode.toString() === this.disData2[i].dataProcessingCode && i !== this.eAreaIndex) {
          tF = false;
          this.message.warning('地点代码重复，请重新输入！');
          // break;
        }
      }
      if (tF) {
        this.objArea.dataProcessing = this.eAreaName;
        this.objArea.dataProcessingCode = this.eCode.toString();
        this.objArea.ruleType = 2;
        this.objArea.enterpriseClassificationTableID = this.disData2[this.eAreaIndex].enterpriseClassificationTableID;
        this.disData2[this.eAreaIndex].dataProcessing = this.eAreaName;
        this.disData2[this.eAreaIndex].dataProcessingCode = this.eCode.toString();
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objArea)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.ieVisible2 = false;
              this.eAreaIndex = null;
              this.eCode = null;
              this.eAreaName = null;
              this.disData2 = this.disData2.filter(i => true);
              this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else if (this.judgeT(this.eAreaName)) {
      this.message.warning('请输入地区名称！');
    } else if (!this.eCode || !this.regNum.test(this.eCode.toString()) || typeof this.eCode !== 'number') {
      this.message.warning('请输入地区代码！');
    }
    setTimeout(() => {
      this.reset2();
    }, 500);
  }

  // deleting areacode
  delArea(dAreaIndex: number) {
    let tmpObj = this.disData2[dAreaIndex];
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('del areacode:', tmpObj);
          this.message.success(res.msg);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.disData2 = this.disData2.filter(i => i.dataProcessing !== tmpObj.dataProcessing);
  }

  /**
   * tab3 行业字段设置*******************************************************************************
   */
  isVisible3 = false;
  iaVisible3 = false;
  ieVisible3 = false;
  isLoading3 = true;
  isSpinning3 = false;
  newIFName: string = null;
  disData3 = [];
  objIndustry = {
    // 行业名称
    nameOfTheIndustry: null,
    // 字段名称
    fieldNames: null,
    // 字段是否显示 1显示 0不显示
    whetherTheFieldIsDisplayed: null,
    expand: false,
    ...this.objBase,
  };

  // new industry
  newIndustryField() {
    this.isVisible3 = true;
  }
  newIFCancel() {
    this.isVisible3 = false;
    this.newIFName = null;
  }
  newIFOk() {
    let tF = true;
    if (this.judgeText(this.newIFName)) {
      for (let i = 0; i < this.disData3.length; i++) {
        if (this.newIFName === this.disData3[i].nameOfTheIndustry) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.ruleType = 4;
        this.objIndustry.nameOfTheIndustry = this.newIFName;
        // this.http.post('192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',this.objIndustry,)
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.getData3();
              this.isVisible3 = false;
              this.newIFName = null;
              this.disData3 = this.disData3.filter(i => true);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入行业名称！');
    }
    setTimeout(() => {
      this.getChData();
    }, 1500);
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  getData3() {
    this.objIndustry.nameOfTheIndustry = null;
    this.objIndustry.ruleType = null;
    this.objIndustry.enterpriseClassificationTableID = null;
    // this.http.post('http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustryCalss',this.objIndustry,)
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllFieldAndFixedFieldSettingsInTheIndustryCalss',
        this.objIndustry,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          // this.checkShow(res.data);
          this.disData3 = res.data.getAllFieldAndFixedFieldSettingsInTheIndustryCalss;
          // console.log('disData3:', this.disData3);
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  reset3() {
    this.objIndustry = {
      // 行业名称
      nameOfTheIndustry: null,
      // 字段名称
      fieldNames: null,
      // 字段是否显示 1显示 0不显示
      whetherTheFieldIsDisplayed: null,
      expand: false,
      ...this.objBase,
    };
  }

  // assigning industry field
  searchValue3: string = null;
  aIF: number = null;
  idField = null;
  assignIF(aIF: number) {
    this.isSpinning3 = true;
    this.iaVisible3 = true;
    this.idField = this.disDataIF[aIF].nameOfTheIndustry;
    this.aIF = aIF;
    setTimeout(() => {
      this.newGetData2();
    }, 500);
    // setTimeout(() => {
    //   this.getIndustryR();
    // }, 500);
    // setTimeout(() => {
    //   this.getGroup();
    // }, 2000);
  }

  search3F = false;
  searArr3 = [];
  allChecked3 = false;
  indeterminate3 = true;
  aSearch() {
    if (this.searchValue3.indexOf('\\') >= 0) {
      this.searchValue3 = this.searchValue3.replace(/\\/g, '');
      // this.searchValue3 = "";
    }
    this.isSpinning3 = true;
    this.searArr3 = [];
    this.search3F = true;
    this.allChecked3 = true;
    this.indeterminate3 = false;
    for (let i = 0; i < this.checkOptionsOne.length; i++) {
      if (this.checkOptionsOne[i].label.search(this.searchValue3) !== -1) {
        let tmp = { ...this.checkOptionsOne[i] };
        this.searArr3.push(tmp);
        if (this.checkOptionsOne[i].checked === false) {
          this.allChecked3 = false;
          this.indeterminate3 = true;
        }
      }
    }
    this.isSpinning3 = false;
  }
  searchReset() {
    this.allChecked3 = false;
    this.indeterminate3 = true;
    this.searArr3 = [];
    this.search3F = false;
    this.searchValue3 = null;
  }

  updateAllChecked3(): void {
    this.indeterminate3 = false;
    if (this.allChecked3) {
      this.searArr3 = this.searArr3.map(item => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.searArr3 = this.searArr3.map(item => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  updateSingleChecked3(): void {
    if (this.searArr3.every(item => !item.checked)) {
      this.allChecked3 = false; // the first must be no ,otherwise can't fit
      this.indeterminate3 = false;
    } else if (this.searArr3.every(item => item.checked)) {
      this.allChecked3 = true; // the first must be yes and assuming all are yes
      this.indeterminate3 = false;
    } else {
      this.indeterminate3 = true; // the first is no ,meanwhile some is yes
    }
    // console.log('allchecked:', this.allChecked3, this.indeterminate3);
  }

  aCancel() {
    this.iaVisible3 = false;
    this.isSpinning3 = false;
    this.aIF = null;
    this.searchValue3 = null;
    this.search3F = false;
    this.allChecked3 = false;
    this.indeterminate3 = true;
    this.searArr3 = [];
    this.reset3();
    this.reset4();
  }

  aOk() {
    this.getLocalChecked();
    this.postFirst();
    this.postChecked();
    // this.postGroup();
    // this.getChData();
    // this.iaVisible3 = false;
    // this.isSpinning3 = false;
    // this.aIF = null;
    this.searchValue3 = null;
    this.search3F = false;
    setTimeout(() => {
      this.reset3();
      // this.reset4();
    }, 500);
  }
  reset4() {
    for (let i = 0; i < this.checkOptionsOne.length; i++) {
      this.checkOptionsOne[i].checked = false;
    }
  }

  // exhibiting in checkbox group
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    // { label: 'Apple', value: 'Apple', checked: true },
    // { label: 'Pear', value: 'PearVal', checked: false },
    // { label: 'Orange', value: 'Orange', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false; // the first must be no ,otherwise can't fit
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true; // the first must be yes and assuming all are yes
      this.indeterminate = false;
    } else {
      this.indeterminate = true; // the first is no ,meanwhile some is yes
    }
    // console.log('allchecked:', this.allChecked, this.indeterminate);
  }

  // GET ALL INDUSTRY TEXT FIELD
  industryR = [];
  getIndustryR() {
    this.industryR = [];
    this.objIndustry.nameOfTheIndustry = this.disData3[this.aIF].nameOfTheIndustry;
    this.objIndustry.ruleType = null;
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getIndustryField', this.objIndustry)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.industryR = res.data.getIndustryField;
          // console.log('industryR:', this.industryR);
          setTimeout(() => {
            this.generateGroup();
          }, 500);
        } else {
          this.message.warning(res.msg);
        }
      });
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // GET FIELDS THAT WERE SELECTED
  groupFlag = false;
  getGroup() {
    this.groupFlag = false; // false为首次添加关联
    this.objIndustry.nameOfTheIndustry = this.disData3[this.aIF].nameOfTheIndustry;
    this.objIndustry.ruleType = null;
    this.objIndustry.enterpriseClassificationTableID = null;
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllFieldAndFixedFieldSettingsInTheIndustry',
        this.objIndustry,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isSpinning3 = false;
          let tmp = res.data.getAllFieldAndFixedFieldSettingsInTheIndustry;
          if (tmp.length === 0) {
            this.groupFlag = false;
          } else {
            this.groupFlag = true;
            for (let i = 0; i < tmp.length; i++) {
              for (let j = 0; j < this.checkOptionsOne.length; j++) {
                if (tmp[i].fieldNames === this.checkOptionsOne[j].label) {
                  this.checkOptionsOne[j].checked = true;
                }
              }
            }
            if (tmp.length === this.checkOptionsOne.length) {
              this.allChecked = true;
              this.indeterminate = false;
            } else {
              this.allChecked = false;
              this.indeterminate = true;
            }
            // console.log('checkOOne:', this.checkOptionsOne, tmp,this.listOfChData[6]);
            // for(let i = 0;i<this.listOfChData[6].length;i++){
            //   // tmp[i].ruleType = 5
            //   this.http.post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings',this.listOfChData[6][i]).subscribe(()=>{});
            // }
            // this.http.post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings',this.listOfChData[6]).subscribe(()=>{});
          }
        } else {
          this.message.warning(res.msg);
        }
      });
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // for the checkgroup DOM
  generateGroup() {
    this.checkOptionsOne = [];
    for (let i = 0; i < this.industryR.length; i++) {
      this.checkOptionsOne[i] = {};
      this.checkOptionsOne[i].label = this.industryR[i].fieldNames;
      this.checkOptionsOne[i].checked = false;
    }
  }

  aPostGroup = [];
  gPostGroup() {
    for (let j = 0; j < this.searArr3.length; j++) {
      for (let i = 0; i < this.checkOptionsOne.length; i++) {
        if (this.checkOptionsOne[i].label === this.searArr3[j].label) {
          this.checkOptionsOne[i].checked = this.searArr3[j].checked;
        }
      }
    }
    this.aPostGroup = [];
    for (let i = 0; i < this.industryR.length; i++) {
      if (this.checkOptionsOne[i].checked === true) {
        let tObj = { ...this.objIndustry };
        tObj.nameOfTheIndustry = this.industryR[i].nameOfTheIndustry;
        tObj.fieldNames = this.industryR[i].fieldNames;
        tObj.whetherTheFieldIsDisplayed = '1';
        tObj.ruleType = 4;
        // console.log('pushwhat?', tObj);
        this.aPostGroup.push(tObj);
        // console.log('aPostGroup:', this.aPostGroup);
      }
    }
    if (this.aPostGroup.length === 0) {
      this.groupFlag = true;
      let tObj = { ...this.objIndustry };
      // tObj.cEnterpriseName = this.industryComm[i].companyName;
      // tObj.cEnterprisecode = this.industryComm[i].companyCode;
      tObj.nameOfTheIndustry = this.disData3[this.aIF].nameOfTheIndustry;
      tObj.ruleType = 4;
      // console.log('pushwhat?', tObj);
      this.aPostGroup.push(tObj);
    }
    this.searArr3 = [];
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  postGroup() {
    this.gPostGroup();
    if (this.groupFlag === true) {
      this.http
        .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdIndustryDisplayField', this.aPostGroup)
        .subscribe((res: any) => {
          if (res.code === 1) {
            // console.log('修改的assign字段：', this.aPostGroup);
            let tmp = res.data.getupdIndustryDisplayField;
            // 上方接口会复制行业名称，用下方接口通过tableID删掉
            if (tmp[0].fieldNames === null) {
              this.http
                .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmp[0])
                .subscribe(() => {});
              this.getData3();
            }
          } else {
            this.message.warning(res.msg);
          }
        });
    } else if (this.groupFlag === false) {
      this.http
        .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.aPostGroup)
        .subscribe((res: any) => {
          if (res.code === 1) {
            // console.log('添加的assign字段：', this.aPostGroup);
          } else {
            this.message.warning(res.msg);
          }
        });
    }
  }

  // editing industry name
  eIF: number = null;
  eIFName: string = null;
  editIF(eIF: number) {
    this.eIF = eIF;
    this.eIFName = this.disData3[eIF].nameOfTheIndustry;
    this.ieVisible3 = true;
  }
  eIFCancel() {
    this.ieVisible3 = false;
    this.eIF = null;
    this.eIFName = null;
  }
  eIFOk() {
    let tF = true;
    // let goF = false;
    if (this.judgeText(this.eIFName)) {
      for (let i = 0; i < this.disData3.length; i++) {
        if (this.eIFName === this.disData3[i].nameOfTheIndustry && i !== this.eIF) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        const tmp = { ...this.objBase, nameOfTheIndustry: this.disData3[this.eIF].nameOfTheIndustry };
        // enterpriseClassificationTableID:this.disData3[this.eIF].enterpriseClassificationTableID,};
        const delOld = this.listOfChData[this.eIF].map(i => {
          return { ...i };
        });
        // console.log(delOld)
        this.objIndustry.nameOfTheIndustry = this.eIFName;
        this.objIndustry.ruleType = 4;
        this.objIndustry.enterpriseClassificationTableID = this.disData3[this.eIF].enterpriseClassificationTableID;
        this.objIndustry.fieldNames = null;
        this.disData3[this.eIF].nameOfTheIndustry = this.eIFName;
        this.http
          // .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.listOfChData[this.eIF])
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.getData3();
              // console.log('修改行业成功：', this.objIndustry);
              this.ieVisible3 = false;
              this.eIFName = null;
              this.eIF = null;
              this.disData3 = this.disData3.filter(i => true);
            } else {
              this.message.warning(res.msg);
            }
          });

        let tmparr = [];
        let listArr = this.listOfChData[this.eIF].map(i => {
          return { ...i };
        });
        // 获取原行业选中的字段
        this.http
          .post(
            '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllFieldAndFixedFieldSettingsInTheIndustry',
            tmp,
          )
          // .toPromise().then((res: any) => {
          //     if (res.code === 1) {
          //       this.isSpinning3 = false;
          //       tmparr = res.data.getAllFieldAndFixedFieldSettingsInTheIndustry;
          //       console.log(tmparr)
          //     } else {
          //       this.message.warning(res.msg);
          //     }
          // })
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.isSpinning3 = false;
              tmparr = res.data.getAllFieldAndFixedFieldSettingsInTheIndustry;
              // console.log(tmparr)
            } else {
              this.message.warning(res.msg);
            }
          });

        for (let i = 0; i < listArr.length; i++) {
          listArr[i].nameOfTheIndustry = this.eIFName;
          listArr[i].ruleType = 5;
          for (let j = 0; j < tmparr.length; j++) {
            if (tmparr[j].fieldNames === listArr[i].fieldNames) {
              listArr[i].whetherTheFieldIsDisplayed = '1';
            }
          }
        }
        // console.log(tmparr,listArr)
        // 删除原行业
        // console.log(delOld)
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', delOld)
          .subscribe(() => {});

        // console.log(listArr,tmparr)
        // 提交新行业名称和原行业字段
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', listArr)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.getChData();
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入行业名称！');
    }
    // setTimeout(() => {
    //   this.getChData();
    // }, 2000);
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // deleting industry
  delIF(delIndex: number) {
    let tmpObj = this.disData3[delIndex];
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelIndustryDisplayField', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('删除行业成功：', tmpObj);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.disData3 = this.disData3.filter(i => i.nameOfTheIndustry !== tmpObj.nameOfTheIndustry);
    setTimeout(() => {
      this.getChData();
    }, 1000);
  }

  // new field
  listOfChData = [];
  isField = false;
  newF = null;
  fIndex = null;
  newFieldName = null;
  newField(fIndex) {
    this.isField = true;
    this.fIndex = fIndex;
    this.newFieldName = this.disData3[this.fIndex].nameOfTheIndustry;
  }
  newFCancel() {
    this.isField = false;
    this.newF = null;
    this.fIndex = null;
    this.newFieldName = null;
  }
  newFOk() {
    let tF = true;
    if (this.judgeText(this.newF)) {
      for (let i = 0; i < this.listOfChData[this.fIndex].length; i++) {
        if (this.newF === this.listOfChData[this.fIndex][i].fieldNames) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.nameOfTheIndustry = this.disData3[this.fIndex].nameOfTheIndustry;
        this.objIndustry.fieldNames = this.newF;
        this.objIndustry.ruleType = 5;
        this.objIndustry.whetherTheFieldIsDisplayed = '0';
        // console.log('新增字段成功1：', this.objIndustry);
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.isField = false;
              this.newF = null;
              this.fIndex = null;
              this.newFieldName = null;
              // console.log('新增字段成功2：', this.objIndustry);
              // this.getData0();
              // this.getChData();
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入新字段名称！');
    }
    setTimeout(() => {
      this.getChData();
    }, 1000);
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // get ALL industries' Fields
  getChData() {
    this.getData3();
    this.listOfChData = [];
    for (let i = 0; i < this.disData3.length; i++) {
      this.objIndustry.nameOfTheIndustry = this.disData3[i].nameOfTheIndustry;
      this.objIndustry.fieldNames = null;
      this.objIndustry.ruleType = null;
      this.objIndustry.enterpriseClassificationTableID = null;
      // console.log('objIndustry:', i, this.objIndustry);
      this.http
        .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getIndustryField', this.objIndustry)
        .subscribe((res: any) => {
          if (res.code === 1) {
            this.listOfChData[i] = res.data.getIndustryField;
          } else {
            this.message.warning(res.msg);
          }
        });
    }
    this.isLoading3 = false;
    // console.log('总的字段：', this.listOfChData);
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  /**
   * 2020-10-07
   * 需求变更，将工业指标变为树状，分为一级、二级指标
   */

  // edit Field
  // edit first level's name
  ieField = false;
  eFieldName = null;
  eFIndex = null;
  listIndex = null;
  editField(eFIndex, listIndex) {
    this.ieField = true;
    this.eFIndex = eFIndex;
    this.listIndex = listIndex;
    this.eFieldName = this.newData1[listIndex][this.eFIndex].nameOfTheIndustry;
  }

  eFieldCancel() {
    this.ieField = false;
    this.eFIndex = null;
    this.eFieldName = null;
    this.listIndex = null;
  }
  eFieldOk() {
    let tF = true;
    if (this.judgeText(this.eFieldName)) {
      for (let i = 0; i < this.newData1[this.listIndex].length; i++) {
        if (this.eFieldName === this.newData1[this.listIndex][i].nameOfTheIndustry && i !== this.eFIndex) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.nameOfTheIndustry = this.eFieldName;
        this.objIndustry.ruleType = this.disDataIF[this.listIndex].id;
        this.objIndustry.whetherTheFieldIsDisplayed = this.newData1[this.listIndex][
          this.eFIndex
        ].whetherTheFieldIsDisplayed;
        this.objIndustry.enterpriseClassificationTableID = this.newData1[this.listIndex][
          this.eFIndex
        ].enterpriseClassificationTableID;
        // let secArr = [];
        // for (let i = 0; i < this.newData2[this.eFIndex].enterpriseClassificationRulesFunctionSheet.length; i++) {
        //   secArr[i] = { ...this.objIndustry };
        //   secArr[i].whetherTheFieldIsDisplayed = this.newData2[this.eFIndex].enterpriseClassificationRulesFunctionSheet[
        //     i
        //   ].whetherTheFieldIsDisplayed;
        //   secArr[i].enterpriseClassificationTableID = this.newData2[
        //     this.eFIndex
        //   ].enterpriseClassificationRulesFunctionSheet[i].enterpriseClassificationTableID;
        //   secArr[i].fieldNames = this.newData2[this.eFIndex].enterpriseClassificationRulesFunctionSheet[i].fieldNames;
        // }

        this.newData1[this.listIndex][this.eFIndex].nameOfTheIndustry = this.eFieldName;
        // this.http.post('http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings',this.objIndustry,)
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.ieField = false;
              this.eFIndex = null;
              this.eFieldName = null;
              this.listIndex = null;
              this.newGetData1();
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入分类名称！');
    }
    setTimeout(() => {
      this.reset3();
    }, 1000);
  }

  // del Field
  // del first level
  delField(delFIndex, listDel) {
    // let tmpObj = this.listOfChData[listDel][delFIndex];
    const tmpObj = this.newData1[listDel][delFIndex];
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelClassificationField',
        //'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelClassificationField',
        tmpObj,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('删除字段成功：', tmpObj);
          this.message.success(res.msg);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.newData1[listDel] = this.newData1[listDel].filter(i => i.nameOfTheIndustry !== tmpObj.nameOfTheIndustry);
    setTimeout(() => {
      this.newGetData1();
    }, 500);
  }

  // Tree node  new feature
  // tslint:disable-next-line: member-ordering
  @ViewChild('nzTreeComponent3', { static: false }) nzTreeComponent3: NzTreeComponent;
  // searchValue0: string = null;
  defaultCheckedKeys3 = [];
  defaultExpandedKeys3 = ['0'];
  defaultSelectedKeys3 = [];

  secondTitle = '新增二级指标';
  isCreSecond = false;
  eClick: any = null;

  // 点击tree组件
  nzClick3(event: NzFormatEmitEvent): void {
    // this.eClick = event;
    // let t = event.node;
    // if (t.level === 0) {
    //   return;
    // }
    // if (t.level === 1) {
    //   this.secondTitle = '为' + `"${t.title}"` + '新增二级指标';
    //   this.isCreSecond = true;
    // }
    // if (t.level === 2) {
    //   this.showDeleteConfirm();
    // }
  }

  // 删除二级指标
  delSecond() {
    // let t1:any = this.newData2.filter(i => i.nameOfTheIndustry === this.eClick.node.parentNode.title);
    // let t2:any = t1.enterpriseClassificationRulesFunctionSheet
    // let t3:any = t2.filter(i => i.fieldNames === this.eClick.node.title)
    let n: any = this.eClick.node.key.split('-');
    this.objIndustry.nameOfTheIndustry = this.newData2[n[1]].nameOfTheIndustry;
    this.objIndustry.ruleType = this.disDataIF[this.aIF].id;
    this.objIndustry.enterpriseClassificationTableID = this.newData2[n[1]].enterpriseClassificationRulesFunctionSheet[
      n[2]
    ].enterpriseClassificationTableID;
    this.objIndustry.whetherTheFieldIsDisplayed = null;
    this.objIndustry.fieldNames = this.eClick.node.title;
    this.http
      .post(
        // 'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings',
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings',
        this.objIndustry,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.newGetData2();
          this.message.success(res.msg);
          // this.allData[0].children[n[1]].splice(n[2],1)
          // this.allData[0].filter(i => true)
        } else {
          this.message.warning(res.msg);
        }
      });
    setTimeout(() => {
      this.reset3();
    }, 500);
  }
  showDeleteConfirm() {
    this.modalService.confirm({
      nzTitle: `确定删除二级指标:'${this.eClick.node.title}'吗?`,
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.delSecond(),
      nzCancelText: '取消',
      nzOnCancel: () => {},
    });
  }

  // 新增二级指标
  newIFName2: any = null;
  newIFCancel2() {
    this.isCreSecond = false;
    this.newIFName2 = null;
  }
  newIFOk2() {
    let tF = true;
    if (this.judgeText(this.newIFName2)) {
      for (let i = 0; i < this.eClick.node.children.length; i++) {
        if (this.newIFName2 === this.eClick.node.children[i].title) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.ruleType = this.disDataIF[this.aIF].id;
        this.objIndustry.nameOfTheIndustry = this.eClick.node.title;
        this.objIndustry.fieldNames = this.newIFName2;
        this.objIndustry.whetherTheFieldIsDisplayed = null;
        // this.http
        //   .post(
        //     this.objIndustry,
        //   )
        this.http
          .post(
            '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
            //'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',
            this.objIndustry,
          )
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('新增行业成功：', this.objIndustry);
              // if (this.disData3.length === 0) {
              //   this.disData3[0] = this.objIndustry;
              // } else {
              //   this.disData3.splice(0, 0, this.objIndustry);
              // }
              this.newGetData2();
              this.isCreSecond = false;
              this.newIFName2 = null;
              this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入二级指标！');
    }
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // 新增一级指标
  isCreFirst = false;
  newFirstIndex = null;
  newIndustryField1(newFirst: number) {
    this.isCreFirst = true;
    this.newFirstIndex = newFirst;
  }
  newIFName1: any = null;
  newIFCancel1() {
    this.isCreFirst = false;
    this.newIFName1 = null;
    this.newFirstIndex = null;
  }
  newIFOk1() {
    let tF = true;
    if (this.judgeText(this.newIFName1)) {
      for (let i = 0; i < this.newData1[this.newFirstIndex].length; i++) {
        if (this.newIFName1 === this.newData1[this.newFirstIndex][i].nameOfTheIndustry) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.ruleType = this.disDataIF[this.newFirstIndex].id;
        this.objIndustry.nameOfTheIndustry = this.newIFName1;
        this.objIndustry.whetherTheFieldIsDisplayed = null;
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objIndustry)
          //.post('http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings',this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.newGetData1();
              this.isCreFirst = false;
              this.newIFName1 = null;
              this.newFirstIndex = null;
              this.message.success(res.msg);
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else {
      this.message.warning('请输入一级指标！');
    }
    setTimeout(() => {
      this.reset3();
    }, 500);
  }

  // only first level
  newData1 = [];
  newGetData1() {
    this.newData1 = [];
    this.objIndustry.nameOfTheIndustry = null;
    this.objIndustry.enterpriseClassificationTableID = null;
    this.objIndustry.fieldNames = null;
    this.objIndustry.whetherTheFieldIsDisplayed = null;
    for (let i = 0; i < this.disDataIF.length; i++) {
      this.objIndustry.ruleType = this.disDataIF[i].id;
      this.http
        .post(
          // 'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustryCalss',
          '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustryCalss',
          this.objIndustry,
        )
        .subscribe((res: any) => {
          if (res.code === 1) {
            if (i === this.disDataIF.length - 1) {
              this.isLoading3 = false;
            }
            this.newData1[i] = res.data.getAllFieldAndFixedFieldSettingsInTheIndustryCalss;
          } else {
            this.message.warning(res.msg);
          }
        });
    }
    // console.log(this.newData1);
  }
  // all level including second level
  newData2 = [];
  displayNewData = [];
  // 列设置的固定大类列显示
  fixeddata = [
    { name: '产值（本月）', index: 3, checked: true },
    { name: '增加值（本月）', index: 3, checked: true },
    { name: '营业收入（本月）', index: 3, checked: true },
    { name: '利润总额（本月）', index: 3, checked: true },
    { name: '产值（累计）', index: 3, checked: true },
    { name: '增加值（累计）', index: 3, checked: true },
    { name: '营业收入（累计）', index: 3, checked: true },
    { name: '利润总额（累计）', index: 3, checked: true },
  ];
  newGetData2() {
    this.newData2 = [];
    this.objIndustry.nameOfTheIndustry = null;
    this.objIndustry.ruleType = this.disDataIF[this.aIF].id;
    this.objIndustry.enterpriseClassificationTableID = null;
    this.http
      .post(
        // 'http://192.168.9.14:18097/cnic-projectmanagement/IndustrialGroupaction/getIndustrialFinancial',
        '/cnic-projectmanagement/IndustrialGroupaction/getIndustrialFinancial',
        this.objIndustry,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.newData2 = res.data.getIndustrialFinancial;
          if (this.aIF === 0) {
            // 固定工业的前8个指标
            for (let i = 0; i < this.fixeddata.length; i++) {
              if (this.fixeddata[i].name === this.newData2[i].nameOfTheIndustry) {
                continue;
              } else {
                for (let j = i + 1; j < this.newData2.length; j++) {
                  if (this.fixeddata[i].name === this.newData2[j].nameOfTheIndustry) {
                    let t1: any = { ...this.newData2[i] };
                    let t1t: any = [...this.newData2[i].enterpriseClassificationRulesFunctionSheet];
                    t1.enterpriseClassificationRulesFunctionSheet = [];
                    t1t.map(item => {
                      let t2 = { ...item };
                      t1.enterpriseClassificationRulesFunctionSheet.push(t2);
                    });
                    this.newData2[i] = this.newData2[j];
                    this.newData2[j] = t1;
                    break;
                  }
                }
              }
            }
          }
          // console.log(this.newData2);
          // this.newData1 = res.data.getAllFieldAndFixedFieldSettingsInTheIndustryCalss;
          this.addKey();
        } else {
          this.message.warning(res.msg);
        }
      });
  }
  // 将获取到的全部指标，按照一二级关系，变成tree组件的展示数组
  allData = [];
  addKey() {
    this.allData = [];
    this.displayNewData = [];
    this.defaultCheckedKeys3 = [];
    this.allData.push({ title: '全选', key: '0', expanded: true, children: this.displayNewData });
    for (let i = 0; i < this.newData2.length; i++) {
      this.displayNewData[i] = {};
      if (this.newData2[i]) {
        this.displayNewData[i].title = this.newData2[i].nameOfTheIndustry;
        this.displayNewData[i].key = '0-' + i;
        if (this.newData2[i].whetherTheFieldIsDisplayed === '1') {
          this.defaultCheckedKeys3.push(this.displayNewData[i].key);
        }
        const tmp = this.newData2[i].enterpriseClassificationRulesFunctionSheet;
        if (tmp.length > 0) {
          this.displayNewData[i].children = [];
          for (let j = 0; j < tmp.length; j++) {
            const t = { title: null, key: null, isLeaf: true, disableCheckbox: true };
            t.title = tmp[j].fieldNames;
            t.key = '0-' + i + '-' + j;
            this.displayNewData[i].children.push(t);
            // 后端查询到的选中项
            if (this.newData2[i].whetherTheFieldIsDisplayed === '1') {
              // if (this.newData2[i].whetherTheFieldIsDisplayed === '1' && tmp[j].whetherTheFieldIsDisplayed === '1') {
              this.defaultCheckedKeys3.push(t.key);
              // 将所有选中变为null，为获取本地选中进行初始化
              // tmp[j].whetherTheFieldIsDisplayed = null;
            }
          }
        }
      } else {
        // this.newData1[i].isLeaf = true;
      }
    }
    this.defaultExpandedKeys3 = ['0'];
    // console.log(this.defaultCheckedKeys3);
    this.isSpinning3 = false;
  }

  // post checked boxes
  postChecked() {
    this.http
      .post(
        // 'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdClassificationField',
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdClassificationField',
        this.postLC,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          // this.isSpinning3 = false;
          // this.disData =res.data.getAllClassificationFieldIndustry;
          this.message.success(res.msg);
          this.iaVisible3 = false;
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  // post first level
  postFirst() {
    this.http
      .post(
        // 'http://192.168.9.14:18097/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings',
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings',
        this.markFirst,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.isSpinning3 = false;
          // this.disData =res.data.getAllClassificationFieldIndustry;
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  // get local checked boxes
  // tslint:disable-next-line: member-ordering
  postLC = [];
  markFirst = [];
  getLocalChecked() {
    this.isSpinning3 = true;
    this.postLC = [];
    this.markFirst = [];
    const localChecked = this.nzTreeComponent3.getCheckedNodeList();
    // console.log(localChecked);
    this.newData2.map(i => {
      let t = { ...this.objIndustry };
      t.ruleType = this.disDataIF[this.aIF].id;
      t.enterpriseClassificationTableID = i.enterpriseClassificationTableID;
      t.nameOfTheIndustry = i.nameOfTheIndustry;
      t.whetherTheFieldIsDisplayed = null;
      this.markFirst.push(t);
      i.enterpriseClassificationRulesFunctionSheet.map(j => {
        j.whetherTheFieldIsDisplayed = null;
        this.postLC.push(j);
      });
    });

    if (localChecked.length > 0) {
      for (let i = 0; i < localChecked.length; i++) {
        // checked boxes
        if (localChecked[i].level === 0) {
          this.postLC.map(item => (item.whetherTheFieldIsDisplayed = '1'));
          this.markFirst.map(item => (item.whetherTheFieldIsDisplayed = '1'));
        } else if (localChecked[i].level === 1) {
          this.postLC.map(item => {
            // 二级指标标志
            if (item.nameOfTheIndustry === localChecked[i].title) {
              item.whetherTheFieldIsDisplayed = '1';
            }
          });
          this.markFirst.map(item => {
            // 一级指标标志
            if (item.nameOfTheIndustry === localChecked[i].title) {
              item.whetherTheFieldIsDisplayed = '1';
            }
          });
        }
        // else if (localChecked[i].level === 2) {
        //   this.postLC.map(item => {
        //     if (item.fieldNames === localChecked[i].title) {
        //       item.whetherTheFieldIsDisplayed = '1';
        //     }
        //   });
        //   this.markFirst.map(item => {
        //     // 一级指标标志
        //     if (item.nameOfTheIndustry === localChecked[i].parentNode.title) {
        //       item.whetherTheFieldIsDisplayed = '1';
        //     }
        //   });
        // }
      }
    }
    // console.log(this.postLC, this.markFirst);
  }

  // 固定表格
  disDataIF = [
    { nameOfTheIndustry: '工业', expand: false, id: 6 },
    { nameOfTheIndustry: '贸易业', expand: false, id: 8 },
    { nameOfTheIndustry: '服务业', expand: false, id: 11 },
    { nameOfTheIndustry: '劳资业', expand: false, id: 9 },
    { nameOfTheIndustry: '房地产业', expand: false, id: 12 },
    { nameOfTheIndustry: '建筑业营业收入', expand: false, id: 7 },
    { nameOfTheIndustry: '建筑业产值', expand: false, id: 10 },
  ];

  /**
   * tab4 自定义行业分类*******************************************************************************
   */

  listOfData = [];

  keys = [];

  getAllClass() {
    this.http
      .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getIndustryCodeDictionary', {
        cAccUniqueID: this.account.cAccUniqueID,
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.listOfData = res.data;
        } else {
          this.listOfData = [];
        }
      });
  }

  getAllHangye() {
    this.http
      .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getIndustryCode', {
        cAccUniqueID: this.account.cAccUniqueID,
      })
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.nodes = res.data;
        } else {
          this.nodes = [];
        }
      });
  }

  //新建&修改分类obj
  addClassObj = {
    /** 自定义类别名称 */
    cCustomClassName: null,
    /** 创建人 */
    cCreator: this.login.cPersonName,
    /** 所属帐套UUID */
    cAccUniqueID: this.account.cAccUniqueID,
    /** 所属组织UUID */
    cOrgUUID: this.org.cOrgUUID,
    /** 所属部门UUID */
    cOrgDepUUID: this.login.cOrgDepUUID,
    CustomClassUUID: null,
    cCustomCondition: null,
  };

  //modal开关
  isVisible = false;

  //modal title
  modalName = null;

  //打开modal
  showModal(data): void {
    this.isVisible = true;
    data ? (this.modalName = '编辑 - ' + data.cCustomClassName) : (this.modalName = '增加');
    if (data) {
      this.addClassObj = {
        /** 自定义类别名称 */
        cCustomClassName: data.cCustomClassName,
        /** 创建人 */
        cCreator: this.login.cPersonName,
        /** 所属帐套UUID */
        cAccUniqueID: this.account.cAccUniqueID,
        /** 所属组织UUID */
        cOrgUUID: this.org.cOrgUUID,
        /** 所属部门UUID */
        cOrgDepUUID: this.login.cOrgDepUUID,
        CustomClassUUID: data.customClassUUID,
        cCustomCondition: data.cCustomCondition,
      };
    } else {
      this.addClassObj = {
        /** 自定义类别名称 */
        cCustomClassName: null,
        /** 创建人 */
        cCreator: this.login.cPersonName,
        /** 所属帐套UUID */
        cAccUniqueID: this.account.cAccUniqueID,
        /** 所属组织UUID */
        cOrgUUID: this.org.cOrgUUID,
        /** 所属部门UUID */
        cOrgDepUUID: this.login.cOrgDepUUID,
        CustomClassUUID: null,
        cCustomCondition: null,
      };
    }
  }

  //modal 点ok
  handleOk(): void {
    let flag = true;
    if (this.judgeT(this.addClassObj.cCustomClassName)) {
      this.message.warning('请输入分类名称');
      flag = false;
      return;
    }
    if (this.judgeT(this.addClassObj.cCustomCondition)) {
      this.message.warning('请输入筛选条件');
      flag = false;
      return;
    }

    if (flag) {
      if (!this.addClassObj.CustomClassUUID) {
        this.http
          .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getAddCustomClass', this.addClassObj)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.message.success(res.msg);
              this.isVisible = false;
              this.getAllClass();

              this.addClassObj = {
                /** 自定义类别名称 */
                cCustomClassName: null,
                /** 创建人 */
                cCreator: this.login.cPersonName,
                /** 所属帐套UUID */
                cAccUniqueID: this.account.cAccUniqueID,
                /** 所属组织UUID */
                cOrgUUID: this.org.cOrgUUID,
                /** 所属部门UUID */
                cOrgDepUUID: this.login.cOrgDepUUID,
                /** 唯一标识 */
                CustomClassUUID: null,
                cCustomCondition: null,
              };
            } else {
              this.message.error(res.msg);
            }
          });
      } else {
        this.http
          .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getUpdateCustomClass', this.addClassObj)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.message.success(res.msg);
              this.isVisible = false;
              this.getAllClass();

              this.addClassObj = {
                /** 自定义类别名称 */
                cCustomClassName: null,
                /** 创建人 */
                cCreator: this.login.cPersonName,
                /** 所属帐套UUID */
                cAccUniqueID: this.account.cAccUniqueID,
                /** 所属组织UUID */
                cOrgUUID: this.org.cOrgUUID,
                /** 所属部门UUID */
                cOrgDepUUID: this.login.cOrgDepUUID,
                /** 唯一标识 */
                CustomClassUUID: null,
                cCustomCondition: null,
              };
            } else {
              this.message.error(res.msg);
            }
          });
      }
    }
  }

  //modal点cancel或关闭
  handleCancel(): void {
    this.isVisible = false;

    this.addClassObj = {
      /** 自定义类别名称 */
      cCustomClassName: null,
      /** 创建人 */
      cCreator: this.login.cPersonName,
      /** 所属帐套UUID */
      cAccUniqueID: this.account.cAccUniqueID,
      /** 所属组织UUID */
      cOrgUUID: this.org.cOrgUUID,
      /** 所属部门UUID */
      cOrgDepUUID: this.login.cOrgDepUUID,
      /** 唯一标识 */
      CustomClassUUID: null,
      cCustomCondition: null,
    };
  }

  //树
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  defaultCheckedKeys = [];

  searchValue = '';

  nodes = [];

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  //分配侧滑开关
  visible = false;

  //侧滑title
  drawerName = null;

  //打开侧滑
  open(data): void {
    this.defaultCheckedKeys = [];
    this.keys = [];
    this.drawerName = '分配 - ' + data.cCustomClassName;
    this.CustomClassUUID = data.customClassUUID;
    this.http
      .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getCategoryDictionaryAssociation', {
        CustomClassUUID: data.customClassUUID,
      })
      .subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          this.getKeys(res.data);
          this.defaultCheckedKeys = this.keys;
        }
        this.visible = true;
      });
  }

  //关闭侧滑
  close(): void {
    this.visible = false;
  }

  //转圈圈开关
  isSpinning = false;

  //分配保存
  CustomClassUUID = null;

  saveHangye() {
    this.isSpinning = true;
    this.keys = [];
    let list = [];
    this.getKey(this.nzTreeComponent.getCheckedNodeList());
    for (let i = 0; i < this.keys.length; i++) {
      list.push({
        uuid: this.keys[i],
        state: true,
      });
    }
    for (let i = 0; i < this.nzTreeComponent.getHalfCheckedNodeList().length; i++) {
      list.push({
        uuid: this.nzTreeComponent.getHalfCheckedNodeList()[i].key,
        state: false,
      });
    }
    this.http
      .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getDistributionOfTheCode', {
        listIndustryCodeDictionaryUUID: list,
        CustomClassUUID: this.CustomClassUUID,
      })
      .subscribe((res: any) => {
        this.isSpinning = false;
        if (res.code === 1) {
          this.message.success(res.msg);
          this.visible = false;
        } else {
          this.message.error(res.msg);
        }
      });
  }

  //保存用
  getKey(list) {
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].key) {
          this.keys.push(list[i].key);
        }
        if (list[i].children && list[i].children.length > 0) {
          this.getKey(list[i].children);
        }
      }
    }
  }

  //查询用
  getKeys(list) {
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].key) {
          if (list[i].state) {
            this.keys.push(list[i].key);
          }
        }
        if (list[i].children && list[i].children.length > 0) {
          this.getKeys(list[i].children);
        }
      }
    }
  }

  //删除分类
  delete(customClassUUID) {
    this.http
      .post('/cnic-projectmanagement/AddAndUpdateProjectAction/getDeleteCustomClass', {
        CustomClassUUID: customClassUUID,
      })
      .subscribe((res: any) => {
        // console.log(JSON.stringify(res));
        if (res.code === 1) {
          this.listOfData = this.listOfData.filter(d => d.customClassUUID !== customClassUUID);
          this.message.success(res.msg);
        } else {
          this.message.error(res.msg);
        }
      });
  }

  // control the buttons
  // 显示所有按钮，注销ng-template所在三行，注销二级表格。下面为true的变量改为false。注销函数nzClick3()
  // disableBtn = false;
  disableBtn = true;
  // disableTable = false;
  disableTable = true;
}
