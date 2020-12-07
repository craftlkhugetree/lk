/**
 * @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/11/26 08:35
 * @Version: 1.0
 */
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { ToolsService } from 'src/app/services/tools.service';
// import { NgxTinymceModule } from 'ngx-tinymce';
// import tinymceTT from 'tinymce'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OrgChooseService } from '../../../services/orgchoose.service';


declare var tinymce: any;
@Component({
  selector: 'app-portal-management-information-delivery',
  templateUrl: './information-delivery.component.html',
})
export class PortalManagementInformationDeliveryComponent implements OnInit, OnDestroy {
  public hideBTN = false;

  public rooterChange: any = null;
  public tiny: any;
  @ViewChild('target', { static: false }) target: ElementRef;
  @ViewChild('targetTiny', { static: false }) targetTiny: ElementRef;
  public coverImg = '封面图片';
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private modalService: NzModalService,
    private htp: HttpClient,
    private msg: NzMessageService,
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private orgServe: OrgChooseService,
    // private tinymceT: tinymceTT
  ) {
    // this.getFieldData();
    this.getReferList();
    // 路由监听，路由改变时重新初始化富文本组件配置，解决切换菜单时组件不可编辑，数据清空的问题
    // angular的特性，是在切换tab时，会清空缓存，导致富文本组件没有重新渲染导致的。
    this.rooterChange = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.reset();
        // this.resetList();
        this.initTinymce();
        // console.log('构造函数:', event, this.rooterChange);
        // 初始化配置
        this.tiny = document.getElementsByName('editTinymce');
        // let sele:any = this.targetTiny.getEditorInstance(this.targetTiny.id);
        if (this.tiny.length > 0 && this.targetTiny) {
          // console.log('tiny:', this.tiny, this.targetTiny);
          // const editID = this.tinymceT.get(this.tiny[0].id)
          // editID.init(this.editorConfig);
          // if (tinymce && tinymce.editors && tinymce.editors.length > 0) {
          //   tinymce.editors[tinymce.editors[0].settings.id].init(this.editorConfig); //开启编辑模式
          // }
        }
       
        // if(this.tiny && this.tiny.length > 0) {
        //   this.tiny[0].onload = ()=>{
        //     this.initTinymce();
        //   }
        // }
      }
    });
  }

  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  menu = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));

  // public textarea : string;
  public html = '';
  public editorConfig: any = {
    language: 'zh_CN',
    height: 400,
    statusbar: true,
    init_instance_callback: () => {
      return true;
    },
  };
  public listOfData: any = {
    cPicturesCode: '',
    cPicturesPaths: '',
    _cTitle: '',
    cSource: '',
    cAticleSource: '',
    cKeyWords: '',
    cColumnNames: '',
    cNCUUID: '',
    cAbstract: '',
    iArticleType: null, // 文章类型 文章 0; 外链 1
    sys_Account: {
      cAccUniqueID: this.account.cAccUniqueID,
    },
    busi_Organization: {
      cOrgUUID: this.current_org.cOrgUUID,
    },
    cEUUID: '',
    wz_ColumnSetting: {
      cNCUUID: '',
    },
    cContent: '',
    cMakerCode: this.login.cPersonCode,
    cMaker: this.login.cPersonName,
    dCreateDate: null,
    bIsStick: null, // 文章类型置顶
    bIsRecommend: null, // 推荐
  };
  public nzPageIndex0 = 1;
  public nzPageSize0 = 10;
  public isVisible = false;
  public isEdit = false;
  public isSpinning0 = false;
  public maxLength = 50;
  public maxLength2 = 255;
  // 新增修改的状态 1 2
  public state: any;
  public nodes = [];
  public radioValue = { '0': '文章', '1': '外链' };
  checkOptionsOne = [
    { label: '置顶', value: 'zd', checked: this.listOfData.bIsStick },
    { label: '推荐', value: 'tj', checked: this.listOfData.bIsRecommend },
  ];

  private originTree: any = [];
  private midTree: any = [];
  public treeTitle: any = null;
  private code = '18070';
  public fieldData: any = [];
  public referList: any = [];

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: false,
    hidePreviewIconInNonImage: true,
  };
  fileList = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;
  event: any = null;

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  // event type until success
  response(event): void {
    // console.log('fileList:', this.fileList);
    if (event.type === 'success') {
      this.event = event;
      this.uploadImg(this.event.file.response);
      // console.log('event:', event,this.cPhotoCode,this.cPhotoPath);
    }
  }

  // tslint:disable-next-line: member-ordering
  cPhotoPath = null;
  // tslint:disable-next-line: member-ordering
  cPhotoCode = null;
  uploadImg(res: any) {
    if (res && res.Result.iRsult === 1) {
      for (let i = 0; i < res.listData.length; i++) {
        if (i === 0) {
          this.cPhotoPath =
            res.listData[i].cFileLoadServerInfo +
            '/' +
            res.listData[i].cDirRelativePath +
            '/' +
            res.listData[i].cUpDocumentName;
          this.cPhotoCode = res.listData[i].cDLCode;
        } else {
          this.cPhotoPath =
            this.cPhotoPath +
            ',' +
            res.listData[i].cFileLoadServerInfo +
            '/' +
            res.listData[i].cDirRelativePath +
            '/' +
            res.listData[i].cUpDocumentName;
          this.cPhotoCode = this.cPhotoCode + ',' + res.listData[i].cDLCode;
        }
      }
    } else {
      this.msg.error(res.Result.cRsultInfo);
    }
  }

  customReq = (item: UploadXHRArgs) => {
    const obj = {
      cUserName: this.login.cUserName,
      strBASE64List: null,
    };
    const reader = new FileReader();
    reader.readAsDataURL(item.file as any);
    reader.onload = () => {
      // Create a FormData here to store files and other parameters.
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append('file', item.file as any);
      formData.append('id', '1000');
      // console.log('formData:', formData, item);
      obj.strBASE64List = [reader.result as string];
      const req = new HttpRequest('POST', item.action!, obj, {
        reportProgress: true,
        withCredentials: true,
      });
      // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
      return this.htp.request(req).subscribe(
        // tslint:disable-next-line no-any
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // tslint:disable-next-line:no-any
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
            // console.log(event, item);
          } else if (event instanceof HttpResponse) {
            item.onSuccess!(event.body, item.file!, event);
          }
        },
        err => {
          item.onError!(err, item.file!);
        },
      );
    };
  };

  edit(state) {
    this.state = state;
    this.showUploadList.showRemoveIcon = true;
    if (state === 1) {
      this.resetList();
      this.isEdit = !this.isEdit;
    } else {
      if (!this.article) {
        this.msg.warning('请选择要修改的文章');
        return;
      } else {
        this.http.get('/CNIC_M/InformationManagement/getNewsInByID/' + this.article.autoID).subscribe(
          (res: any) => {
            if (res.Result.iRsult === 1) {
              for (let obj in res.wz_Release) {
                this.listOfData[obj] = res.wz_Release[obj];
              }
              this.listOfData.iArticleType += '';
              this.html = this.listOfData.cContent;
              this.article = { ...this.listOfData };
              this.cPhotoCode = res.wz_Release.cPicturesCode;
              this.cPhotoPath = res.wz_Release.cPicturesPaths;
              this.getReferList();
              const tmp: any = {
                status: 'done',
                url: res.wz_Release.cPicturesPaths,
              };
              this.fileList = [];
              this.fileList.push(tmp);
              this.isEdit = !this.isEdit;
              // this._render.setProperty(this.target.nativeElement, 'nzFileList', this.fileList);
            } else {
              this.msg.error(res.Result.cRsultInfo);
            }
          },
          () => {
            this.msg.error('请检查网络连接');
          },
        );
        if (this.listOfData.iArticleType === '0') {
          this.isUrl = true;
          this.isTiny = false;
        } else if (this.listOfData.iArticleType === '1') {
          this.isTiny = true;
          this.isUrl = false;
        }
      }
    }
  }

  delForm() {
    if (this.article) {
      this.modalService.confirm({
        nzTitle: `确定要删除文章《${this.article._cTitle}》吗?`,
        nzContent: '删除后将无法撤回该操作',
        nzOkText: '删除',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.http.get('/CNIC_M/InformationManagement/detNewsClass/' + this.article.autoID).subscribe(
            (res: any) => {
              if (res.Result.iRsult === 1) {
                this.msg.success(res.Result.cRsultInfo);
                this.reset();
                this.resetList();
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
    } else {
      this.msg.warning('请选择要删除的文章');
      return;
    }
  }

  cast() {
    if (this.article) {
      this.article.bIscancel = true;
      this.article.dCancelDate = new Date();
      this.article.cCanceler = this.login.cPersonName;
      this.modalService.confirm({
        nzTitle: `确定要召回文章《${this.article._cTitle}》吗?`,
        nzContent: '召回后可重新发布',
        nzOkText: '召回',
        nzOkType: 'default',
        nzOnOk: () => {
          this.http.post('/CNIC_M/InformationManagement/revokeNewsClass/', this.article).subscribe(
            (res: any) => {
              if (res.Result.iRsult === 1) {
                this.msg.success(res.Result.cRsultInfo);
                // this.resetList();
              } else {
                this.msg.error(res.Result.cRsultInfo);
              }
              this.reset();
            },
            () => {
              this.msg.error('请检查网络连接');
            },
          );
        },
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel'),
      });
    } else {
      this.msg.warning('请选择要召回的文章');
      return;
    }
  }

  public article: any = null;
  // public colFlag = false;
  submitForm() {
    // this.richText()
    if (!this.listOfData._cTitle) {
      this.msg.warning('请填入标题');
      return;
    }
    if (
      !this.listOfData.cColumnNames
      // !this.dbClickData ||
      // this.listOfData.cColumnNames !== this.dbClickData.cColumnNames
    ) {
      // this.colFlag = false;
      this.msg.warning('请选择栏目');
      return;
    } else {
      // this.colFlag = true;
      let tmpCol: any = this.oldList.filter(i => i.cColumnNames === this.listOfData.cColumnNames);
      if (tmpCol.length === 0) {
        this.msg.warning('该栏目不存在，或未选择组织，请重新选择！');
        return;
      }
    }

    if (!this.listOfData.iArticleType) {
      this.msg.warning('请选择文章类型');
      return;
    }
    if (this.listOfData.iArticleType === '0' && (!this.html || !!this.listOfData.cAticleSource)) {
      this.msg.warning('已选中类型为【文章】，请进行文本编辑，同时清空文章链接。');
      return;
    }
    if (this.listOfData.iArticleType === '1' && (!this.listOfData.cAticleSource || !!this.html)) {
      this.msg.warning('已选中类型为【外链】，请输入文章链接，同时清空最下方文本。');
      return;
    }
    if (!this.cPhotoCode || !this.cPhotoPath || this.fileList.length === 0) {
      this.msg.warning('图片未上传');
      return;
    }
    if (this.listOfData.iArticleType === '1' && !!this.listOfData.cAticleSource && !this.regUrl(this.listOfData.cAticleSource)) {
      this.msg.warning('文章链接格式有误，请重新输入！')
      return;
    }
    this.listOfData.cContent = this.html;
    this.dbClickData
      ? (this.listOfData.wz_ColumnSetting.cNCUUID = this.dbClickData.cNCUUID)
      : (this.listOfData.wz_ColumnSetting.cNCUUID = this.jumpReferList[0].cNCUUID);
    this.dbClickData
      ? (this.listOfData.cNCUUID = this.dbClickData.cNCUUID)
      : (this.listOfData.cNCUUID = this.jumpReferList[0].cNCUUID);
    this.listOfData.cPicturesCode = this.cPhotoCode;
    this.listOfData.cPicturesPaths = this.cPhotoPath;
    // this.listOfData.busi_Organzation.cOrgUUID = "x9s3fce1425b5c2341b5b64afb76f9f1481b";
    // this.listOfData.sys_Account.cAccUniqueID = "pxy88cfd2f82f2c24002ada69cbb24382007";
    // this.listOfData.cEUUID = "zgxr45207cdb99074d2cbfb34f8786e703d4";
    this.listOfData.dCreateDate = new Date();
    if (this.state === 1) {
      this.http.post('/CNIC_M/InformationManagement/saveNewsClass', { saveObj: this.listOfData }).subscribe(
        (res: any) => {
          if (res.Result.iRsult === 1) {
            this.msg.success(res.Result.cRsultInfo);
            this.article = res.pni;
            this.reset();
          } else {
            this.msg.error(res.Result.cRsultInfo);
          }
        },
        () => {
          this.msg.error('请检查网络连接');
        },
      );
    } else {
      if (this.article) {
        const maker = this.article.cMaker;
        const makerCode = this.article.cMakerCode;
        const createDate = this.article.dCreateDate;
        this.listOfData.iArticleType = this.listOfData.iArticleType || this.article.iArticleType;
        for (let obj in this.listOfData) {
          // if (this.listOfData[obj]) {
          this.article[obj] = this.listOfData[obj];
          // }
        }
        this.article.cModCode = this.login.cPersonCode;
        this.article.cModName = this.login.cPersonName;
        this.article.dModDate = new Date();
        // this.http.post('http://192.168.9.15:8080/CNIC_M/InformationManagement/updNewsClass', { saveObj: this.article }).subscribe(
        this.http.post('/CNIC_M/InformationManagement/updNewsClass', { saveObj: this.article }).subscribe(
          (res: any) => {
            if (res.Result.iRsult === 1) {
              this.msg.success(res.Result.cRsultInfo);
              this.reset();
            } else {
              this.msg.error(res.Result.cRsultInfo);
            }
          },
          () => {
            this.msg.error('请检查网络连接');
          },
        );
      }
    }
  }

  giveUp() {
    this.modalService.confirm({
      nzTitle: '确定要放弃编辑吗?',
      nzContent: '',
      nzOkText: '确定',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.reset();
        this.resetList();
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  reset() {
    this.showUploadList.showRemoveIcon = false;
    this.isEdit = false;
    this.event = null;
    this.isUrl = true;
    this.isTiny = true;
    // if (tinymce && tinymce.editors && tinymce.editors.length > 0) {
    //   tinymce.editors[tinymce.editors[0].settings.id].setMode('readonly'); //开启编辑模式
    // }
  }

  resetList() {
    this.dbClickData = null;
    this.fileList = [];
    this.article = null;
    this.html = '';
    this.isUrl = true;
    this.isTiny = true;
    this.listOfData = {
      cPicturesCode: '',
      cPicturesPaths: '',
      _cTitle: '',
      cSource: '',
      cAticleSource: '',
      cKeyWords: '',
      cColumnNames: '',
      cNCUUID: '',
      cAbstract: '',
      iArticleType: null, // 文章类型 文章 0; 外链 1
      sys_Account: {
        cAccUniqueID: this.account.cAccUniqueID,
      },
      busi_Organization: {
        cOrgUUID: this.current_org.cOrgUUID,
      },
      cEUUID: '',
      wz_ColumnSetting: {
        cNCUUID: '',
      },
      cContent: '',
      cMakerCode: this.login.cPersonCode,
      cMaker: this.login.cPersonName,
      dCreateDate: null,
      bIsStick: null, // 文章类型置顶
      bIsRecommend: null, // 推荐
    };
    this.checkOptionsOne.map(i => {
      i.checked = false;
    });
  }
  public isUrl = true;
  public isTiny = true;
  chooseModel(e: any) {
    this.listOfData.iArticleType = e + '';
    if (this.listOfData.iArticleType === '0') {
      this.isUrl = true;
      this.isTiny = false;
    } else if (this.listOfData.iArticleType === '1') {
      this.isTiny = true;
      this.isUrl = false;
    }
  }
  updateSingleChecked(e) {
    if (e && e.length > 0) {
      e.map(i => {
        if (i.label === '置顶') {
          this.listOfData.bIsStick = i.checked;
        }
        if (i.label === '推荐') {
          this.listOfData.bIsRecommend = i.checked;
        }
      });
    }
  }

  // click tree
  private zEvent: any = null;
  private referClick: any = null;
  private uuid: any = [];
  nzEvent(e: Required<NzFormatEmitEvent>): void {
    // 清空检索框
    this.listOfData.cColumnNames = null;
    // this.referClick = " bEnd=1 and cAccUniqueID='pxy88cfd2f82f2c24002ada69cbb24382007' or   (bShared=1 and cAccUniqueID <>'pxy88cfd2f82f2c24002ada69cbb24382007' and bEnd=1 )"
    this.referClick =   `bEnd=1 and cOrgUUID='${ this.current_org.cOrgUUID}'`;
    // this.referClick = `bEnd=1 and cAccUniqueID='${this.account.cAccUniqueID}' or   (bShared=1 and cAccUniqueID <> '${this.account.cAccUniqueID}' and bEnd=1 )`;
    if (e && e.keys) {
      this.isSpinning0 = true;
      this.zEvent = e;
      this.uuid = [];
      const origin = e.node.origin;
      this.uuid.push(origin.cUUID);
      this.getUUID(origin);
      let tmpStr = '';
      this.uuid.map(i => {
        tmpStr += `'${i}',`;
      });
      tmpStr = tmpStr.slice(0, tmpStr.length - 1);
      const prefix = `cNCUUID in (${tmpStr})  and `;
      // console.log(e,this.uuid,tmpStr,prefix);
      this.referClick = prefix + this.referClick;
      this.getReferList();
    } else {
    }
  }

  getUUID(origin: any) {
    if (origin && origin.children && origin.children.length > 0) {
      origin.children.map(i => {
        this.uuid.push(i.cUUID);
        if (i.children && i.children.length > 0) {
          this.getUUID(i);
        }
      });
    }
  }

  newAreaCancel() {
    this.isVisible = false;
  }

  newAreaOk() {
    this.isVisible = false;
  }

  public serachValue: any = null;
  comSearch() {
    this.isSpinning0 = true;
    this.dbClickData = null;
    this.cChoiceName = null;
    if(!this.current_org.cOrgUUID) {
      this.current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
    }
    if(!this.current_org.cOrgUUID) {
      this.isSpinning0 = false;
      this.msg.warning('请选择组织')
      return;
    }
    this.getReferTree();
    this.getReferList();
    // console.log(this.html, '搜索', this.isVisible,this.current_org);
  }

  toTree(data, cParentUUID = 'cParentUUID', cTreeCode = 'cTreeCode', cTreeName = 'cTreeName') {
    const arr = [...data];
    // 一级
    const tree = [];
    // 非一级
    const arrNew: any = arr.filter(item => {
      if (!item[cParentUUID]) {
        tree.push({
          title:  item.cTreeName,
          key: item.cTreeCode,
          iTreeID: item.iTreeID,
          cUUID: item.cUUID,
          children: [],
        });
      } else {
        return item;
      }
    });
    this.getChild(arrNew, tree, cParentUUID, cTreeCode);
    this.isSpinning0 = false;
    this.isVisible = true;
    return tree;
  }

  getChild(originArr, mapArr, cParentUUID, cTreeCode) {
    if (originArr.length === 0 || !mapArr) return;
    // 循环父菜单，将其直系子菜单纳入
    mapArr.forEach(item => {
      if (item) {
        item.children = [];
        originArr.forEach((obj, index) => {
          if (obj) {
            if (item.cUUID === obj[cParentUUID]) {
              item.children.push({
                title:  obj.cTreeName,
                key: obj.cTreeCode,
                iTreeID: obj.iTreeID,
                cUUID: obj.cUUID,
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
          this.getChild(originArr, item.children, cParentUUID, cTreeCode);
        }
      }
    });
  }

  getFieldData() {
    this.http.get('/CNIC_M/Refer/getReferBaseStructure/' + this.code).subscribe(
      (res: any) => {
        if (res.Result.iRsult === 1) {
          this.fieldData = []
          this.fieldData = res.fieldData;
          this.fieldData = this.fieldData.filter(i => i.fieldName !== '是否集团级数据')
        } else {
          this.msg.error(res.Result.cRsultInfo);
        }
      },
      () => {
        this.msg.error('请检查网络连接');
      },
    );
  }

  getReferTree() {
    if(this.orgServe.getCurrentOrg().cOrgUUID){
    this.orgServe.orgChooseEventer.subscribe((res: any) => {
      this.current_org =  this.orgServe.getCurrentOrg();
    })
  }
    // const treeObj = {"iOrgID":77,"iSysID":60,"cReferCode":this.code,"bEncrypt":false,"treeFilter":"cOrgUUID ='x9s3fce1425b5c2341b5b64afb76f9f1481b'  OR   (bIsGroupData=1 and cAccUniqueID='pxy88cfd2f82f2c24002ada69cbb24382007') or (bShared=1 and cAccUniqueID <>'pxy88cfd2f82f2c24002ada69cbb24382007' )","cAccUniqueID":"pxy88cfd2f82f2c24002ada69cbb24382007","cOrgUUID":"x9s3fce1425b5c2341b5b64afb76f9f1481b"}
    const treeObj = {
      cAccUniqueID: this.account.cAccUniqueID,
      cOrgUUID: this.current_org.cOrgUUID,
      iOrgID: this.current_org.iOrgID,
      iSysID: this.account.iSysID,
      cReferCode: this.code,
      bEncrypt: true,
      treeFilter: `cOrgUUID='${this.current_org.cOrgUUID}'`
      // treeFilter: `cOrgUUID='${this.current_org.cOrgUUID}' OR (bIsGroupData=1 and cAccUniqueID='${this.account.cAccUniqueID}') or (bShared=1 and cAccUniqueID<>'${this.account.cAccUniqueID}')`,
    };
    treeObj.treeFilter = this.toolsService.encrypt(treeObj.treeFilter);

    this.http.post('CNIC_M/Refer/getReferTreeData_V1', treeObj).subscribe(
      (res: any) => {
        if (res.Result.iRsult === 1) {
          this.originTree = res.treeData;
          this.treeTitle = res.treeTitle + '(全部)';
          this.nodes = [
            {
              title: this.treeTitle,
              expanded: true,
              key: '',
              iTreeID: '',
              cUUID: '',
              children: [],
            },
          ];
          this.midTree = this.toTree(this.originTree);
          this.nodes[0].children = this.midTree;
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

  public jumpReferList: any = [];
  public oldList: any = [];
  getReferList() {
    // const refer = {"cReferCode":"18070","bEncrypt":false,"listFilter":" bEnd=1 and cAccUniqueID='pxy88cfd2f82f2c24002ada69cbb24382007' or   (bShared=1 and cAccUniqueID <>'pxy88cfd2f82f2c24002ada69cbb24382007' and bEnd=1 )","pageSize":50,"pageNumber":1,"pageLoadNumber":3,"formFilter":"","iOrgID":77,"iSysID":60,"cAccUniqueID":"pxy88cfd2f82f2c24002ada69cbb24382007","cOrgUUID":"x9s3fce1425b5c2341b5b64afb76f9f1481b","iTradeID":2}
    if(this.orgServe.getCurrentOrg().cOrgUUID){
      this.current_org =  this.orgServe.getCurrentOrg()
    }
    const refer = {
      iOrgID: this.current_org.iOrgID,
      iSysID: this.account.iSysID,
      cReferCode: this.code,
      bEncrypt: true,
      cAccUniqueID: this.account.cAccUniqueID,
      cOrgUUID: this.current_org.cOrgUUID,
      formFilter: '',
      iTradeID: 2,
      pageLoadNumber: 3,
      pageNumber: 1,
      pageSize: 50,
      // listFilter: `bEnd=1 and cOrgUUID='${ this.current_org.cOrgUUID}' or   (bShared=1 and cAccUniqueID <> '${this.account.cAccUniqueID}' and bEnd=1 )`,
      listFilter: `bEnd=1 and cOrgUUID='${ this.current_org.cOrgUUID}'`
    };
    if (this.zEvent) {
      refer.listFilter = this.referClick;
    }
    refer.listFilter = this.toolsService.encrypt(refer.listFilter);
    this.http.post('CNIC_M/Refer/getReferListData_V1', refer).subscribe(
      (res: any) => {
        if (res.Result.iRsult === 1) {
          this.dbClickData = null;
          this.referList = res.saveData;
          this.oldList.length === 0 ? (this.oldList = res.saveData) : (this.oldList = this.oldList);
          this.zEvent = null;
          this.cChoiceName = null;
          if (this.listOfData.cColumnNames) {
            this.referList = this.referList.filter(
              i =>
                (i.cColumnNames ? i.cColumnNames.indexOf(this.listOfData.cColumnNames) !== -1 : null) ||
                (i.cChoice ? i.cChoice.indexOf(this.listOfData.cColumnNames) !== -1 : null) ||
                (i.cColumnName ? i.cColumnName.indexOf(this.listOfData.cColumnNames) !== -1 : null) ||
                (i.cColumnCode ? i.cColumnCode.indexOf(this.listOfData.cColumnNames) !== -1 : null),
            );
            this.jumpReferList = this.referList.filter(item => item.cColumnNames === this.listOfData.cColumnNames);
            if (this.jumpReferList.length === 0) {
              this.msg.warning('该栏目不存在，请重新选择。');
              // return;
            }
          }
        } else {
          this.msg.error(res.Result.cRsultInfo);
        }
        this.isSpinning0 = false;
      },
      () => {
        this.msg.error('请检查网络连接');
      },
    );
  }

  // tslint:disable-next-line: member-ordering
  private timer: any = null;
  public dbClickData: any = null;
  public cChoiceName: any = null;
  chooseTable(i: any) {
    this.cChoiceName = i.cColumnCode;
    this.dbClickData = i;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      // console.log("one:",i);
      this.listOfData.cColumnNames = i.cColumnNames;
    }, 300);
  }

  dbClick(i: any) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.listOfData.cColumnNames = i.cColumnNames;
    this.dbClickData = i;
    // console.log('db:', i);
    this.isVisible = false;
  }

  richText() {
    // 获取富文本存文本
    // let activeEditor = tinymce.activeEditor;
    // let editBody = activeEditor.getBody();
    // activeEditor.selection.select(editBody);
    // let text = activeEditor.selection.getContent({ format: 'text' });
    // console.log("richText:",tinymce,activeEditor,activeEditor.selection,editBody,text)
    // tinymce.editors[0].readonly = true;
    // tinymce.editors[tinymce.editors[0].settings.id].setMode('readonly'); //开启编辑模式
  }

  ngOnInit() {
    // console.log("初始化：",this.rooterChange)
    this.initTinymce();
   
    this.route.queryParams.subscribe(params => {
      if(params.cOrgUUID && !this.current_org.cOrgUUID) {
          this.current_org.cOrgUUID = params.cOrgUUID
      }
      if(params.iOrgID && !this.current_org.iOrgID) {
        this.current_org.iOrgID = params.iOrgID
    }
      if (params.cPicturesPaths) {
        const tmp: any = {
          // uid: 1,
          // name: 'xxx.png',
          status: 'done',
          url: params.cPicturesPaths,
          // url: res.wz_Release.cPicturesPaths
        };
        this.fileList = [];
        this.fileList.push(tmp);
      }
      if (params.autoid) {
        this.isSpinning0 = true;
        this.http.get('/CNIC_M/InformationManagement/getNewsInByID/' + params.autoid).subscribe(
          (res: any) => {
            if (res.Result.iRsult === 1) {
              this.reset();
              this.isSpinning0 = false;
              // this.listOfData = res.wz_Release;
              for (let obj in res.wz_Release) {
                this.listOfData[obj] = res.wz_Release[obj];
              }
              this.listOfData.iArticleType += '';
              this.html = this.listOfData.cContent;
              this.article = { ...this.listOfData };
              this.cPhotoCode = res.wz_Release.cPicturesCode;
              this.cPhotoPath = res.wz_Release.cPicturesPaths;
              this.getReferList();
              // this._render.setProperty(this.target.nativeElement, 'innerHTML', 'hello');

              // this._render.setProperty(this.target.nativeElement, 'nzFileList', this.fileList);
              // let img = new Image();
              // img.src = this.listOfData.cPicturesPaths;
              // img.onload = () => {
              //   console.log(tmpObj, img, img);
              // };
            } else {
              this.msg.error(res.Result.cRsultInfo);
            }
          },
          () => {
            this.msg.error('请检查网络连接');
          },
        );
      }
    });
  }

  // 路由切出时触发
  ngOnDestroy() {
    // console.log("销毁：",this.rooterChange)
    if (this.rooterChange) {
      this.initTinymce();
      this.rooterChange.unsubscribe();
    }
  }

  // 初始化组件
  initTinymce() {
    this.editorConfig = {
      language: 'zh_CN',
      height: 400,
      statusbar: true,
      init_instance_callback: () => {
        return true;
      },
    };
  }
  // initTinymce() {
  //   this.editorConfig = {
  //     // 占位符
  //     placeholder: '请输入内容',
      
  //     // 高度 max_height, max_width, min_height, min_width
  //     min_height: 600,
      
  //     // 编辑器底边距
  //     // autoresize_bottom_margin: 50,
      
  //     // 编辑器body部分距离左右2边的距离
  //     // autoresize_overflow_padding: 50,
      
  //     // 皮肤 与assets\library\tinymce\skins\ui 下文件夹对应，
  //     // 黑色
  //     // skin: 'oxide-dark',
      
  //     // 皮肤路径
  //     // skin_url: '/css/mytinymceskin'
      
  //     // 换行时，是否保留当前样式
  //     keep_styles: true,
      
  //     // html版本
  //     // 该值默认是html5，可选值还有：html4、html5-strict。
  //     // html5模式是完整的HTML5规范，它兼容旧的HTML4。html5-strict是HTML5的严格模式，它只允许HTML5规范的元素，不包括已经被移除标准的元素。html4模式则是包括完整的HTML4过渡规范。在需要兼容老旧浏览器时，可能会用到该选项。
  //     schema: 'html5',
      
  //     // 隐藏状态栏 取消底部标签和组件介绍信息 状态栏是与编辑器的可编辑区域底部对齐的灰色栏。状态栏包含路径信息和调整大小手柄。删除状态栏将使用户无法更改可编辑区域的大小。
  //     statusbar: true,
      
  //     // 是否允许改变高度，statusbar必须为true, 默认： true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
  //     resize: true,
      
  //     // 禁用状态栏的元素路径显示
  //     elementpath: false,
      
  //     // 禁用状态栏信息 使用该branding选项可以禁用状态栏中显示的“由Tiny提供支持”链接，以进行产品归因。重要提示：免费和开放源代码用户必须提供产品归因。有关TinyMCE归属要求的信息，请参阅：徽标和归属要求。
  //     branding: false,
      
  //     // 编辑区的样式，也可以指定css文件 默认：default dark(暗色背景) document(类似word) writer(类似word，只是比word宽一点)
  //     // content_css : '/mycontent.css' ,
  //     // content_css: 'document',
  
  //     // 语言
  //     language: 'zh_CN',
      
  //     // 浏览器的拼写检查
  //     // browser_spellcheck: true,
      
  //     // 支持鼠标右键的组件
  //     contextmenu: 'link image table media',
      
  //     // 禁用鼠标右键时打开浏览器菜单弹框，配合contextmenu使用，否则右键不弹框
  //     contextmenu_never_use_native: true,
      
  //     // 对话框支持拖动
  //     draggable_modal: true,
      
  //     // 开启拖入功能，true：禁止拖入
  //     paste_block_drop: false,
      
  //     // 允许粘贴图片
  //     paste_data_images: true,
      
  //     // 禁用默认粘贴过滤器
  //     paste_enable_default_filters: false,
  //     paste_filter_drop: false,
      
  //     // 禁用样式粘贴过滤器
  //     paste_remove_styles_if_webkit: false,
      
  //     // 检测类似于URL的文本，然后将其更改为超链接。
  //     // 检测类似于图像URL的文本，并尝试用图像替换文本。
  //     smart_paste: true,
      
  //     // 粘贴前的处理
  //     paste_preprocess: (plugin, args) => {
  //     // console.log(args.content);
  //     },
      
  //     // 粘贴到组件后，添加dom属性，组件默认添加了div，通过控制台可以看出该位置的div的id为12了
  //     paste_postprocess: (plugin, args) => {
  //     // console.log(args.node);
  //     // args.node.setAttribute('id', '42');
  //     },
      
  //     // 允许粘贴的元素，不管用
  //     // paste_word_valid_elements: 'strong,h1,h2',
      
  //     // 图片高级功能
  //     image_advtab: true,
      
  //     // 图片对话框中上传标签开关，false时只可以输入图片路径，没有上传入口
  //     image_uploadtab: true,
      
  //     // 是否开启图片标题设置的选择，这里设置否
  //     image_title: false,
      
  //     // 启用或禁用自动上传URL或Blob URI表示的图像
  //     automatic_uploads: true,
      
  //     // 自动生成图片名称
  //     images_reuse_filename: true,
      
  //     // 默认图片列表
  //     // image_list: (success) => {
  //     //   success([
  //     //       {title: '狗', value: 'mydog.jpg'},
  //     //       {title: '猫', value: 'mycat.gif'}
  //     //   ]);
  //     // },
      
  //     // 图片样式列表
  //     // image_class_list: [
  //     //   {title: '无', value: ''},
  //     //   {title: 'dog', value: 'dog_class'},
  //     //   {title: 'cat', value: 'cat_class'}
  //     // ],
      
  //     // 是否开启自动保存，退出页面或刷新时提示
  //     autosave_ask_before_unload: true,
      
  //     // 自动保存时间间隔 秒
  //     autosave_interval: '30s',
      
  //     // 本地保存数据的有效期 分
  //     autosave_retention: "5m",
      
  //     // 组件崩溃后是否自动还原最后保存的内容
  //     autosave_restore_when_empty: true,
      
  //     // 自定义快速工具栏
  //     // quickbars_selection_toolbar: 'bold italic | formatselect | quicklink blockquote',
      
  //     // 禁用快速工具栏
  //     quickbars_selection_toolbar: false,
      
  //     // 目录级别个数H1通过H9
  //     toc_depth: 9,
      
  //     // 自定义目录标签包裹，默认是H2
  //     // toc_header: 'div',
      
  //     // 目录样式
  //     // toc_class: 'myclass',
      
  //     // 粘性工具栏（或停靠工具栏），当向下滚动网页直到不再可见编辑器时，会将工具栏和菜单停靠在屏幕顶部。
  //     toolbar_sticky: true,
      
  //     // 工具栏位置 auto，top，bottom
  //     toolbar_location: 'top',
      
  //     // 工具栏的样式 'floating'，'sliding'，'scrolling'，或者'wrap'
  //     toolbar_mode: 'floating',
      
  //     // 从菜单栏中删除菜单
  //     // removed_menuitems: 'undo, redo',
      
  //     // 禁用菜单栏
  //     // menubar: false,
      
  //     // 设置模板，可以写路径，通过后端返回该格式的数组数据
  //     // templates:'http://192.168.9.22:18085/testAction/getTemplats',
  //     templates: [
  //     // content：html字符串数据
  //     {title: 'Some title 1', description: 'Some desc 1', content: '<p style="margin: 0cm; margin-bottom: .0001pt; text-align: center;" align="center"><span style="font-size: 14.0pt; font-family: 黑体;">我的模板1</span></p>'},
  //     // url：html文件
  //     {title: 'Some title 2', description: 'Some desc 2', url: '../../assets/templates/10218060374200.html'}
  //     ],
      
  //     // 类名称
  //     template_cdate_classes: "cdate creationdate",
      
  //     // 模板日期格式设置
  //     template_cdate_format: "%m/%d/%Y - %H:%M:%S",
      
  //     // 组件，在这里配置的组件才会生效
  //     plugins: [
  //     'toc advlist',
  //     'autolink lists link image charmap print preview anchor template',
  //     'searchreplace visualblocks code fullscreen pagebreak media',
  //     'insertdatetime table paste code help wordcount imagetools directionality autosave emoticons hr searchreplace codesample visualchars'
  //     ],
      
  //     // 工具栏分类 
  //     menubar: 'file edit insert view format table help export',
      
  //       // 工具栏具体的分类
  //     menu: {
  //     file: { title: 'File', items: 'newdocument undo redo | preview | print ' },
  //     edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
  //     view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | fullscreen codesample' },
  //     insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
  //     format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
  //     tools: { title: 'Tools', items: 'spellcheckerlanguage | code wordcount' },
  //     table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
  //     help: { title: 'Help', items: 'help' },
  //     // 自定义菜单
  //     export: { title: '导出', items: 'word pdf' }
  //     },
      
  //     // 工具栏图标
  //     toolbar1:
  //     'undo redo | formatselect | fontselect fontsizeselect lineheight | bold italic underline strikethrough forecolor backcolor | \
  //     alignleft aligncenter alignright alignjustify removeformat | preview template codesample remove selectall link image fullscreen',
  //     toolbar2:
  //     'bullist numlist quicktable outdent indent | anchor restoredraft emoticons hr pagebreak searchreplace toc | help',
      
  //     // 自定义菜单按钮 https://www.tiny.cloud/docs/ui-components/menuitems/#howtocreatecustommenuitems
  //     // setup: (editor) => {
  //     // // 基本菜单
  //     // editor.ui.registry.addMenuItem('word', {
  //     //   text: 'word',
  //     //   onAction: () => {
  //     //   this.downWord();
  //     //   }
  //     // });
  //     // editor.ui.registry.addMenuItem('pdf', {
  //     //   text: 'pdf',
  //     //   onAction: () => {
  //     //   this.downPdf();
  //     //   }
  //     // });
  //     // 嵌套菜单
  //     // editor.ui.registry.addNestedMenuItem('nesteditem', {
  //     //   text: 'My nested menu item',
  //     //   getSubmenuItems: () => {
  //     //   return [{
  //     //     type: 'menuitem',
  //     //     text: 'My submenu item',
  //     //     onAction: () => {
  //     //       alert('Submenu item clicked');
  //     //     }
  //     //   }];
  //     //   }
  //     // });
  //     // 切换菜单，如：设置on、off状态的 
  //     // editor.ui.registry.addToggleMenuItem('toggleitem', {
  //     //   text: 'My toggle menu item',
  //     //   icon: 'home',
  //     //   onAction: () => {
  //     //     this.toggleState = !this.toggleState;
  //     //     alert('Toggle menu item clicked');
  //     //   },
  //     //   onSetup: (api) => {
  //     //     api.setActive(this.toggleState);
  //     //     return () => {};
  //     //   }
  //     // });
  //     // },
      
  //     // 颜色列表列数
  //     color_cols: 4,
  //     // 关闭编辑器默认颜色
      
  //     // custom_colors: false,
      
  //     // 自定义颜色配置 自定义颜色后，不会显示调色板
  //     // color_map: [
  //     //     "000000", "Black",
  //     //     "993300", "Burnt orange",
  //     //     "333300", "Dark olive",
  //     //     "003300", "Dark green",
  //     //     "003366", "Dark azure",
  //     //     "000080", "Navy Blue",
  //     //     "333399", "Indigo",
  //     //     "333333", "Very dark gray",
  //     //     "800000", "Maroon",
  //     // ],
      
  //     // 撤销次数,默认无限次
  //     custom_undo_redo_levels: 30,
      
  //     // 行高 5.5版本后支持
  //     lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2',
      
  //     // 字体
  //     font_formats: 
  //           '宋体=simsun,serif;' +
  //           '仿宋=FangSong,serif;' + 
  //           '新宋体=NSimSun,serif;' + 
  //           '黑体=SimHei,serif;' + 
  //           '楷体=KaiTi,serif;' + 
  //           '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;' + 
  //           '隶书=LiSu,serif;' + 
  //           '幼圆=YouYuan,serif;' + 
  //           '华文细黑=STXihei,serif;' + 
  //           '华文楷体=STKaiti,serif;' + 
  //           '华文宋体=STSong,serif;' +
  //           // 默认字体
  //           'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
      
  //     // 字号
  //     fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      
  //     // 如果表格border为0，TinyMCE会在编辑区内的表格周围添加虚线框作为视觉辅助
  //     visual: true,
      
  //     // 支持本地图片上传
  //     powerpaste_allow_local_images: true,
      
  //     //  此设置控制如何过滤从Microsoft Word粘贴的内容。
  //     //  clean-保留标题，表格和列表等内容的结构，但删除内联样式和类。这样就产生了使用站点CSS样式表的简单内容，同时保留了原始文档的语义结构。
  //     //  merge-保留原始文档的内联格式和结构。无效和专有的样式，标记和属性仍会被删除，以确保HTML有效，同时更紧密地匹配原始文档格式。
  //     //  prompt -在尝试粘贴单词内容后提示用户在“清理”和“合并”选项之间进行选择
  //     // powerpaste_word_import: 'prompt',
  //     // powerpaste_html_import: 'prompt',
  
  //     // 粘贴为文本按钮的初始状态，开启后，只会粘贴文本内容
  //     paste_as_text: false,
      
  //     // 合并相同元素的内容
  //     paste_merge_formats: false,
      
  //     // 多少空格来表示HTML中的制表符
  //     paste_tab_spaces: 2,
      
  //     // 媒体实时预览开关 开启此选项后，用户可看到编辑区内嵌入视频的实时预览，而不是占位图, 此设置对video无效
  //     media_live_embeds: true,
      
  //     // 自定义媒体样式  http://tinymce.ax-z.cn/plugins/media.php
  //     video_template_callback: (data) => {
  //     return '<video width="' + data.width + '" height="' + data.height 
  //     + '"' + (data.poster ? ' poster="' + data.poster + '"' : '')
  //     + ' controls="controls">\n' + '<source src="' + data.source1 + '"' 
  //     + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' 
  //     + (data.source2 ? '<source src="' + data.source2 + '"' 
  //     + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') 
  //     + '</video>';
  //     },
      
  //     // 检查URL是否包含特殊内容，如包含则生成自定义的iframe，否则交给插件的默认逻辑生成默认代码
  //     media_url_resolver: (data, resolve) => {
  //     if (data.url.indexOf('YOUR_SPECIAL_VIDEO_URL') !== -1) {
  //       const embedHtml = '';
  //       resolve({html: embedHtml});
  //     }else{
  //       resolve({html: ''});
  //     }
  //     },
  
  //     // 分页
  //     pagebreak_separator: '<!-- my page break -->',
      
  //     // 拆分块元素
  //     pagebreak_split_block: true,
      
  //     // 为编辑区锚点自定义样式 my-custom-class是样式名
  //     visual_anchor_class: 'my-custom-class',
      
  //     // 为编辑区表格自定义样式
  //     visual_table_class: 'my-custom-class',
      
  //     // 代码示例列表，可以根据插入的文本内容，适配合适的样式，比如java代码和html样式区分开来
  //     // codesample_languages: [
  //     //   {text: 'HTML/XML', value: 'markup'},
  //     //   {text: 'JavaScript', value: 'javascript'},
  //     //   {text: 'CSS', value: 'css'},
  //     //   {text: 'PHP', value: 'php'},
  //     // ],
      
  //     // 自定义示例样式
  //     // codesample_content_css: '/static/prism.css',
  
  //     // 禁止输入字符
  //     // media_alt_source: true,
      
  //     // 禁用视频
  //     // media_filter_html: false,
      
  //     // 可以预览视频
  //     // media_live_embeds: true,
      
  //     // 禁用Poster媒体对话框中的输入字段
  //     // media_poster: true,
      
  //     // 自定义监听图片上传
  //     images_upload_handler: (blobInfo, succFun, failFun) => {
  //     let xhr;
  //     let formData;
  //     const file = blobInfo.blob();
  //     xhr = new XMLHttpRequest();
  //     xhr.withCredentials = false;
  //     xhr.open(
  //       'POST',
  //       // 上传图片服务器地址
  //       'https://file.leancloud.biz:4443/******',
  //     );
  //     xhr.onload = () => {
  //       let json;
  //       if (xhr.status !== 200) {
  //       failFun('HTTP Error: ' + xhr.status);
  //       return;
  //       }
  //       json = JSON.parse(xhr.responseText);
  //       // 这里是图片服务器返回的图片地址，需要根据实际情况自己处理
  //       succFun(
  //       'https://file.leancloud.biz:4445/' +
  //         json.listData[0].cDirRelativePath +
  //         '/' +
  //         json.listData[0].cUpDocumentName,
  //       );
  //     };
  //     formData = new FormData();
  //     formData.append('file', file, file.name);
  //     // 将图片显示到富文本编辑器中
  //     xhr.send(formData);
  //     }
  //   };
  // }

  // getImg() {
  //   this.http
  //     .post('http://222.133.2.154:14443/CNIC_FAndMServer/Sys_DocumentLibray_CNICM/getImageDocumnetInfos', {
  //       cDLCodes: this.listOfData.cPicturesCode,
  //     })
  //     .subscribe(
  //       (res: any) => {
  //         if (res.Result.iRsult === 1) {
  //           let name = res.listData[0].cDocumentName;
  //           let url = res.listData[0].cDocumentPath;
  //           let upName = res.listData[0].cUpDocumentName;
  //           this.fileList.push({ name: upName, url: url });
  //         } else {
  //           this.msg.error(res.Result.cRsultInfo);
  //         }
  //       },
  //       () => {
  //         this.msg.error('请检查网络连接');
  //       },
  //     );
  // }
  // tinymceOP() {
  //   if (!tinymce || !tinymce.editors || tinymce.editors.length === 0) {
  //     window.location.reload(true);
  //     tinymce.editors[0].hasVisual = true;
  //     tinymce.editors[0].hidden = false;
  //     // console.log(tinymce)
  //   }
  // }
  regUrl(url:any) {
    // const httpUrl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/
    const httpUrl = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
    return httpUrl.test(url);
  }
}
