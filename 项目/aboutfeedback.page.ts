/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/11/17 15:35
 * @Version: 1.0
 */
import { MineService } from "../../../service/mineService/mine.service";
import { ImageService } from "../../../service/image/image.service";
import { Device } from "@ionic-native/device/ngx";
import { AppConfig } from "../../../app.config";
import { Component, NgZone, OnInit } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Events, NavController } from "@ionic/angular";
import { StorageService } from "src/app/service/storage/storage.service";
import {
  ActionSheetService,
  ModalService,
  ToastService,
} from "ng-zorro-antd-mobile";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LoginService } from "src/app/service/login/login.service";
import { HttpClient } from "@angular/common/http";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-aboutfeedback",
  templateUrl: "./aboutfeedback.page.html",
  styleUrls: ["./aboutfeedback.page.scss"],
})
export class AboutfeedbackPage implements OnInit {
  height: number = document.documentElement.clientHeight;
  // image =
  //   "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1763044357,684998663&fm=27&gp=0.jpg";
  // state = {
  //   open: false,
  // };
  public personalInfo: any = "";
  public loginInfo: any = this.storage.getStorage("loginInfo");

  public title = "反馈内容:";
  public Editor = ClassicEditor;
  public _config = {
    placeholder: "请输入内容",
  };
  public model = {
    editorData: "",
  };
  public UploadAdapter: any = null;

  public mineInfo: any = null;
  public cPhotoPath = ""; // 图片路径
  public cPhotoCode = ""; // 图片code

  // public loginInfo:any = JSON.parse(window.localStorage.getItem('loginInfo'));
  public userInfoOrg: any = this.login.getOrgUserInfo();
  public orgInfoAL: any = this.login.getCurrentOrgInfoAL();
  public phoneNumber: any = this.loginInfo.cUserName;
  // 通过接口获得的组织列表
  public modularList: any = [];
  public modularValue: any = [];
  public placeholder: any = "请选择功能模块";

  public image: any = [];
  public screenW = screen.width;
  public screenH = screen.height;
  public rate = 0.2;
  public imgWidth = null;
  // public imgHeight = null;

  public conversionHTML = (html: string) =>
    ((e, html) => ((e.innerHTML = html), e))(
      document.createElement("div"),
      html
    ).textContent;

  constructor(
    public nav: NavController,
    public storage: StorageService,
    public statusBar: StatusBar,
    public zone: NgZone,
    public events: Events,
    public toast: ToastService,
    public login: LoginService,
    private http: HttpClient,
    private appConfig: AppConfig,
    private _toast: ToastService,
    public actionSheet: ActionSheetService,
    public mineServer: MineService,
    public imgServer: ImageService,
    public device: Device,
    public loading: ToastService,
    private camera: Camera,
    private _modal: ModalService
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getModularList();

    // let crossDiv = document.getElementById("crossDiv");
    this.imgWidth = this.screenW * this.rate + "px";
    // crossDiv.style.width = this.imgWidth;
    // crossDiv.style.width = this.imgWidth;
   
    // let imgCross = document.getElementById("cross");
    // let i = new Image();
    // i.src = "/assets/icon/global/027.png";
    // if (i.complete) {
    //   // console.log(i,i.complete);
    // } else {
    //   i.onload = ()=>{
    //     // console.log(i.width,i.height,this.imgWidth);
    //   };
    // }
  }

  // 获取组织功能模块
  getModularList() {
    this.http
      .post(
        this.appConfig.CNIC_WE_SeverStr +
          "/cnic-operationsmanagement/OM_ModularAction/getModularList",
        { cSysTemCode: "02" }
      )
      .subscribe((res: any) => {
        if (res.code === 1 && res.data.length > 0) {
          this.modularList = res.data;
          res.data.map((i) => {
            this.modularValue.push(i.cModuleName);
          });
        } else {
          this.toast.show(res.msg);
        }
      });
  }

  // 功能模块选择
  onPickerChange(result: any) {
    // console.log(result);
  }
  // select modular function
  onModular(e: any) {
    // e is an Array
    // console.log(e)
    this.placeholder = this.getResult(e);
    // this.placeholder = e[0];
  }
  // tslint:disable-next-line: member-ordering
  value4 = [];
  getResult(result: any) {
    this.value4 = [];
    let temp = "";
    result.forEach((item) => {
      this.value4.push(item.label || item);
      temp += item.label || item;
    });
    return this.value4.map((v) => v).join(",");
  }

  // submit
  save() {
    let uuid: any = null;
    if (this.userInfoOrg && this.userInfoOrg.cPersonUUID) {
      uuid = this.userInfoOrg.cPersonUUID;
    } else if (this.orgInfoAL && this.orgInfoAL.cPUSigID) {
      uuid = this.orgInfoAL.cPUSigID;
    }

    let flag = true;
    if (!this.phoneNumber) {
      this.toast.show("联系电话有误！");
      flag = false;
      return;
    }
    // if (!this.placeholder || this.placeholder === "请选择功能模块") {
    if (this.value4.length === 0) {
      this.toast.show("请选择功能模块！");
      flag = false;
      return;
    }
    if (!this.conversionHTML(this.model.editorData)) {
      this.toast.show(`请填写${this.title}`);
      flag = false;
      return;
    }
    if (this.conversionHTML(this.model.editorData).length < 10) {
      this.toast.show("内容要超过10个字");
      flag = false;
      return;
    }
    // console.log(this.conversionHTML(this.model.editorData));
    if (flag) {
      /**
       * 提交人 (取值优先级：人员档案(businessUser.cPersonName) -> 会员名称(cMemberName) -> 会员昵称(cMemberNickname))
       */
      if (this.userInfoOrg && this.userInfoOrg.cPersonName) {
        this.personalInfo = this.userInfoOrg.cPersonName;
      } else if (this.orgInfoAL && this.orgInfoAL.cMemberName) {
        this.personalInfo = this.orgInfoAL.cMemberName;
      } else if (this.orgInfoAL && this.orgInfoAL.cMemberNickname) {
        this.personalInfo = this.orgInfoAL.cMemberNickname;
      }

      const modularTemp = this.modularList.filter(
        (item) => item.cModuleName === this.value4[0]
      );
      let obj = {
        cModuleUUID: modularTemp[0].cModuleUUID,
        cPlatformUUID: modularTemp[0].cPlatformUUID,
        cContactPhone: this.phoneNumber,
        cContent: this.conversionHTML(this.model.editorData),
        cContentHTML: this.model.editorData,
        cSubmitter: this.personalInfo,
        cSubmitterUUID: uuid,
        cPhotoPath: this.cPhotoPath, // "图片路径 (多个图片地址使用英文，隔开)",
        cPhotoCode: this.cPhotoCode, // "图片Code (多个图片Code使用英文，隔开)",
      };
      // console.log(modularTemp,obj)

      this.http
        .post(
          this.appConfig.CNIC_WE_SeverStr +
            "/cnic-operationsmanagement/OM_OpinionFeedbackAction/saveOpinionFeedback",
          obj
        )
        .subscribe((res: any) => {
          if (res.code === 1) {
            this.toast.success(res.msg);
            // this.nav.navigateBack('/tabs/mine/about');
            setTimeout(() => {
              this.image = [];
              this.cPhotoPath = "";
              this.cPhotoCode = "";
              this.back();
            }, 300);
          } else {
            if (res.code != 2000) {
              this.toast.show(res.msg);
            }
          }
        });
    }
  }

  // 富文本提交数据,ckeditor的ready是初始化完成后执行。
  onReady($event: any) {
    // console.log("fuwenben:",$event);
    // this._toast.hide(),
    // tslint:disable-next-line: no-unused-expression
    this.UploadAdapter === null &&
      ((this.UploadAdapter = function (loader: any, _this: any) {
        //实现富文本编辑器要求的上传图片的适配器
        this.loader = loader;
        this._this = _this;
      }),
      (this.UploadAdapter.prototype.upload = function () {
        return this.loader.file.then(
          (file: any) =>
            new Promise((resolve, reject) => {
              let local = JSON.parse(
                  window.localStorage.getItem("userInfoOrg")
                ),
                formData = new FormData();
              formData.append("upload", file);
              this._this.http
                .post(
                  `${this._this.appConfig.fileServerStr}/Sys_DocumentLibray_CNICM/upLoadImageDocument/${local.account.iSysID}/${local.cUserName}`,
                  // `${this._this.config.fileServerStr}/Sys_DocumentLibray_CNICM/upLoadImageDocument/${local.account.iSysID}/${local.cUserName}`,
                  formData
                )
                .subscribe(
                  (res: any) => {
                    // this._this._toast.hide(),
                    res.Result.iRsult == 1
                      ? resolve({
                          default:
                            this._this.appConfig.fileReadServerStr +
                            res.listData[0].cDirRelativePath +
                            "/" +
                            res.listData[0].cUpDocumentName,
                        })
                      : this._this._toast.fail(res.Result.cRsultInfo, 2000);
                  },
                  () => {
                    this._this._toast.fail("请检查网络连接", 2000);
                  }
                );
            })
        );
      }),
      (this.UploadAdapter.prototype.abort = function () {}));
    $event.plugins.get("FileRepository").createUploadAdapter = function (
      loader: any
    ) {
      return (
        // this._toast.loading("加载中...", 0),
        new this.UploadAdapter(loader, this)
      );
    }.bind(this);
  }

  // upload photos
  showMineActionSheet() {
    if (this.image.length >= 3) {
      this._toast.info("最多只能上传3张图片!");
      return;
    }
    const BUTTONS = ["相册", "摄像头", "取消"];
    this.actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: null,
        destructiveButtonIndex: null,
        title: null,
        maskClosable: true,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.getImageFromCamera();
            break;
          case 1:
            this.openCamera();
            break;
          // case 2 : this.getImageFromCamera();
          //     break;
        }
      }
    );
  }

  // 打开摄像头
  openCamera() {
    this.imgServer.getImageFromCamera(
      {
        sourceType: 1,
        dataType: 0,
        allowEdit: false,
        targetWidth: screen.width,
        targetHeight: screen.height,
      },
      (res: any) => {
       
        // console.log(res);
        this.imgTo64(res);
      }
    );
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //  // imageData is either a base64 encoded string or a file URI
    //  // If it's base64 (DATA_URL):
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //  // Handle error
    // });
    // this.imgServer.getImageFromCamera(
    //   {
    //     sourceType: 1,
    //     dataType: this.device.platform === "iOS" ? 0 : 1,
    //     allowEdit: this.device.platform === "iOS",
    //     targetWidth: screen.width,
    //     targetHeight: screen.height,
    //     isSave: true,
    //     // destinationType: 0, // 0:base64 1:FILE_URI  2:NATIVE_URI
    //     // encodingType: 1,                        // 0:JPEG 1:PNG
    //     // correctOrientation: true,
    //     // saveToPhotoAlbum: true, // 是否保存到相册
    //     // cameraDirection: 0, // 0:后置 1:前置
    //   },
    //   (res: any) => {
    //     if (this.device.platform === "iOS") {
    //       // iOS直接上传图片
    //       // console.log(res);
    //       this.uploadImg([res]);
    //     } else {
    //       // Android 选择图片之后进行裁切
    //       this.cropImage(res);
    //     }
    //   }
    // );
  }

  // openInfoModal(state) {
  //   /*
  //         state的值如下
  //         bigImg:  查看大图，
  //         nickName: 昵称
  //         name: 姓名
  //         QR: 二维码

  //      */
  //   this.mineServer.showMineInfoModal(
  //     AboutfeedbackPage,
  //     state,
  //     this.mineInfo,
  //     () => {
  //       this.getMineInfo();
  //     }
  //   );
  // }

  // 获取个人资料
  // getMineInfo() {
  //   this.mineServer.getMineInfo(
  //     this.appConfig.CNIC_WE_SeverStr,
  //     this.loginInfo.cPUSigID,
  //     (res: any) => {
  //       if (res.code === 1) {
  //         this.mineInfo = res.data;
  //       }
  //     }
  //   );
  // }

  // 选择图片
  getImageFromCamera() {
    this.imgServer.getImageFromCamera(
      {
        sourceType: 0,
        dataType: 0,
        allowEdit: false,
        targetWidth: screen.width,
        targetHeight: screen.height,
      },
      (res: any) => {
        // console.log(res,this.image);
        this.imgTo64(res);
      }
    );
  }

  imgTo64(res) {
    if (res.indexOf("data:image/png;base64,") === -1)  {
      res = "data:image/png;base64," + res;
    }
    let obj:any = {img:res,width:null,height:null};
    this.image.push(this.getWidth(obj));
  }

  getWidth(obj) {
    let imgT = new Image();
    imgT.src = obj.img;
    imgT.onload = () => {
      if (imgT.width >= imgT.height) {
        obj.width = this.imgWidth;
      } else {
        obj.height = this.imgWidth;
      }
    };
    return obj;
  }

  // 上传图片
  uploadImg() {
    if (this.image.length > 0) {
      let imgTemp:any = []
      this.image.map( i => {
        imgTemp.push(i.img);
      });
      this.imgServer.upLoadImg(
        imgTemp,
        (res: any) => {
          // console.log(res);
          if (res.Result.iRsult === 1) {
            for (let i = 0; i < res.listData.length; i++) {
              if (i === 0) {
                this.cPhotoPath =
                  res.listData[i].cFileLoadServerInfo +
                  "/" +
                  res.listData[i].cDirRelativePath +
                  "/" +
                  res.listData[i].cUpDocumentName;
                this.cPhotoCode = res.listData[i].cDLCode;
              } else {
                this.cPhotoPath =
                  this.cPhotoPath +
                  "," +
                  res.listData[i].cFileLoadServerInfo +
                  "/" +
                  res.listData[i].cDirRelativePath +
                  "/" +
                  res.listData[i].cUpDocumentName;
                this.cPhotoCode =
                  this.cPhotoCode + "," + res.listData[i].cDLCode;
              }
            }
            // 传完图片后存储到后台服务器
            this.save();
          } else {
            this._toast.info("上传图片失败", 2000, null, null, "bottom");
          }
        },
        (err: any) => {
          this._toast.info(
            "上传图片失败,请检查网络",
            2000,
            null,
            null,
            "bottom"
          );
        }
      );
    } else {
      this.save();
    }
  }

  // saveMineInfo() {
  //   this.mineServer.saveMineInfo(
  //     this.appConfig.CNIC_WE_SeverStr,
  //     this.mineInfo,
  //     (res: any) => {
  //       if (res.code === 1) {
  //         this.toast.info("保存成功");
  //       } else {
  //         this.toast.info(
  //           "保存个人资料失败，" + res.msg,
  //           2000,
  //           null,
  //           null,
  //           "bottom"
  //         );
  //       }
  //     },
  //     (error1) => {
  //       this.loading.hide();
  //       this.toast.info(
  //         "保存个人资料失败，请检查网络",
  //         2000,
  //         null,
  //         null,
  //         "bottom"
  //       );
  //     }
  //   );
  // }

  // // 裁切图片
  // cropImage(uri) {
  //   console.log(uri);
  //   this.imgServer.cropImage(
  //     uri,
  //     {
  //       quality: 100,
  //       targetHeight: screen.width,
  //       targetWidth: screen.width,
  //     },
  //     (res: any) => {
  //       // console.log(res);
  //       this.fileToBase64(res);
  //     }
  //   );
  // }

  // 文件转base64
  // fileToBase64(file) {
  //   this.imgServer.fileToBase64(file, (res: any) => {
  //     const data = res.split(",")[1];
  //     this.uploadImg([data]);
  //     // this.mineInfo.headerImg = res;
  //   });
  // }

  // 放大图片
  showBigImg(src) {
    this.imgServer.showBigImg(src);
  }
  // 删除图片
  showAlert(data: any) {
    // console.log(data);
    let k = null;
    for (let i = 0; i < this.image.length; i++) {
      if (data === this.image[i]) {
        k = i;
      }
    }
    this._modal.alert("", "确定要删除这张图片吗?", [
      { text: "取消", onPress: () => console.log("取消删除图片") },
      { text: "确认", onPress: () => this.image.splice(k, 1) },
    ]);
  }

  back() {
    // this.nav.navigateBack('/tabs/mine');
    window.history.back();
  }
}
