import { Component, OnInit,Input } from '@angular/core';
import { NavController , Platform } from '@ionic/angular';
import {  ToastService} from 'ng-zorro-antd-mobile';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { LoginService } from '.././../../../services/login/login.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projectfilling',
  templateUrl: './projectfilling.page.html',
  styleUrls: ['./projectfilling.page.scss'],
})
export class ProjectfillingPage implements OnInit { 
  listOfData = [];
  listOfDisplayData = [];
  maxDate = new Date();
  minDate = new Date();
  projectObj : any;
  private userInfo: any;
  // @Input() starTest:number;

  // 已审核
  isReviewed = false;
  constructor( 
    private nav: NavController,
    private appConfig: AppConfig,
    private loginserve: LoginService,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    ) {     }

  // 切换框
  private isCheck = true;
  idlistsearch = {
    iType: 1,
    iUserID: null
  } 

   // 表格参数
   dataObj = {
    iYuliu1: 1,//1为查询项目
    projectName: null,//项目名,传就筛选,不传就不筛选,
    projectUUID:null,
    dYuliu7: new Date(),//时间,传就筛选,不传就不筛选,
    administrativeRegion: null,//行政区域,传就筛选,不传就不筛选,
    affiliatedUnit: null,//所属单位(乡镇),传就筛选,不传就不筛选,
    industry: null,//行业,传就筛选,不传就不筛选,
    industryCC: null,//产业,传就筛选,不传就不筛选,
    garden: null,
    projectClassification: null,
    monthlyState: null,
    listCirganizationUUID: [],//该账户下所有组织,字符串数组
    cSubclass:null,//--行业编码
    cReportToDepartment:null,//--项目提报单位
    cAccountabilityUnit:null,//--责任单位
    cCustomCategories:null,//--自定义类别
    cParentUUID:null,//--总投资区间
  };
  
  //上报obj
  reportObj = {
    panDuan: null, //2上报 3修改 4删除
    projectUUID: null, //项目uuid
    annualInvestment: null, //年度累计投资
    accumulativeInvestment: null, //累计完成投资
    currentImageProgress: null, //形象进度
    projectIssueDescribe: null, //存在的问题及困难
    projectMonthInvestment: null, //本月完成投资
    monthly: null, //月
    monthlyUser: null,//this.userInfo.cPersonName, //填报人
    monthlyMagazineUUID: null, //月报uuid
  };

  ngOnInit() {
    // console.log("filling:",this.nav)
    this.route.queryParams.subscribe(params => {
      this.projectObj = params;
      console.log("queryParams2:",params,this.projectObj);
      if (params.projectUUID) {
        this.searchObj.projectUUID = this.projectObj.projectUUID;
        this.dataObj.projectName = this.projectObj.projectName;
        this.dataObj.dYuliu7 = new Date(this.projectObj.selectedDate);
        this.value = this.dataObj.dYuliu7;
        this.reportObj.projectUUID = this.projectObj.projectUUID;
        this.getinitbuild();
      }
      if(params.transDateStatus){
        this.value = new Date(params.transDateStatus)
        this.searchObj.projectUUID = this.projectObj.transProUUID;
        this.dataObj.projectUUID = this.projectObj.transProUUID;
        this.reportObj.projectUUID = this.projectObj.transProUUID;
        this.dataObj.dYuliu7 = new Date(this.value);
        this.getinitbuild();
      }
      if(this.value.getFullYear()<new Date().getFullYear()){
        this.maxDate = new Date(this.value.getFullYear()+"-12-31:00:00:00")
      }else {
        this.maxDate = new Date()
      }
      this.minDate = new Date(this.maxDate.getFullYear()+"-01-01:00:00:00")

      this.PUUID = this.projectObj.projectUUID;
      if(params.transProUUID){
        this.PUUID = params.transProUUID
      }
      this.YB = this.projectObj.yueBao;
      // console.log(this.YB,this.PUUID)
      // console.log("max,minDate2:",this.maxDate,this.minDate,this.value)
    });
    this.userInfo = this.loginserve.getOrgUserInfo();
    this.idlistsearch.iUserID = this.userInfo.iUserID;
    this.reportObj.monthlyUser = this.userInfo.cPersonName;
    // console.log("ngOnInit2,userInfo2:",this.userInfo,this.idlistsearch);
    this.idlisthttp();
    setTimeout(()=>{
      this.getData();
    },400);
    // this.route.queryParams.subscribe(queryParams => {
    //   // console.log(queryParams);
    //   // 查询项目ID 赋值
    //   this.searchObj.projectUUID = queryParams.projectUUID;
    // });
    // 获取项目的审批 建设流程
    this.getinitbuild();
  }

  /**
   * 点击tab事件
   * @param index tab索引 1 :日程 2 ：待办
   */
  clickTab(tabIndex) {
    if (tabIndex === 1) {
      this.isCheck = true;
    } else if(tabIndex === 2){
      this.isCheck = false;
    }
    // this.getData();
    // this.reset()
  }

  // 审批线数据
  Approval = [];
  // 建设线数据
  build = [];
  // 查询参数 
  searchObj = {
    iYuliu1: null, // 2 为查看某个项目的审批线和建设线,
    projectUUID: null, // 项目UUID,
  }; 

  // 获取项目状态  审批线 建设线
  getinitbuild() {
    this.searchObj.iYuliu1 = 2;
    this.http.post(this.appConfig.microSeverStr + '/cnic-projectmanagement/AddAndUpdateProjectAction/selectProjectShenJian', this.searchObj)
    .subscribe((res: any) => {
      if (res.code === 1) {
        this.Approval = res.data.shenPi;
        this.build = res.data.jianShe;
        // console.log("shenp,jianshe:",this.Approval,this.build)
      } else {
        this.toast.show(res.msg);
      }
    });
  }

  // 根据流程跳转状态(项目UUID，审批建设标识，当前日期)
  jump(data: any, id: any, valDate: any) {
    data = JSON.stringify(data);
    this.router.navigate(['/gov/project/monthly-report/project-status'], {queryParams: {data, id, valDate}});
  }

  // 日期时间
  name = '月报时间:';
  value = new Date();

  // 时间处理
  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk(result: Date) {
    this.dataObj.dYuliu7 = result;
    this.value = result;
    this.getData();
  }

  formatIt(date: Date, form: string) {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${dateStr} ${timeStr}`;
  }


  // 返回
  back() {
    this.reset();
    this.router.navigate(['/gov/project/monthly-report'], {queryParams: {isFromProFill:true}});
    // this.nav.back()
    // window.history.back(-2)
  }

  // 重置
  reset(){
    this.dataObj = {
      iYuliu1: 1,//1为查询项目
      projectName: null,//项目名,传就筛选,不传就不筛选,
      projectUUID:null,
      dYuliu7: new Date(),//时间,传就筛选,不传就不筛选,
      administrativeRegion: null,//行政区域,传就筛选,不传就不筛选,
      affiliatedUnit: null,//所属单位(乡镇),传就筛选,不传就不筛选,
      industry: null,//行业,传就筛选,不传就不筛选,
      industryCC: null,//产业,传就筛选,不传就不筛选,
      garden: null,
      projectClassification: null,
      monthlyState: null,
      listCirganizationUUID: [],//该账户下所有组织,字符串数组
      cSubclass:null,//--行业编码
      cReportToDepartment:null,//--项目提报单位
      cAccountabilityUnit:null,//--责任单位
      cCustomCategories:null,//--自定义类别
      cParentUUID:null,//--总投资区间
    };
    this.projectObj =null;
    this.value = new Date();
    this.isReviewed = false;
    this.reportObj = {
      panDuan: null, //2上报 3修改 4删除
      projectUUID: null, //项目uuid
      annualInvestment: null, //年度累计投资
      accumulativeInvestment: null, //累计完成投资
      currentImageProgress: null, //形象进度
      projectIssueDescribe: null, //存在的问题及困难
      projectMonthInvestment: null, //本月完成投资
      monthly: null, //月
      monthlyUser: null,//this.userInfo.cPersonName, //填报人
      monthlyMagazineUUID: null, //月报uuid
    };
  }

  // 获取组织数组
  idlisthttp() {
    this.http.post(this.appConfig.microSeverStr+'/cnic-auth/ZwzqAction/getShowOrgs', this.idlistsearch)
    .subscribe((res: any) => {
      // console.log(res);
      if ( res.code === 1) {
       this.dataObj.listCirganizationUUID = res.data.map((item: any) => {
         return item.cOrgUUID;
       });
      //  console.log("ccOrg2:",res.data,this.dataObj.listCirganizationUUID)
      } else {
        console.log("idlisthttp失败:",this.dataObj)
        this.toast.show(res.msg);
      }
    });    
  }

  paraUUID : any;
  monthIndex : any;

  //获取菜单数据
  getData(){
    this.isReviewed = false
    
    if (!this.dataObj.projectName) {
      this.dataObj.projectName = null;
    }
    if(this.dataObj.listCirganizationUUID.length === 0){
      this.dataObj.listCirganizationUUID.push(this.userInfo.cOrgUUID)
    }
    // console.log("dataObj2:",this.dataObj);
    this.http.post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/selectProjectShenJian', this.dataObj)
    .subscribe(
      (res: any) => {
        if (res.code === 1) {
          if (res.data) {
            for (let i = 0; i < res.data.wanZheng.length; i++) {
              res.data.wanZheng[i].project.startOrEndTime = JSON.parse(res.data.wanZheng[i].project.startOrEndTime);
              res.data.wanZheng[i].project.pubufts = res.data.wanZheng[i].project.pubufts.slice(0, 10);
            }
            this.listOfData = res.data.wanZheng;
          } else {
            this.listOfData = [];
          }
          this.listOfDisplayData = [...this.listOfData];
          // console.log("res2:",res,this.listOfDisplayData,this.listOfDisplayData[0])
          let review = ""
          if(this.listOfDisplayData[0]){
            review = this.listOfDisplayData[0].yueBao;
          }else{
            review = this.projectObj.yueBao
          }
          if(review === "已审核"){
            this.isReviewed = true;
          }else if(review === "未审核"){
             this.reportObj.panDuan =3 ;  //修改
          }else if(review === "未上报"){
              this.reportObj.panDuan =2 ;  //上报
          }
          // console.log("review:",review,this.isReviewed)
        }else {
          this.listOfData = [];
          this.listOfDisplayData = [...this.listOfData];
          this.toast.show(res.msg);
        }
      },
      // (err: any) => {
      //   error(err);
      // },
    );
    this.paraUUID = this.listOfDisplayData[0]?this.listOfDisplayData[0].project.projectUUID:this.projectObj.projectUUID
    this.monthIndex = this.value.getMonth()
    // console.log("send To monthClick():",this.paraUUID,this.monthIndex)
    setTimeout(()=>{
      this.monthClick(this.paraUUID,this.monthIndex)
    },10)
  }

  //获取12个月状态
  allMonthData = [];
  //单击月
  monthClick(uuid,index) {
    // console.log("receive:",uuid,index)
    this.http
    .post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/selectProjectShenJian', {
      iYuliu1: 3,
      projectUUID: uuid,
    })
      .subscribe(
        (res: any) => {
          // console.log(JSON.stringify(res));
          if (res.code === 1) {
            this.allMonthData = res.data;
            // console.log("allMonthData2:", this.allMonthData, res)
            let id = this.allMonthData[index].monthlyMagazineUUID // 所选月份UUID
            this.reportObj.monthly = index + 1;
            //选择月份修改
            if (id) {
              this.reportObj.panDuan = 3;
              this.reportObj.monthlyMagazineUUID = id;
              this.http
                .post(this.appConfig.microSeverStr + '/cnic-projectmanagement/AddAndUpdateProjectAction/selectSingleMonthlyReport', {
                  monthlyMagazineUUID: id,
                })
                .subscribe(
                  (val: any) => {
                    if (val.code === 1) {
                      this.isReviewed = val.data[0].iYuliu2 === 1;
                      this.reportObj.projectMonthInvestment = val.data[0].projectMonthInvestment;
                      this.reportObj.annualInvestment = val.data[0].annualInvestment;
                      this.reportObj.accumulativeInvestment = val.data[0].accumulativeInvestment;
                      this.reportObj.currentImageProgress = val.data[0].currentImageProgress;
                      this.reportObj.projectIssueDescribe = val.data[0].projectIssueDescribe;
                      // console.log("reportObj2:", this.reportObj, val);
                    } else {
                      // console.log("no reportObjIF?",val);
                      this.toast.show(val.msg);
                    }
                  },
                  () => {
                    // this.msg.error('请检查网络连接');
                  },
                );
            } else {
              //上报
              this.reportObj.panDuan = 2;
              this.reportObj.projectMonthInvestment = null;
              this.reportObj.annualInvestment = null;
              this.reportObj.accumulativeInvestment = null;
              this.reportObj.currentImageProgress = null;
              this.reportObj.projectIssueDescribe = null;
              this.isReviewed = false;
              // console.log("no reportObjelse?");
            }
          } else {
            this.toast.show(res.msg);
          }
        },
        () => {
          // this.msg.error('请检查网络连接');
        },
      );
    
  }

  YB:any = null;
  PUUID:any = null;
  //保存月报
  saveReport() {
    
    if (!this.reportObj.projectMonthInvestment ) {
      this.toast.show('请输入本月完成投资');
      return;
    }
    if (!this.reportObj.annualInvestment ) {
      this.toast.show('请输入年度累计投资');
      return;
    }
    if (!this.reportObj.accumulativeInvestment ) {
      this.toast.show('请输入累计完成投资');
      return;
    }
    if (!this.reportObj.projectIssueDescribe || !this.reportObj.projectIssueDescribe.replace(/\s*/g, '')) {
      this.toast.show('请输入存在的问题及困难');
      return;
    }
    if (!this.reportObj.currentImageProgress || !this.reportObj.currentImageProgress.replace(/\s*/g, '')) {
      this.toast.show('请输入形象进度');
      return;
    }
    if (this.reportObj.projectMonthInvestment < 0) {
      this.toast.show('本月完成投资不能为负数');
      return;
    }
    if (this.reportObj.annualInvestment < 0) {
      this.toast.show('年度累计投资不能为负数');
      return;
    }
    if (this.reportObj.accumulativeInvestment < 0) {
      this.toast.show('累计完成投资不能为负数');
      return;
    }
    this.http.post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/updateShenJian', this.reportObj).subscribe(
      (res: any) => {
        // console.log('区域' + JSON.stringify(res));
        if (res.code === 1) {
          this.toast.show('上报成功')
          // this.msg.success(res.msg);
          // this.getAllMonthData(this.reportObj.projectUUID, this.reportObj.monthly - 1);
          // console.log("getReport2:",res);
          // this.monthClick(this.reportObj.projectUUID, this.reportObj.monthly - 1);
          this.getData();
          // this.nav.back();
    this.router.navigate(['/gov/project/monthly-report'], {queryParams: {isFromProFill:true,YB:this.YB,PUUID:this.PUUID}});
    // location.reload();

        } else {
          // this.msg.error(res.msg);
          this.toast.show(res.msg);
        }
      },
      () => {
        // this.msg.error('请检查网络连接');
      },
    );
  }


}
