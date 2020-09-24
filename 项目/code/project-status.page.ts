import { Component, OnInit, HostListener, Directive, } from '@angular/core';
import { NavController , Platform } from '@ionic/angular';
import {  ToastService} from 'ng-zorro-antd-mobile';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { LoginService } from '.././../../../services/login/login.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { fromEvent } from 'rxjs';

// @Directive({selector: 'input[trim]'})
// @Directive({selector: 'a[exput]'})

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.page.html',
  styleUrls: ['./project-status.page.scss'],
})
export class ProjectStatusPage implements OnInit {

  constructor(
    private nav: NavController,
    private appConfig: AppConfig,
    private loginserve: LoginService,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    private fileChooser: FileChooser
  ) { }

  // 日期时间
  name1 = '开始时间:';
  value1 = new Date();
  name2 = '结束时间:';
  value2 = new Date();
  value3 = new Date();
  
  singleArea = [
    '已办理',
    '未办理',
    '正在办理',
    '无需办理',
  ];
  name = '请选择';
  value = [];
  // 存储状态
  state = [];
  // 传入类型/ 审批/建设
  id = '';
  // 保存参数
  searchObj = {
  panDuan: null, // 1为审批线及建设线状态变更,
  newProcessUUID: null, // 线UUID,
  gaiS: null, // 改的是审批线还是建设线,1审批线,2建设线,
  statusCode: null, // 状态码(1未办理,2已办理,3正在办理,4无需办理)
  AccessoryAddress: null, // 计划附件地址(链接),传就改不传就不改哦,
  fileUUID: null, // 文件自有UUID,传就改不传就不改哦,
  cDocumentName: null, // 附件名称,传就改不传就不改哦,
  cUpDocumentName: null, // 文件夹名称,传就改不传就不改哦,
  cDocumnetType: null, // 附件类型,传就改不传就不改哦,
  fileCode: null, // 文件code,传就改不传就不改哦,
  dStartTime: null, // 开始时间,传就改不传就不改哦,
  dEndTime: null, // 结束时间,传就改不传就不改哦,
  };

  // 传来的日期
  transDate = new Date();
  
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      // console.log(queryParams);
      this.id = queryParams.id;
      this.state.push(JSON.parse(queryParams.data));
      this.transDate = queryParams.valDate;
      // console.log( "ngOnInit=>queryParams", this.state,this.transDate);
      const data = JSON.parse(queryParams.data);
      const arr = [];
      arr.push(data.stateDescription);
      console.log(data);
      // 状态
      this.onOk(arr);

      // 开始时间 -- 已办理
      if (data.dStartTime === null) {
        this.onOk1(new Date());
      } else {
      const startime = new Date(data.dStartTime);
      this.onOk1(startime);
      }
      // 结束时间 -- 已办理
      if (data.dEndTime === null) {
        this.onOk2(new Date());
      } else {
        const endtime = new Date(data.dEndTime);
        this.onOk2(endtime);
      }

      // 开始时间 -- 正在办理
      if (data.dStartTime === null) {
        this.onOk3(new Date());
      } else {
        const startime = new Date(data.dStartTime);
        this.onOk3(startime);
      }

    });

  }

  onOk(result) {
    // console.log(result);
    this.name = this.getResult(result);
  }
  getResult(result) {
    this.value = [];
    let temp = '';
    result.forEach(item => {
      this.value.push(item.label || item);
      temp += item.label || item;
    });
    return this.value.map(v => v).join(',');
  }


  // 正在办理 -- 时间处理
    // 时间处理 -- 开始时间
    currentDateFormat3(date, format: string = 'yyyy-mm-dd HH:MM'): any {
      const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
      return format
        .replace('yyyy', date.getFullYear())
        .replace('mm', pad(date.getMonth() + 1))
        .replace('dd', pad(date.getDate()))
        .replace('HH', pad(date.getHours()))
        .replace('MM', pad(date.getMinutes()))
        .replace('ss', pad(date.getSeconds()));
    }
  
    onOk3(result: Date) {
      // this.serchobj.dYuliu7 = result;
      this.value3 = result;
    }
  
    formatIt3(date: Date, form: string) {
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

  // 时间处理 -- 开始时间
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

  onOk1(result: Date) {
    // this.serchobj.dYuliu7 = result;
    this.value1 = result;
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

  // 时间处理 -- 结束时间
  currentDateFormat2(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk2(result: Date) {
    // this.serchobj.dYuliu7 = result;
    this.value2 = result;
  }

  formatIt2(date: Date, form: string) {
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

  // 保存
  submit() {
    // alert('你好');
    // return;
    this.searchObj.panDuan = 1;
    this.searchObj.newProcessUUID = this.state[0].newProcessUUID;
    this.searchObj.gaiS = this.id;
    
    if (this.name === '未办理') {
      this.searchObj.statusCode = 1;
    }
    if (this.name === '已办理') {
      this.searchObj.statusCode = 2;
      this.searchObj.dStartTime = this.value1;
      this.searchObj.dEndTime = this.value2;

    }
    if (this.name === '正在办理') {
      this.searchObj.statusCode = 3;
      this.searchObj.dStartTime = this.value3;
    }
    if (this.name === '无需办理') {
      this.searchObj.statusCode = 4;
    }
    this.http.post(this.appConfig.microSeverStr + '/cnic-projectmanagement/AddAndUpdateProjectAction/updateShenJian', this.searchObj)
    .subscribe((res: any) => {
      // console.log(res);
      if (res.code === 1) {
        this.toast.show(res.msg);
        setTimeout(() => {
          this.router.navigate(['/gov/project/monthly-report/projectfilling'], { queryParams: {transDateStatus: this.transDate, transProUUID: this.state[0].projectUUID}});
        }, 500);
      } else {
        this.toast.show(res.msg);
      }
    });
  }
  
  // 导入

  // upload() {
  //   this.fileChooser.open()
  // .then(uri => console.log(uri))
  // .catch(e => console.log(e));
  // }
  userInfo = this.loginserve.getOrgUserInfo();
  stateObj = {
    panDuan: 1,
    newProcessUUID: null,
    gaiS: null,
    statusCode: null,
    accessoryAddress: null,
    fileUUID: null,
    cDocumentName: null,
    cUpDocumentName: null,
    cDocumnetType: null,
    fileCode: null,
    dStartTime: null,
    dEndTime: null,
  };
  files = [];

  // fileSelect;fileElem;fileList;
  // ionViewWillEnter() {
  // this.fileSelect = <HTMLElement>document.getElementById("fileSelect");
  // this.fileElem = <HTMLInputElement>document.getElementById("fileElem");
  // this.fileList = (<HTMLElement>document.getElementById("fileList"));
  // // this.fileList = <HTMLInputElement>document.getElementById("fileList");
  // }
  // // @HostListener('window:onload',['$event']) 
  // @HostListener('click', ['$event'])
  // // window.onload = function () {
  // onClick(event) {
  //   if (event.path[0].id === "fileSelect") {
  //     if (this.fileSelect) {
  //       this.fileSelect.addEventListener("click", e => {
  //         e.preventDefault(); // prevent navigation to "#"
  //         if (this.fileElem) {
  //           this.fileElem.addEventListener("change", this.handleFiles(), false);
  //           this.fileElem.click();
  //         }
  //       }, false);
  //     }
  //   }
  //   console.log("filefamily1:", this.fileSelect, )
  //   console.log("filefamily2:",  this.fileList.innerHTML)
  //   console.log("filefamily3:",  this.fileElem,)
  //   console.log("filefamily4:", event)
  // };

  // handleFiles() {
  //     let file:any=null;
  //     this.fileList.innerHTML = "";
  //     const list = document.createElement("ul");
  //     this.fileList.appendChild(list);
  //     this.files = this.fileElem.files
  //     console.log("fileList:",this.fileList,this.fileList.length,this.files)
  //     for (let i = 0; i < this.files.length; i++) {
  //       const li = document.createElement("li");
  //       list.appendChild(li);
  //       file = (this.fileElem).files[i]
  //       // const img = document.createElement("img");
  //       // img.src = URL.createObjectURL(this.files[i]);
  //       // img.height = 60;
  //       // img.onload = function() {
  //       //   URL.revokeObjectURL(this.src);
  //         // }
  //       const formData = new FormData();
  
  //     const xhr = new XMLHttpRequest();	
  //     xhr.open('POST', 
  //       // this.appConfig.microSeverStr+
  //       this.userInfo.cFileServerInfo +
  //       '/Sys_DocumentLibray_CNICM/upLoadImageDocument/' +
  //       this.userInfo.account.iSysID +
  //       '/' +
  //       this.userInfo.cUserName,
  //    true);	
  //   xhr.onreadystatechange = function() {	
  //     if (xhr.readyState == 4 && xhr.status == 200) {	
  //       console.log("xhr:",xhr,xhr.response,xhr.responseText)
  //       alert(xhr.responseText);	
  //     }	
  //   };	
  //   // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  //   this.files.forEach((file: any, index) => {
  //     formData.append('files[]' + index, file);
  //   });
  //       li.appendChild(file);
  //       const info = document.createElement("span");
  //       info.innerHTML = this.files[i].name + ": " + this.files[i].size + " bytes";
  //       li.appendChild(info);
  //     }
    
  // }

  upload(){
    const file = (<HTMLInputElement>document.getElementById('inputUploadfiles')).files[0];	
    this.files.push(file)
    const formData = new FormData();
    const xhr = new XMLHttpRequest();	
    
    xhr.open('POST', 
        // this.appConfig.microSeverStr+
        this.userInfo.cFileServerInfo +
        '/Sys_DocumentLibray_CNICM/upLoadImageDocument/' +
        this.userInfo.account.iSysID +
        '/' +
        this.userInfo.cUserName,
     true);	
    xhr.onreadystatechange = function() {	
      if (xhr.readyState == 4 && xhr.status == 200) {	
        console.log("xhr:",xhr,xhr.response,xhr.responseText)
        alert(xhr.responseText);	
      }	
    };	
    // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    this.files.forEach((file: any, index) => {
      formData.append('files[]' + index, file);
    });
    let tmpXhr = xhr.send(formData);	
    console.log("tmpXhr:",tmpXhr)
  }


  change($event) {
  alert($event);
  if ($event.target.files.length > 1) {
    this.toast.show('只能上传1个文件!');
    return;
  }
  const file = $event.target.files[0];
  console.log(file);
  this.fileChooser.open()
  .then((uri: any) => console.log(uri))
  .catch((e: any) => console.log(e));
  // this.fileChooser.open()
  // .then(uri => {
  // // uri 文件的路径
  // console.log(uri);
  // })
  // .catch(e => console.log(e));
}




  // 返回
  back() {
    this.nav.navigateBack('/gov/project/monthly-report/projectfilling', { queryParams: {transDateStatus: this.transDate, transProUUID: this.state[0].projectUUID}});
    // window.history.back();
  }

}
