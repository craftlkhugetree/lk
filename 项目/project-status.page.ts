import { Component, OnInit, ElementRef} from '@angular/core';
import { NavController } from '@ionic/angular';
import {  ToastService, ModalService} from 'ng-zorro-antd-mobile';
import { HttpClient , HttpRequest, HttpResponse } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { LoginService } from '.././../../../services/login/login.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
// import { fromEvent } from 'rxjs';

// @Directive({selector: 'input[trim]'})
// @Directive({selector: 'a[exput]'})

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.page.html',
  styleUrls: ['./project-status.page.scss'],
})
export class ProjectStatusPage implements OnInit {
  login = JSON.parse(window.localStorage.getItem('userInfoOrg'));
  constructor(
    private nav: NavController,
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private inApp: InAppBrowser,
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
  // 文件列表
  fileList = [];
  // 只记录第一次打开的文件数据
  fileListBeifen = [];
  // 删除uid[]
  uid = [];
  // 避免多次保存的操作
  loading = [];

  // 保存参数
  searchObj = {
  panDuan: null, // 1为审批线及建设线状态变更,
  newProcessUUID: null, // 线UUID,
  gaiS: null, // 改的是审批线还是建设线,1审批线,2建设线,
  statusCode: null, // 状态码(1未办理,2已办理,3正在办理,4无需办理)
  accessoryAddress: null, // 计划附件地址(链接),传就改不传就不改哦,
  fileUUID: null, // 文件自有UUID,传就改不传就不改哦,
  cDocumentName: null, // 附件名称,传就改不传就不改哦,
  cUpDocumentName: null, // 文件夹名称,传就改不传就不改哦,
  cDocumnetType: null, // 附件类型,传就改不传就不改哦,
  fileCode: null, // 文件code,传就改不传就不改哦,
  dStartTime: null, // 开始时间,传就改不传就不改哦,
  dEndTime: null, // 结束时间,传就改不传就不改哦,
  };

  // 传来的日期和数据
  transDate = null;
  ngOnInit() {
    // console.log("status:",this.nav)
    this.route.queryParams.subscribe(queryParams => {
      // console.log(queryParams);
      this.state = [];
      this.fileList = [];
      this.fileListBeifen = [];
      this.id = queryParams.id;
      this.state.push(JSON.parse(queryParams.data));
      // 已存在的附件
      if (this.state[0].accessoryAddress) {
        if (typeof(this.state[0].accessoryAddress) === 'string') {
            this.searchObj.fileCode = this.state[0].fileCode.split(',');
            this.searchObj.accessoryAddress = this.state[0].accessoryAddress.split(',');
            this.searchObj.cDocumentName = this.state[0].cDocumentName.split(',');
            for (let i = 0; i < this.searchObj.accessoryAddress.length; i++) {
            const File = {
              uid: this.searchObj.fileCode[i],
              name: this.searchObj.cDocumentName[i],
              url: this.searchObj.accessoryAddress[i],
            };
            this.fileList.push(File);
            // this.fileListBeifen.push(File);
          }
        } else {
          this.searchObj.fileCode = this.state[0].fileCode;
          this.searchObj.accessoryAddress = this.state[0].accessoryAddress;
          this.searchObj.cDocumentName = this.state[0].cDocumentName;
          for (let i = 0; i < this.searchObj.accessoryAddress.length; i++) {
          const File = {
            uid: this.searchObj.fileCode[i],
            name: this.searchObj.cDocumentName[i],
            url: this.searchObj.accessoryAddress[i],
          };
          this.fileList.push(File);
          // this.fileListBeifen.push(File);
        }
        }

   }
      // console.log(this.state);

      this.transDate = queryParams.valDate;
      const data = JSON.parse(queryParams.data);
      const arr = [];
      arr.push(data.stateDescription);




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
  preservation() {
    this.toast.loading('', 100000);
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
    // 导入
    this.uploadFile();
    // 删除判断
    if (this.uid.length > 0 ) {
      this.delete();
    }
  }
  // 提交
  submit() {  
      if (this.searchObj.accessoryAddress) {
        this.searchObj.accessoryAddress = this.searchObj.accessoryAddress.toString();
        this.searchObj.fileCode = this.searchObj.fileCode.toString();
        this.searchObj.cDocumentName = this.searchObj.cDocumentName.toString();
      }
      this.http.post(this.appConfig.microSeverStr + '/cnic-projectmanagement/AddAndUpdateProjectAction/updateShenJian', this.searchObj)
      .subscribe((res: any) => {
        // console.log(res);
        if (res.code === 1) {
          this.toast.hide();
          this.toast.show(res.msg);
          this.router.navigate(['/gov/project/monthly-report/projectfilling'], { queryParams: {transDateStatus: this.transDate, transProUUID: this.state[0].projectUUID}});
        } else {
          this.toast.hide();
          this.toast.show(res.msg);
        }
      });
    
  }
  



  // 文件上传功能
    // 导入验证
    _selectFile() {
      this.el.nativeElement.querySelector('#_file').click();
    }
    // 实际导入
  selectFile(e: any) {
    let fileList = e.target.files;
    const tempList = ['doc', 'docx', 'xls', 'xlsx' , 'pdf' , 'jpg' , 'png'];
    fileList = Array.from(fileList);
    for (let i = 0, len = fileList.length; i < len; ++i) {
      let suffix = fileList[i].name.split('.');
      suffix = suffix[suffix.length - 1];
      // tslint:disable-next-line: only-arrow-functions
      if (tempList.every( function(value) {return value !== suffix; })) {
        this.toast.info('不允许上传除word，excel, 图片 , pdf 之外的文件，已自动筛除', 3000);
        fileList.splice(i, 1);
        --i;
        --len;
        continue;
      }
      let x = true;
      for (let j = 0, _len = this.fileList.length; j < _len; ++j) {
        if (fileList[i].name === this.fileList[j].name) {
          this.toast.info('发现重复的文件，已自动筛除', 3000);
          x = false;
          break;
        }
      }
      if (x) {
        this.fileList.push(fileList[i]);
        // this.fileListBeifen.push(fileList[i]);
        // console.log( this.fileListBeifen);
      }
    }
  }

  // 删除文件
  deleteEnclosure(item: any) {
    this.uid = [];
    if (item.uid) {
      this.uid.push(item.uid);
    }
    const index = (this.fileList || []).findIndex((item1) => item1 === item);
    // console.log(index);
    this.fileList.splice(index, 1);
    // console.log(this.fileList);
    if (item.url) {
      if (this.searchObj.accessoryAddress ) {

        for (let i = 0; i < this.searchObj.accessoryAddress.length; i++) {
          if (this.searchObj.accessoryAddress[i] === item.url) {
           this.searchObj.accessoryAddress = this.searchObj.accessoryAddress.filter(d => d !== this.searchObj.accessoryAddress[i]);
           this.searchObj.cDocumentName = this.searchObj.cDocumentName.filter(d => d !== this.searchObj.cDocumentName[i]);
           this.searchObj.fileCode = this.searchObj.fileCode.filter(d => d !== this.searchObj.fileCode[i]);
           break;
          }
        }
      }
    }
    // console.log(this.uid);
    return true;
  }
  // 遍历删除文件
  delete() {
    for (let i = 0; i < this.uid.length; i++) {
      this.http.get(this.login.cFileServerInfo + '/Sys_DocumentLibray_CNICM/deleteDocument/' + this.uid[i]).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
          } else {
            this.toast.info('文件删除失败');
          }
        },
      );
    }
  }


  // 保存上传附件
  // tslint:disable-next-line: only-arrow-functions
  uploadFile() {
    this.fileList = this.fileList.filter((item) => {
      return !item.url;
    });
    // this.fileListBeifen = this.fileListBeifen.filter((item) => {
    //   return !item.url;
    // });
    const formData = new FormData();
    
    let c = [...this.fileList, ...this.fileListBeifen],
      d = new Set(c),
      e = Array.from(d),
      f = [...e.filter(_ => !this.fileList.includes(_)), ...e.filter(_ => !this.fileListBeifen.includes(_))];
    for (let i = 0; i < f.length; i++) {
        if (f[i].status === 'removed') {
          f = f.filter(d => d.uid !== f[i].uid);
          i--;
        }
      }
    if (f.length === 0) {
        this.submit();
        return;
      }
    // tslint:disable-next-line:no-any
    f.forEach((file: any, index) => {
      formData.append('files[]' + index, file);
    });

    this.http
      .post(
        `${this.login.cFileServerInfo}/Sys_DocumentLibray_CNICM/upLoadImageDocument/${this.login.account.iSysID}/${this.login.cUserName}`,
        formData
      )
      .subscribe(
        (result: any) => {
          if (result.Result.iRsult === 1) {
            for (let i = 0; i < result.listData.length; i++) {
              if (i === 0) {
                if (!this.searchObj.accessoryAddress) {
                  this.searchObj.accessoryAddress =
                    this.login.cFileLoadServerInfo +
                    '/' +
                    result.listData[0].cDirRelativePath +
                    '/' +
                    result.listData[0].cUpDocumentName;
                } else {
                  this.searchObj.accessoryAddress =
                    this.searchObj.accessoryAddress +
                    ',' +
                    this.login.cFileLoadServerInfo +
                    '/' +
                    result.listData[0].cDirRelativePath +
                    '/' +
                    result.listData[0].cUpDocumentName;
                }

                if (!this.searchObj.cDocumentName) {
                  this.searchObj.cDocumentName = result.listData[0].cDocumentName;
                } else {
                  this.searchObj.cDocumentName =
                    this.searchObj.cDocumentName + ',' + result.listData[0].cDocumentName;
                }

                if (!this.searchObj.fileCode) {
                  this.searchObj.fileCode = result.listData[0].cDLCode;
                } else {
                  this.searchObj.fileCode = this.searchObj.fileCode + ',' + result.listData[0].cDLCode;
                }

                // obj.cThumbnailPath = this.login.cFileLoadServerInfo + '/' + result.body.listData[0].cDirRelativePath + '/' + result.body.listData[0].cThumbnailName;
              } else {
                this.searchObj.accessoryAddress =
                  this.searchObj.accessoryAddress +
                  ',' +
                  this.login.cFileLoadServerInfo +
                  '/' +
                  result.listData[i].cDirRelativePath +
                  '/' +
                  result.listData[i].cUpDocumentName;
                this.searchObj.cDocumentName = this.searchObj.cDocumentName + ',' + result.listData[i].cDocumentName;
                this.searchObj.fileCode = this.searchObj.fileCode + ',' + result.listData[i].cDLCode;
                // obj.cThumbnailPath = obj.cThumbnailPath + ',' + this.login.cFileLoadServerInfo + '/' + result.body.listData[i].cDirRelativePath + '/' + result.body.listData[i].cThumbnailName;
              }
            }
            // console.log(this.searchObj);
            this.submit();
          } else {
            this.toast.hide();
            this.toast.info('文件上传失败');
          }
        },
        () => {
          this.toast.hide();
          this.toast.info('文件上传失败');
        },
      );
  }

  // 下载附件
  jump(item: any) {
    if (item.url) {
      this.inApp.create(item.url, '_system').show();
    }
  }
  // 返回
  back() {
    // console.log(this.transDate)
    this.nav.navigateBack('/gov/project/monthly-report/projectfilling', { queryParams: {transDateStatus: this.transDate, transProUUID: this.state[0].projectUUID}});
    // window.history.back();
    // this.nav.back();
  }

}
