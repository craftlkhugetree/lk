/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/11/24 15:35
 * @Version: 1.0
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToolsService } from 'src/app/services/tools.service';


@Component({
  selector: 'app-portal-management-column-file',
  templateUrl: './column-file.component.html',
})
export class PortalManagementColumnFileComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private toolsService: ToolsService,
  ) {
    this.getCType();
    this.getCodeRule();
    this.getTree();
  }

  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));
  public cOrgPostClassUUID: any;
  public cTreeCode: any;
  public cTreeName: any;
  public listOfData: any = {
    cChoice: null,
    cType: null,
    cColumnCode: '',
    cColumnNames: '',
    cBrief: '',
    cChoiceCode: null,
    sys_Account: {
      cAccUniqueID: this.account.cAccUniqueID,
    },
    busi_Organzation: {
      cOrgUUID: this.current_org.cOrgUUID,
    },
    cMakerCode: '',
    cMaker: '',
    dCreateDate: '',
  };
  public choose: any = [
    { index: '1', name: '导航' },
    { index: '2', name: '栏目' },
  ];

  // public isTree = true;
  private originTree: any = [];
  private midTree: any = [];
  // 栏目编码flag
  public sEdit: any = true;
  public codeRule: any = '';
  private menuID: any = '020403030102';

  // 表单数据
  validateForm: any = FormGroup;

  public isEdit = false;

  // 新增修改的状态 1 2
  public state: any;

  public nodes: any = [];

  // 类型项
  public cType: any = [];
  private event: any = null;
  // 正则
  private reg: any = null;
  // 编码规则位数
  public n = [1, 0];
  public maxNum: any = 0;
  // post参数obj
  public dataObj: any = {
    "saveObj":{
      cChoice: null,
      cType: null,
      cColumnCode: '',
      cColumnNames: '',
      cBrief: '',
      cChoiceCode: null,
      sys_Account: {
        cAccUniqueID: this.account.cAccUniqueID,
      },
      busi_Organzation: {
        cOrgUUID: this.current_org.cOrgUUID,
      },
      cMakerCode: '',
      cMaker: '',
      dCreateDate: '',
    }
  };

  // 点击左侧获取数据
  nzEvent(event: Required<NzFormatEmitEvent>): void {
    // console.log(event);
    if (event && event.keys[0]) {
      this.event = event;
      this.http.get('/CNIC_M/ColumnManagement/getResourceClass/' + event.node.origin.iTreeID).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
            this.listOfData = res.wz_ColumnSetting;
            // console.log(this.listOfData)
          } else {
            this.msg.error(res.Result.cRsultInfo);
          }
        },
        () => {
          this.msg.error('请检查网络连接');
        },
      );
    } else {
      this.resetList();
    }
  }

  getCType() {
    this.http.post('/CNIC_M/Vo_Enum/getEnumByEnumType', { enumType: 'cType' }).subscribe((res2: any) => {
      if (res2.Result.iRsult === 1) {
        // let tmp:any = res2.enumList.filter(item => item.cEnumCode === this.listOfData.cType);
        res2.enumList.map(item => {
          this.cType.push({ cEnumCode: item.cEnumCode, cEnumName: item.cEnumName });
        });
        // console.log(this.cType);
      } else {
        this.msg.error(res2.Result.cRsultInfo);
      }
    });
  }

  // 编码规则
  getCodeRule() {
    this.http
      .get('/CNIC_M/Website/getGradeRules4ByMenuCode/' + this.menuID)
      .subscribe((res2: any) => {
        if (res2.Result.iRsult === 1) {
          this.codeRule = res2.retStr;
          this.setCodeRule();
          // console.log(this.n,this.maxNum,this.codeRule)
        } else {
          this.msg.error(res2.Result.cRsultInfo);
        }
      });
  }

  // 编码正则
  setCodeRule() {
    for (let i = 0; i < this.codeRule.length; i++) {
      if (this.codeRule.charAt(i) === '*') {
        this.n[this.n[0]]++;
      }
      if (this.codeRule.charAt(i) === ' ' && this.codeRule.charAt(i + 1) === '*') {
        this.n[0]++;
        this.n[this.n[0]] = 0;
      } else {
        continue;
      }
    }
    for (let i = 1; i <= this.n[0]; i++) {
      this.maxNum += this.n[i];
    }
  }

  // 验证编码
  validateCode(code: any) {
    let flag = false;
    let tmp = 0;
    for (let i = 1; i <= this.n[0]; i++) {
      tmp += this.n[i];
      let reg = new RegExp('^\\d{' + tmp + '}$');
      if (reg.test(code)) {
        flag = true;
      }
    }
    return flag;
  }

  public spin = false;
  // 获取树
  getTree() {
      this.spin = true;
    // this.http.get('/CNIC_M/ColumnManagement/getResourceClassList/' + 77).subscribe(
        this.http.get('/CNIC_M/ColumnManagement/getResourceClassList/' + this.current_org.iOrgID).subscribe(
      (res: any) => {
        if (res.Result.iRsult === 1) {
          this.originTree = res.listTree;
          this.nodes = [
            {
              title: '栏目信息',
              expanded: true,
              children: [],
            },
          ];
          this.midTree = this.toTree(this.originTree);
          this.nodes[0].children = this.midTree;
          this.spin = false;
          // console.log(this.nodes, this.midTree);
        } else {
          this.msg.error(res.Result.cRsultInfo);
        }
      },
      () => {
        this.msg.error('请检查网络连接');
      },
    );
  }

  toTree(data, cParentCode = 'cParentCode', cTreeCode = 'cTreeCode', cTreeName = 'cTreeName') {
    const arr = [...data];
    // 一级
    const tree = [];
    // 非一级
    const arrNew: any = arr.filter(item => {
      if (!item[cParentCode]) {
        tree.push({
          title:  item.cTreeName,
          // title: '[' + item.cTreeCode + ']' + item.cTreeName,
          key: item.cTreeCode,
          iTreeID: item.iTreeID,
          children: [],
        });
      } else {
        return item;
      }
    });
    this.getChild(arrNew, tree, cParentCode, cTreeCode);
    return tree;
  }

  getChild(originArr, mapArr, cParentCode, cTreeCode) {
    if (originArr.length === 0 || !mapArr) return;
    // 循环父菜单，将其直系子菜单纳入
    mapArr.forEach(item => {
      if (item) {
        item.children = [];
        originArr.forEach((obj, index) => {
          if (obj) {
            if (item.key === obj[cParentCode]) {
              item.children.push({
                title: obj.cTreeName,
                // title: '[' + obj.cTreeCode + ']' + obj.cTreeName,
                key: obj.cTreeCode,
                iTreeID: obj.iTreeID,
                children: [],
              });
            }
          }
        });
        if (item.children.length === 0) {
          delete item.children;
          item.isLeaf = true;
        }
        // 勾选和半选都要传给后台，所以半选返回值也是true，需要递归判断其children
        else {
          // item.checked = item.children.every(element => {
          //   return element.bChecked === true
          // });
          this.getChild(originArr, item.children, cParentCode, cTreeCode);
        }
      }
    });
  }

  resetList(){
    this.listOfData = {
      cChoice: null,
      cType: null,
      cColumnCode: '',
      cColumnNames: '',
      cBrief: '',
      cChoiceCode: null,
      sys_Account: {
        cAccUniqueID: this.account.cAccUniqueID,
      },
      busi_Organzation: {
        cOrgUUID: this.current_org.cOrgUUID,
      },
      cMakerCode: '',
      cMaker: '',
      dCreateDate: '',
    };
  }
  edit(state) {
    this.state = state;
    if (state === 1) {
      this.sEdit = false;
      this.resetList();
      // 输入一级编码位数
      for(let i=0;i<this.n[1];i++){
        if(i === this.n[1]-1) {
          this.listOfData.cColumnCode += '1'
        }else {
        this.listOfData.cColumnCode += '0'
        }
      }
    } else {
      this.sEdit = true;
      if (!this.event) {
        this.msg.warning('请选择要修改的栏目');
        return;
      }
    }
    this.isEdit = !this.isEdit;
  }

  giveUp() {
    this.modalService.confirm({
      nzTitle: '确定要放弃编辑吗?',
      nzContent: '',
      nzOkText: '确定',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.reset();
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  reset() {
    this.isEdit = !this.isEdit;
    this.sEdit = true;
    this.dataObj = {  "saveObj":{
      cChoice: null,
      cType: null,
      cColumnCode: '',
      cColumnNames: '',
      cBrief: '',
      cChoiceCode: null,
      sys_Account: {
        cAccUniqueID: this.account.cAccUniqueID,
      },
      busi_Organzation: {
        cOrgUUID: this.current_org.cOrgUUID,
      },
      cMakerCode: '',
      cMaker: '',
      dCreateDate: '',
    }
    };
    this.nzEvent(this.event);
  }

  // 保存
  submitForm(): void {
    this.dataObj.saveObj = { ...this.listOfData };
    if (!this.listOfData.cColumnCode) {
      this.msg.warning('请输入栏目编码');
      return;
    }
    if (!this.validateCode(this.listOfData.cColumnCode)) {
      this.msg.warning(`如下[编码规则]空格分隔的'*'所示，栏目编码最短为${this.n[1]}位数字，最长为${this.maxNum}位数字`);
      return;
    }
    if (!this.listOfData.cColumnNames) {
      this.msg.warning('请输入栏目名称');
      return;
    }
    if (!this.listOfData.cChoice) {
      this.msg.warning('请选择【导航】或【栏目】')
      return;
    }
    // 新增
    if (this.state === 1) {
      // for(let obj in this.dataObj.saveObj) {
      //   this.dataObj.saveObj[obj] =  this.listOfData[obj]
      // }
      this.dataObj.saveObj.cChoiceCode = this.listOfData.cChoice;
      this.dataObj.saveObj.cMakerCode = this.login.cPersonCode;
      // this.dataObj.saveObj.cMakerCode = "avbr54c8b2b78e844c878f61f6bb13674cb1"//this.login.cPersonUUID;
      // this.dataObj.saveObj.cMaker =  "李肯"//this.login.cPersonName;
      this.dataObj.saveObj.cMaker = this.login.cPersonName;
      this.dataObj.saveObj.dCreateDate = new Date();
      this.dataObj.saveObj.sys_Account = {
        cAccUniqueID: this.account.cAccUniqueID,
        // cAccUniqueID: "pxy88cfd2f82f2c24002ada69cbb24382007"//this.account.cAccUniqueID
      };
      this.dataObj.saveObj.busi_Organzation = {
        cOrgUUID: this.current_org.cOrgUUID,
        // cOrgUUID: "x9s3fce1425b5c2341b5b64afb76f9f1481b"//this.login.cOrgUUID
      };
      // console.log(this.listOfData,this.dataObj.saveObj)
      this.http.post('/CNIC_M/ColumnManagement/saveNewsClass', this.dataObj).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
            this.getTree();
            this.event = null;
            this.msg.success(res.Result.cRsultInfo);
          } else {
            this.msg.error(res.Result.cRsultInfo);
          }
          this.reset();
        },
        () => {
          this.msg.error('请检查网络连接');
        },
      );
    } else {
      this.dataObj.saveObj.cModCode = this.login.cPersonCode;
      this.dataObj.saveObj.cModName = this.login.cPersonName;
      this.dataObj.saveObj.dModDate = new Date();
      this.dataObj.saveObj.cChoiceCode = this.listOfData.cChoice;
      this.dataObj.saveObj.sys_Account = {
        cAccUniqueID: this.account.cAccUniqueID,
      };
      this.dataObj.saveObj.busi_Organzation = {
        cOrgUUID: this.current_org.cOrgUUID,
      };
      this.http.post('/CNIC_M/ColumnManagement/updNewsClass', this.dataObj).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
            this.getTree();
            this.msg.success(res.Result.cRsultInfo);
          } else {
            this.msg.error(res.Result.cRsultInfo);
          }
          this.reset();
        },
        () => {
          this.msg.error('请检查网络连接');
        },
      );
    }
  }

  // 删除用户组
  delForm(): void {
    if (!this.event) {
      this.msg.warning('请选择要删除的栏目');
      return;
    }

    this.modalService.confirm({
      nzTitle: `确定要删除栏目'${this.event.node.origin.title}'吗?`,
      nzContent: '删除后将无法撤回该操作',
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.http.post('/CNIC_M/ColumnManagement/detNewsClass', { iWCSID: this.listOfData.iWCSID }).subscribe(
          (res: any) => {
            if (res.Result.iRsult === 1) {
              this.msg.success(res.Result.cRsultInfo);
              this.event = null;
              this.resetList();
              this.getTree();
            } else {
              this.msg.error(res.Result.cRsultInfo);
            }
          },
          () => {
            this.msg.error('请检查网络连接');
          },
        );
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  chooseModel(e: any) {
    this.listOfData.cChoice = e + '';
  }
  chooseType(e: any) {
    // console.log(e)
    this.listOfData.cType = e + '';
  }
  ngOnInit() {
    // this.validateForm = this.fb.group({
    //   cAccountCode: [null, [Validators.required]],
    //   cAccountName: [null, [Validators.required]],
    // });
  }
}
