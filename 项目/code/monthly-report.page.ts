import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PickerService, PickerRef, ToastService } from 'ng-zorro-antd-mobile';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/login/login.service';
import { AppConfig } from '../../../app.config';
import { Router,ActivatedRoute } from '@angular/router';

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot } from '@angular/router';


// @Injectable()
// export class InitGuardService implements CanActivate {
//   constructor(
//     private router: Router,
//   ) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     // console.log("stateWhole:",state,route,this.router);
//     // if (state.url.includes('monthly-report')) {
//     //   // this.router.navigateByUrl('/tabs/workbench/allapp');
//     //   // console.log("initguard:canAcitivate():",init,"/main ")
//     //   // console.log("initguard:canAcitivate(state.url):",state,state.url)
//     //   return true;
//     // }
//     // if (!state.url.includes('monthly-report') ) {
//     //   // this.router.navigateByUrl('/tabs/workbench');
//     //   // console.log("initguard:canAcitivate(state.url):",state,state.url)
//     //   // console.log("initguard:canAcitivate():",init,"/setup ")
//     //   return true;
//     // }
//     // // console.log("initguard:canAcitivate():",init,"not /main or /setup")
//     // return true;
//   }
// }

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
})
export class MonthlyReportPage implements OnInit {
  private userInfo: any ;
  isShowForm = false;
  private picker: PickerRef;  // 必须在PickerService前面
  idlistsearch = {
    iType: 1,
    iUserID: null
  }
  // public starParent:number = 260;
  constructor(    
    private nav: NavController,
    private _picker: PickerService,
    private http: HttpClient,
    private loginserve: LoginService,
    private appConfig: AppConfig,
    private router: Router,
    private toast:ToastService,
    private route:ActivatedRoute
    ) { }

   // 表格参数
   dataObj = {
    iYuliu1: 1,//1为查询项目
    projectName: null,//项目名,传就筛选,不传就不筛选,
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
 
  listOfData = [];
  listOfDisplayData = [];
  // private cOrgUUIDArr = [];
  minVal:number;
  maxVal:number;

  // 当前时间对象
  nowDate = new Date()
  currentDateObj: any ={
    label:new Date().getUTCFullYear() +"年",
    value:new Date().getUTCFullYear()
  };

  //五个参照参数
  referObj:any;

  //查询条件-区域接口
  quYuData = [];

  //查询条件-行业接口
  hangYeData = [];

  //查询条件-属地接口
  shuDiData = [];

  //查询条件-产业接口
  chanYeData = [];

  //查询条件-园区接口
  yuanQuData = [];

  getRefer(cReferCode,error?) {
    this.referObj.cReferCode = cReferCode; //万能的any
    // console.log("error:",this.appConfig.microSeverStr,this.referObj.cReferCode)
    this.http.post(this.appConfig.microSeverStr+'/cnic-dcas/PubBaseAction/getReferListData', this.referObj)
      .subscribe((res: any) => {
      if (res.Result.iRsult === 1) {
        // console.log("cReferCode!!!!!!!!!!!!!:",res)
        if (cReferCode === 'District1') {
          this.quYuData = res.listData;
        }
        if (cReferCode === 'Trade') {
          this.hangYeData = res.listData;
        }
        if (cReferCode === 'Possession') {
          this.shuDiData = res.listData;
        }
        if (cReferCode === 'Estate') {
          this.chanYeData = res.listData;
        }
        if (cReferCode === 'Garden') {
          this.yuanQuData = res.listData;
        }
      }else{
        this.toast.show(res.msg);
      }
    },
    // (err: any) => {
    //       error(err);
    //   },
    );
  }

  //项目提报单位
  DW = [];
  getDW(error?) {
    this.http
      .post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/getSetActivePlanePrivate', {
        cSetActivePlaneUUID: '0D9951733CCA49E286F8DFF56BE123DD',
      })
      .subscribe((val: any) => {
        // console.log("项目提报单位：",val.data)
        if (val.code === 1) {
          this.DW = val.data;
        } else {
          this.DW = [];
          this.toast.show(val.msg);
        }
      },
    //   (err: any) => {
    //     error(err);
    // }
    );
  }
  //项目类别
  xmlbData = ['新建项目', '续建项目'];

  //月报状态
  ybztData = ['未上报', '未审核', '已审核'];
  //自定义分类参照
  classRefer = [];
  getClassRefer(error?) {
    this.http
      .post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/getIndustryCodeDictionary', {
        cAccUniqueID: this.userInfo.account.cAccUniqueID
      })
      .subscribe((res: any) => {
        // console.log("自定义分类：",res.data)
        if (res.code === 1) {
          this.classRefer = res.data;
        } else {
          this.classRefer = [];
          this.toast.show(res.msg);
        }
      },
      // (err: any) => {
      //   error(err);
      //   }
     );
  } 

  toggleForm(){
    this.isShowForm = !this.isShowForm
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
      //  console.log("ccOrg1:",res.data,this.dataObj.listCirganizationUUID)
      } else {
        // console.log("idlisthttp失败1:",this.dataObj)
        this.toast.show(res.msg);
      }
    });    
  }
  // // 通过菜单code和id获取组织信息
  // getOrgListInfo(cMenuCode: string, iMenuID: number, success?, error?){
  //   const map = {
  //     bManage: 0,
  //     bLeaseAdmin: this.userInfo.bLeaseAdmin,
  //     cAccUniqueID: this.userInfo.account.cAccUniqueID,
  //     iSysID: this.userInfo.account.iSysID,
  //     cMenuCode: cMenuCode,
  //     iMenuID: iMenuID,
  //   }
  //   // 调用登录服务api
  //   this.http.post(this.appConfig.microSeverStr+'/cnic-auth/ZwzqAction/getShowOrgs', map).subscribe(
  //     (res: any) => {
  //       // console.log("getOrg:",res)
  //       success(res);
  //     },
  //     // (err: any) => {
  //     //   error(err);
  //     // },
  //   );
  // }

  //获取菜单数据
  getData(error?){
    if((typeof this.maxVal)!=="number" || (typeof this.minVal)!=="number"){
      this.dataObj.cParentUUID = null;
    }else if (this.maxVal >= 0 && this.minVal >= 0 && this.maxVal > this.minVal) {
      this.dataObj.cParentUUID = this.minVal + ',' + this.maxVal;
    } else {
      this.dataObj.cParentUUID = null;
    }
    
    if (!this.dataObj.projectName) {
      this.dataObj.projectName = null;
    }
    // this.dataObj.listCirganizationUUID = [];
    // // console.log("private:",this.cOrgUUIDArr)
    // if (this.cOrgUUIDArr === null) {
    //   this.dataObj.listCirganizationUUID.push(this.userInfo.cOrgUUID)
    // } else {
    //   for (let i = 0; i < this.cOrgUUIDArr.length; i++) {
    //     this.dataObj.listCirganizationUUID.push(this.cOrgUUIDArr[i].cOrgUUID);
    //   }
    // }
    if(this.dataObj.listCirganizationUUID.length === 0){
      this.dataObj.listCirganizationUUID.push(this.userInfo.cOrgUUID)
    }
    // console.log("dataObj1:",this.dataObj)
    this.http.post(this.appConfig.microSeverStr+'/cnic-projectmanagement/AddAndUpdateProjectAction/selectProjectShenJian', this.dataObj)
    .subscribe(
      (res: any) => {
        // console.log("resJSON:",JSON.stringify(res),res);
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
          // console.log("res1:",res,this.listOfData)
        }else {
          this.listOfData = [];
          this.listOfDisplayData = [...this.listOfData];
          this.toast.show(res.msg);
        }
      },
      // (err: any) => {
      //   error(err);
      // },
    )
  }

  //重置数据
  resetData() {
    this.dataObj = {
      iYuliu1: 1,//1为查询项目
      projectName: null,//项目名,传就筛选,不传就不筛选,
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

    this.minVal = null;
    this.maxVal = null;
    delete this.currentDateObj.children;
    // console.log()
    this.getData();
  }

  //日期选择
  showDatePicker() {
    let dateArray = [];
    // 年数组
    let yy = new Date().getUTCFullYear();
    let yearArray = [];
    // 向前十年
    for (let index = 0; index <= 10; index++) {
      yearArray.push({
        label: (yy - index) + "年",
        value: yy - index
      })
    }
    let mothArray = [];
    let mArray = []
    for (let index = 1; index <= 12; index++) {
      mArray.push({
        label: index + "月",
        value: index
      })
    }
    yearArray.forEach(element => {
      mothArray.push({
        label: element.label,
        value: element.value,
        children: mArray
      });
    });
    dateArray = mothArray;
    // console.log("时间:",dateArray,yearArray)
    this.picker = this._picker.showPicker(
      { value: [], data: dateArray,title:'请选择' },
      result => {
        // console.log("resdata:",result,dateArray)
        if(result.length > 1){
          result[0]['children'] = result[1];
        }
        if(result[0].value === this.nowDate.getFullYear() && result[1].value>(this.nowDate.getMonth()+1)){
          result[1].value = this.nowDate.getMonth()+1;
          result[1].label = result[1].value+"月";
          result[0].children.value = result[1].value;
          result[0].children.label = result[1].value+"月";
        }
        this.currentDateObj = result[0];
        this.dataObj.dYuliu7 = new Date(`${this.currentDateObj.value}-${this.currentDateObj.children.value}`)
 
        this.getData()
        // console.log("result:",this.dataObj.dYuliu7,result,this.currentDateObj,this.currentDateObj.children.label)
      },
      cancel => {
        // console.log('cancel');
      }
    );
  }
  
  navProject(projectObj) {
    let tPro = projectObj.project
    let tmpPro = {yueBao:projectObj.yueBao,selectedDate:new Date(this.dataObj.dYuliu7),...tPro}
    // console.log("navPro1:",projectObj,tmpPro)
    this.router.navigate(['/gov/project/monthly-report/projectfilling'], 
        {queryParams:tmpPro});
  }

  back(){
    if (this.isFromProFill) {
      this.nav.navigateBack('/tabs/workbench/allapp');
    } else {
      window.history.back();
    }
  }

  // private tempOrg = JSON.parse(window.localStorage.getItem('userInfoOrg'));

  isFromProFill:boolean = false;
  ngOnInit() {
    // console.log("localStorage:",this.tempOrg)
    this.route.queryParams.subscribe(params => {
      if(params.isFromProFill){
        this.isFromProFill = params.isFromProFill;
      }
    });
    this.userInfo = this.loginserve.getOrgUserInfo();
    this.idlistsearch.iUserID = this.userInfo.iUserID;
    // console.log("ngOnInit,userInfo:",this.userInfo)
//     this.getOrgListInfo(
//       // '023101',
//       // 5090,

// //       11494	1		3202		月报统计
// // 11493	1		3201		项目月报
//       '11493',
//       3201,
//       (res: any) => {
//         this.cOrgUUIDArr = res.data;
//         // console.log("cOrgUUIDArr:",this.cOrgUUIDArr)
//         this.getData();
//       },
//       (err: any) => {},
//     );
    this.idlisthttp();
    this.referObj = {
      pageSize: 100000,
      pageNumber: 1,
      pageLoadNumber: 1,
      formFilter: '',
      iOrgID: this.userInfo.iOrgID,
      iSysID: this.userInfo.account.iSysID,
      cAccUniqueID: this.userInfo.account.cAccUniqueID,
      cOrgUUID: this.userInfo.cOrgUUID,
      iTradeID: this.userInfo.account.iTradeID,
      cReferCode: '',
      listFilter: '',
    }
    //区域
    this.getRefer('District1');
    //行业
    this.getRefer('Trade');
    //属地
    this.getRefer('Possession');
    //产业
    this.getRefer('Estate');
    //园区
    this.getRefer('Garden');
    this.getClassRefer();
    this.getDW()
    this.getData();

  }
}
