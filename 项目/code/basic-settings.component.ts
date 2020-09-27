import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { OrgChooseService } from '../../../services/orgchoose.service';

@Component({
  selector: 'app-eco-analysis-basic-settings',
  templateUrl: './basic-settings.component.html',
})
export class EcoAnalysisBasicSettingsComponent implements OnInit {
  tabIndex: number = 0;
  nzPageIndex0 = 1;
  nzPageSize0 = 10;
  nzPageIndex1 = 1;
  nzPageSize1 = 10;
  nzPageIndex2 = 1;
  nzPageSize2 = 10;
  nzPageIndex3 = 1;
  nzPageSize3 = 10;

  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  // menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));
  // org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  constructor(private http: _HttpClient, private message: NzMessageService, private orgServe: OrgChooseService) {}

  ngOnInit() {
    // this.getOrgList();
    setTimeout(() => {
      this.getData0();
      this.getData1();
      this.getData2();
      this.getData3();
      this.getIndustryComm();
    }, 500);
    // console.log("session:",this.account,this.login,this.objNewCom);
    setTimeout(() => {
      this.getChData();
    }, 2000);
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
  isVisible0 = false;
  ieVisible0 = false;
  iaVisible0 = false;
  isSpinning0 = false;
  isLoading0 = true;

  objBase = {
    /** 所属帐套UUID */
    cAccUniqueID: this.account.cAccUniqueID, //必传
    /** 所属组织UUID */
    cOrgUUID: this.login.cOrgUUID,
    /** 所属部门UUID */
    cOrgDepUUID: this.login.cOrgDepUUID, //必传
    /**
     * 规则类型
     * 1企业分类
     * 2数据池处理地
     * 3规则设置功能
     * 4各行业显示字段
     */
    ruleType: null,
    enterpriseClassificationTableID: null,
  };

  objNewCom = {
    //社会信用代码
    cEnterprisecode: null,
    cEnterpriseNameClass: null,
    //企业名称
    cEnterpriseName: null,
    ...this.objBase,
  };
  disData0: any[] = [];

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

  getData0() {
    this.objNewCom.cEnterpriseNameClass = null;
    this.http
      .post(
        '/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getEnterprisesAreClassifiedAsAffiliatedEnterprisesCalss',
        this.objNewCom,
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          // this.checkShow(res.data);
          this.isLoading0 = false;
          this.disData0 = [...res.data.getEnterprisesAreClassifiedAsAffiliatedEnterprisesCalss];
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  reset0() {
    this.objNewCom = {
      //社会信用代码
      cEnterprisecode: null,
      cEnterpriseNameClass: null,
      //企业名称
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
    // this.newComName = this.repSig(this.newComName)
    if (this.judgeText(this.newComName)) {
      for (let i = 0; i < this.disData0.length; i++) {
        if (this.newComName === this.disData0[i].cEnterpriseNameClass) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objNewCom.cEnterpriseNameClass = this.newComName;
        this.objNewCom.ruleType = 1;
        // console.log('新增企业分类成功1：', this.objNewCom);
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objNewCom)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('新增企业分类成功2：', this.objNewCom);
              //this.getData0();
              // if (this.disData0.length === 0) {
              //   this.disData0[0] = this.objNewCom;
              // } else {
              //   this.disData0.splice(0, 0, this.objNewCom);
              // }
              this.getData0();
              this.isVisible0 = false;
              this.newComName = null;
              this.disData0 = this.disData0.filter(i => true);
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

  // Tree node
  // @ViewChild('nzTreeComponent0', { static: false }) nzTreeComponent0 !: NzTreeComponent;
  // searchValue0: string = '';
  // defaultCheckedKeys0 = ['100'];
  // defaultExpandedKeys0 = ['100', '1002'];
  // nodes0 = [
  // {
  //   title: 'parent 1',
  //   key: '100',
  //   children: [
  //     {
  //       title: 'parent 1-0',
  //       key: '1001',
  //       children: [
  //         { title: 'leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0leaf 1-0-0', key: '10010', isLeaf: true },
  //         { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
  //       ]
  //     },
  //     {
  //       title: 'parent 1-1',
  //       key: '1002',
  //       children: [
  //         { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
  //         { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
  //       ]
  //     }
  //   ]
  // }
  // ];
  // nzClick0(event: NzFormatEmitEvent): void {
  //   console.log(event);
  // }

  // 分配企业到分类
  aComIndex0: number = null;
  aComClass = null;
  assignCom(aComIndex0: number) {
    this.aComClass = this.disData0[aComIndex0].cEnterpriseNameClass;
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
        tObj.cEnterpriseNameClass = this.disData0[this.aComIndex0].cEnterpriseNameClass;
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
      tObj.cEnterpriseNameClass = this.disData0[this.aComIndex0].cEnterpriseNameClass;
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
    let objTmp = this.disData0[this.aComIndex0];
    this.objNewCom.cEnterpriseNameClass = objTmp.cEnterpriseNameClass;
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
    this.eComName = this.disData0[this.eComIndex0].cEnterpriseNameClass;
    this.ieVisible0 = true;
  }
  eComCancel() {
    this.ieVisible0 = false;
    this.eComName = null;
    this.eComIndex0 = null;
  }
  repSig(str) {
    let sig = [',', '\\.', '\\\\', '/', '<', '>', ';', ':', '"', '{', '}', "'", '；', '。'];
    for (let i = 0; i < sig.length; i++) {
      let p = new RegExp(sig[i], 'g');
      str = str.replace(p, '');
      // console.log("str:",str)
    }
    return str;
  }
  eComOk() {
    // this.eComName = this.repSig(this.eComName);
    // console.log(this.eComName);
    if (this.judgeText(this.eComName)) {
      let tF = true;
      for (let i = 0; i < this.disData0.length; i++) {
        if (this.eComName === this.disData0[i].cEnterpriseNameClass && i !== this.eComIndex0) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objNewCom.cEnterpriseNameClass = this.eComName;
        this.objNewCom.ruleType = 1;
        this.objNewCom.enterpriseClassificationTableID = this.disData0[this.eComIndex0].enterpriseClassificationTableID;
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objNewCom)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('修改企业分类成功：', this.objNewCom);
              this.getData0();
              this.ieVisible0 = false;
              this.eComName = null;
              this.eComIndex0 = null;
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
    let tmpObj = this.disData0[indexDel];
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelEnterpriseClassification', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('删除企业分类成功：', tmpObj);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.disData0 = this.disData0.filter(i => i.cEnterpriseNameClass !== tmpObj.cEnterpriseNameClass);
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
  newAlertOk() {
    let tF = true;
    if (this.judgeText(this.newAlertName) && this.threshold !== null && typeof this.threshold === 'number') {
      for (let i = 0; i < this.disData1.length; i++) {
        if (this.newAlertName === this.disData1[i].ruleDescription) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
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
    if (this.judgeText(this.eAlertName) && this.eThreshold !== null && typeof this.eThreshold === 'number') {
      // for (let i = 0; i < this.disData1.length; i++) {
      //   if (this.eAlertName === this.disData1[i].ruleDescription && i !== this.eAlertIndex) {
      //     tF = false;
      //     this.message.warning('名称重复，请重新命名！');
      //     break;
      //   }
      // }
      if (tF) {
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
            } else {
              this.message.warning(res.msg);
            }
          });
      }
    } else if (this.judgeT(this.eAlertName)) {
      this.message.warning('请输入规则名称！');
    } else if (this.eThreshold === null || typeof this.eThreshold !== 'number') {
      this.message.warning('请输入阈值!');
    }
    setTimeout(() => {
      this.reset1();
    }, 500);
  }

  // deleting rules
  // delAlert(delIndex: number) {
  //   let tmpObj = this.disData1[delIndex];
  //   this.http
  //     .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmpObj)
  //     .subscribe((res: any) => {
  //       if (res.code === 1) {
  //         console.log('删除规则成功：', delIndex,tmpObj);
  //       } else {
  //         this.message.warning(res.msg);
  //       }
  //     });
  //   this.disData1 = this.disData1.filter(
  //     i => i.ruleDescription !== tmpObj.ruleDescription,
  //   );
  // }

  /**
   * tab2 处理地设置*******************************************************************************
   */
  isVisible2 = false;
  ieVisible2 = false;
  isLoading2 = true;
  areaCode: number = null;
  newAreaName: string = null;
  objArea = {
    //数据处理地code
    dataProcessing: null,
    //数据处理地
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
      //数据处理地code
      dataProcessing: null,
      //数据处理地
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
    //行业名称
    nameOfTheIndustry: null,
    //字段名称
    fieldNames: null,
    //字段是否显示 1显示 0不显示
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
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              // console.log('新增行业成功：', this.objIndustry);
              // if (this.disData3.length === 0) {
              //   this.disData3[0] = this.objIndustry;
              // } else {
              //   this.disData3.splice(0, 0, this.objIndustry);
              // }
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
      //行业名称
      nameOfTheIndustry: null,
      //字段名称
      fieldNames: null,
      //字段是否显示 1显示 0不显示
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
    this.idField = this.disData3[aIF].nameOfTheIndustry;
    this.iaVisible3 = true;
    this.isSpinning3 = true;
    this.aIF = aIF;
    setTimeout(() => {
      this.getIndustryR();
    }, 500);
    setTimeout(() => {
      this.getGroup();
    }, 2000);
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
    this.reset4();
  }

  aOk() {
    this.postGroup();
    this.getChData();
    this.iaVisible3 = false;
    this.isSpinning3 = false;
    this.aIF = null;
    this.searchValue3 = null;
    this.search3F = false;
    setTimeout(() => {
      this.reset3();
      this.reset4();
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
              //this.getData0();
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

  // edit Field
  ieField = false;
  eFieldName = null;
  eFIndex = null;
  listIndex = null;
  editField(eFIndex, listIndex) {
    this.ieField = true;
    this.eFIndex = eFIndex;
    this.listIndex = listIndex;
    this.eFieldName = this.listOfChData[this.listIndex][this.eFIndex].fieldNames;
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
      for (let i = 0; i < this.listOfChData[this.listIndex].length; i++) {
        if (this.eFieldName === this.listOfChData[this.listIndex][i].fieldNames && i !== this.eFIndex) {
          tF = false;
          this.message.warning('名称重复，请重新命名！');
          // break;
        }
      }
      if (tF) {
        this.objIndustry.nameOfTheIndustry = this.listOfChData[this.listIndex][this.eFIndex].nameOfTheIndustry;
        this.objIndustry.fieldNames = this.eFieldName;
        this.objIndustry.ruleType = 5;
        this.objIndustry.whetherTheFieldIsDisplayed = this.listOfChData[this.listIndex][
          this.eFIndex
        ].whetherTheFieldIsDisplayed;
        this.objIndustry.enterpriseClassificationTableID = this.listOfChData[this.listIndex][
          this.eFIndex
        ].enterpriseClassificationTableID;
        this.listOfChData[this.listIndex][this.eFIndex].fieldNames = this.eFieldName;
        this.http
          .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings', this.objIndustry)
          .subscribe((res: any) => {
            if (res.code === 1) {
              this.ieField = false;
              this.eFIndex = null;
              this.eFieldName = null;
              this.listIndex = null;
              // console.log('修改字段成功：', this.objIndustry);
              // this.listOfChData[this.listIndex] = this.listOfChData[this.listIndex].filter(i => true);
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
    }, 500);
    setTimeout(() => {
      this.getChData();
    }, 1000);
  }

  // del Field
  delField(delFIndex, listDel) {
    let tmpObj = this.listOfChData[listDel][delFIndex];
    this.http
      .post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('删除字段成功：', tmpObj);
        } else {
          this.message.warning(res.msg);
        }
      });
    this.listOfChData[listDel] = this.listOfChData[listDel].filter(i => i.fieldNames !== tmpObj.fieldNames);
    setTimeout(() => {
      this.getChData();
    }, 1000);
  }

  // control the buttons
  // disableBtn = false;
  disableBtn = true;
}
