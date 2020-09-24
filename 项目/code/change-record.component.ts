import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  selector: 'app-reserve-management-change-record',
  templateUrl: './change-record.component.html',
  styles: [
    `
      // ::ng-deep app-reserve-management-change-record .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
      //   color: #fff;
      //   background: #1890ff;
      //   border-radius: 0;
      // }
      // ::ng-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
      //   border-radius: 0;
      // }
      // ::ng-deep div.ant-card-head.ng-star-inserted {
      //   padding: 0 0;
      // }
      ::ng-deep nz-tabset .ant-tabs-bar {
        border: hidden;
      }
      ::ng-deep .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        text-align: center;
      }
      .strikethrough {
        text-decoration: line-through;
        color: #999999;
      }
    `,
  ],
})
export class ReserveManagementChangeRecordComponent implements OnInit {
  tabIndex: number = 0;
  nzPageIndex0: number = 1;
  nzPageSize0: number = 10;
  nzPageIndex1: number = 1;
  nzPageSize1: number = 10;
  loadingFlag = true;

  formdata = {
    inDate: new Date(),
    outDate: new Date(),
  };

  changeRecordIn = [];
  changeRecordOut = [];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private message: NzMessageService,
    private btnModal: NzModalService,
  ) {}

  ngOnInit() {
    // setTimeout(()=>{
    //   this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'))
    // },10);
    // if(this.current_org){
    //   this.add_del_Record.nGoUUID = this.current_org.cOrgUUID
    // };
    this.initdataIn();
    this.initdataOut();
    // console.log("this.current:",this.current_org)
  }
  // ngAfterContentInit(){
  //   setTimeout(()=>{
  //     this.switchOrgID()
  //   },1000)
  // }
  // current_org:any;
  accTemp = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  account = this.accTemp.account;
  COMMON_FIELD = {
    // 组织ID
    nGoUUID: this.accTemp.cOrgUUID,
    // 帐套ID
    caccuniqueId: this.account.cAccUniqueID,
    // 组织机构代码
    nGOCode: null,
    // 企业UUID
    companyUUID: null,
    // 企业名称
    companyName: null,
    // 统一社会信用代码
    companyCode: null,
    // 创建人
    creatorName: null,
    // 创建时间，单独Date不能取到数据
    createTime: new Date(),
    // 创建说明
    createReason: null,
  };

  add_del_Record = {
    // * 删除标识 0:删除，1：添加
    identifying: Number,
    ...this.COMMON_FIELD,
    // //企业名称模糊查询
    // companyPartName: '',
  };

  //未来时刻禁选
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  //检查空内容
  checkShow(resData: any) {
    for (let item of resData) {
      //for in is index.
      // console.log("itemDate:",item.createTime,typeof item.createTime)
      item.createTime = new Date(item.createTime);
      // item.strikeFlag = false;
      for (let key of Object.keys(item)) {
        if (item[key] === null) {
          item[key] = '无资料';
        }
      }
      // console.table(item)
    }
    resData.sort((x, y) => {
      return y.createTime.getTime() - x.createTime.getTime();
    });
  }

  initdataIn() {
    // if (reset) {
    //   this.nzPageIndex0 = 1;
    //   this.nzPageIndex1 = 1;
    // }
    this.loadingFlag = true;
    this.add_del_Record.createTime = this.formdata.inDate;
    this.http
      .post('/cnic-projectmanagement/inNaKuruManagementAction/getrecord', this.add_del_Record)
      // this.http.post('http://192.168.9.14:18081/cnic-projectmanagement/inNaKuruManagementAction/getrecord', this.add_del_Record)
      .subscribe((res: any) => {
        if (res.code === 1 && res.data !== null) {
          let cr = res.data.getrecord;
          this.checkShow(cr);
          this.changeRecordIn = cr.filter(i => i.identifying === 1);
          // this.changeRecordIn
          // console.log("initIn:",this.changeRecordIn,cr,this.add_del_Record,this.current_org)
          // tmpD = this.changeRecord.filter(i => new Date(i.createTime).getFullYear()===nowDate.getFullYear() && new Date(i.createTime).getMonth()===nowDate.getMonth())
          // console.log("res:",res,res.data,this.add_del_Record,"cr:",cr,this.loadingFlag)
          // identy===1 ? this.changeRecordIn = cr : this.changeRecordOut = cr;
          this.loadingFlag = false;
        } else {
          this.message.error(res.msg);
        }
      });
  }
  initdataOut() {
    this.loadingFlag = true;
    this.add_del_Record.createTime = this.formdata.outDate;
    this.http
      .post('/cnic-projectmanagement/inNaKuruManagementAction/getrecord', this.add_del_Record)
      .subscribe((res: any) => {
        if (res.code === 1 && res.data !== null) {
          let cr = res.data.getrecord;
          this.checkShow(cr);
          this.changeRecordOut = cr.filter(i => i.identifying === 0 || i.identifying === 2);
          // console.log("initOut:", this.changeRecordOut,cr)
          this.loadingFlag = false;
        } else {
          this.message.error(res.msg);
        }
      });
  }

  // 退回正式库
  showConfirm(index: number): void {
    let tmpObj = { ...this.changeRecordOut.slice(index, index + 1)[0] }; //深拷贝基础类型属性
    this.btnModal.confirm({
      nzTitle: `<i>确定要把"${tmpObj.companyName}"退回正式库吗?</i>`,
      nzOnOk: () => {
        // delete tmpObj.strikeFlag;
        tmpObj.creatorName = this.accTemp.cPersonName;
        this.http
          .post('/cnic-projectmanagement/inNaKuruManagementAction/getqueFormal', tmpObj)
          .subscribe((res: any) => {
            // console.log("回退",res,tmpObj,index,)
            if (res.code === 1 && res.data !== null) {
              this.changeRecordOut.slice(index, index + 1)[0].identifying = 2;
              tmpObj.createTime = new Date();
              if (
                this.formdata.inDate.getFullYear() === tmpObj.createTime.getFullYear() &&
                this.formdata.inDate.getMonth() === tmpObj.createTime.getMonth()
              ) {
                this.changeRecordIn.splice(0, 0, tmpObj);
              }
            } else {
              this.message.error(res.msg);
            }
          });
      },
    });
  }

  //按月份查询
  dataQuery(result: Date): void {
    this.loadingFlag = true;
    // console.log('onChange: ', result);
    // this.add_del_Record.createTime = result;
    if (this.tabIndex === 0) {
      if (this.formdata['inDate'] == undefined || this.formdata['inDate'] == null) {
        this.message.warning('请选择要查询的月份。');
        return;
      }
      this.formdata.inDate = new Date(result);
      this.initdataIn();
    } else if (this.tabIndex === 1) {
      if (this.formdata['outDate'] == undefined || this.formdata['outDate'] == null) {
        this.message.warning('请选择要查询的月份。');
        return;
      }
      this.formdata.outDate = new Date(result);
      this.initdataOut();
    }
    this.loadingFlag = false;
  }
  // switchOrgID(){
  //   this.add_del_Record.nGoUUID = this.current_org.cOrgUUID
  // }
}
