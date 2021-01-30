import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/table';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-market-value-target-indexrelease',
  templateUrl: './indexrelease.component.html',
})
export class MarketValueTargetIndexreleaseComponent implements OnInit {
  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));

  // 时间
  date = new Date();
  // 指标状态
  industrytype = [
    {name:'已发布',value:1},
    {name:'未发布',value:0},
    {name:'无需发布',value:2},
  ];

  // 表格数据
  list = [];
  // 表格宽度
  xlength = null;
  // 表格多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  // 新增 删除 模态
  isVisible = false;
  nzTitle = null; // 模态标题
  indexname = null; // 指标名称
  index = null; // 指标序号
  indexweight = null; // 考核权重
  indexstan = null; // 考核标准
  indexdep = ''; // 责任部门
  indexobj = ''; // 考核对象
  indexIyear = null; // 指标年份
  radioValue = "是" // 是否末级标识


  // 责任部门 对象 参照模态
  isVisible1 = false;
  objTitle = null; // 模态标题名称
  objdata = []; // 责任部门
  objdata1 = []; // 分管领导

  // 文件列表
  fileList = [];
  inputDisable = true;
  // 查询参数
  searchObj = {
    cIndexUUID: null, // "指标UUID,如果传null则为查询全部末级指标",
    iStite: null, // "计划上报状态标识,1未上报，5未审核,6审核通过,7驳回",
    iRelease: null, // "1发布,0未发布,2无需发布",
    dMkdir: null, // "指标年份",
    cIndexName: null, // "指标名",
    iIndexType: 1, // "1市考,2省考,3省考落后",
    cAccUniqueID: this.account.cAccUniqueID, // "帐套唯一标识"
  }

  constructor(
    private http: _HttpClient, 
    private modal: ModalHelper,
    private msg: NzMessageService,
    ) { }

  ngOnInit() {
    // 调取查询
    this.search();
  }

   // 查询
   search(){
     // 指标年份
     if(this.date !== null ){
       this.searchObj.dMkdir =  this.date.getFullYear();
     }
     if(this.searchObj.iRelease !== null){
       // tslint:disable-next-line: radix
       this.searchObj.iRelease = parseInt(this.searchObj.iRelease)
     }
     this.list = [];
     this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexSel',this.searchObj).subscribe((res) => {
      // console.log(res);
        if(res.code === 200 && res.data !== null){
          this.list = res.data;
        }else if( res.code === 200 && res.data === null){
          this.list = [];
          this.msg.warning('暂无数据');
        }else{
          this.list = [];
          this.msg.warning(res.msg);
        }
     })
   }


  // 日期选择
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  // 批量发布
  Batchrelease(num){
   console.log(this.mapOfCheckedId);
    if (Object.keys(this.mapOfCheckedId).length === 0) {
      this.msg.warning('请选择数据!');
      return;
    } else {
      const cmm = Object.values(this.mapOfCheckedId);
      let ckk = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < cmm.length; i++) {
        if (cmm[i] === false) {
          ckk += 1;
        }
      }
      if (ckk === cmm.length) {
        this.msg.warning('请选择数据!');
        return;
      }
    }
    const keys = [];
    // tslint:disable-next-line: forin
    for (const key in this.mapOfCheckedId) {
      if (this.mapOfCheckedId[key]) {
        keys.push(key);
      }
    }
    // console.log(keys);
    if(num === 1){
      this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexIssue',{listIndex:keys}).subscribe((res) => {
        // console.log(res)
        if(res.code === 200){
          this.msg.success(res.msg);
          this.mapOfCheckedId = {}; 
          this.search();
        }else{
          this.msg.warning(res.msg);
        }
      })
    }
    if(num === 2){
      this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexIssueNo',{listIndex:keys}).subscribe((res) => {
        // console.log(res)
        if(res.code === 200){
          this.msg.success(res.msg);
          this.mapOfCheckedId = {}; 
          this.search();
        }else{
          this.msg.warning(res.msg);
        }
      })
    }
  }


  // 表格多选控制
  currentPageDataChange($event): void {
  this.listOfDisplayData = $event;
  this.refreshStatus();
}

refreshStatus(): void {
  if(this.listOfDisplayData.length > 0){
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.cIndexUUID]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.cIndexUUID]) && !this.isAllDisplayDataChecked;
  }
}

checkAll(value: boolean): void {
  this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.cIndexUUID] = value));
  this.refreshStatus();
}

  // 查看
  add(data:any){
    // console.log(data);
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexBend',{cIndexUUID:data.cIndexUUID}).subscribe((res) => {
      console.log(res);
      if(res.code === 200){
        this.fileList = [];
        this.indexname = res.data[0].cIndexName; // 指标名称
        this.index = res.data[0].iOrder; // 序号
        this.radioValue = res.data[0].bEnd.toString(); // 末级标识
        this.indexweight = res.data[0].deScore; // 考核权重
        this.indexstan = res.data[0].cEvaluation; // 考核标准
        const tmp: any = [...res.data[0].wenJian]; // 文件列表
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
      }}
      // 责任部门
      this.indexdep = '';
      // tslint:disable-next-line:prefer-for-of
      for(let i=0;i<res.data[0].zeRen.length; i++){
        this.indexdep +=  res.data[0].zeRen[i].cOrgName + ','
      }
      // 考核对象 
      this.indexobj = '';
      // tslint:disable-next-line:prefer-for-of
      for(let i=0;i<res.data[0].kaoHe.length; i++){
        this.indexobj +=  res.data[0].kaoHe[i].cOrgName + ','
      }
      this.indexIyear = res.data[0].dMkdir; // 指标年份
    })
    this.isVisible = true;
  }
  handleCancel(){
    this.isVisible = false;
  }
  handleOk(){
    this.isVisible = false;
  }

  // 禁用文件删除按钮
  remove = (file: UploadFile) => false;
   // 文件变动监听
   beforeUpload = (file: UploadFile): boolean => {
    // this.fileList = this.fileList.concat({ name: file.name, uid: file.uid });
    this.fileList = this.fileList.concat(file);
    return false;
  };
  
  // 指标发布
  confirm(data){
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexIssue',{listIndex:[data]}).subscribe((res) => {
      console.log(res);
      if(res.code === 200 ){
        this.msg.success(res.msg);
        this.search();
      }else{
        this.msg.warning(res.msg);
      }
    })
  }
  cancel(){}
  // 指标取消发布
  confirm1(data){
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getIndexIssueNo',{listIndex:[data]}).subscribe((res) => {
      console.log(res);
      if(res.code === 200 ){
        this.msg.success(res.msg);
        this.search();
      }else{
        this.msg.warning(res.msg);
      }
    })
  }

  // 考核对象参照
  obj(num:any){
    // tslint:disable-next-line:prefer-conditional-expression
    if(num === 1){
      this.objTitle = "责任部门";
    }else{
      this.objTitle = "考核对象"
    }
    this.isVisible1 = true;
    this.objdata= [
      {name:"市发改委"},
      {name:"市财政局"},
      {name:"市工信局"},
      {name:"市统计局"},
      {name:"市商务局"},
      {name:"市委组织部"},
      {name:"市地方金融监管局"},
      {name:"市消防救援支队"},
    ];
    this.objdata1 = [
      {name:'霍昌晖'},
      {name:'霍昌晖1'},
      {name:'霍昌晖2'},
      {name:'霍昌晖3'},
      {name:'霍昌晖4'},
      {name:'霍昌晖5'},
    ]
  }
  handleCancel1(){ this.isVisible1 = false }
  handleOk1(){
    this.isVisible1 = false;
  }



}