// 1.判断输入是否存在
// 2.日期格式化输出
// 3.深拷贝
// 4.Angular 文件上传
// 产生展示文件列表
// 将服务器上已存在的文件删除
// 5.填充红绿灯。树表同高
// js修改考核对象样式
// 树表同高

export class Snippets {
  // 1.判断输入是否存在****************

  judgeText(str: any) {
    if (!!str && !!str.replace(/\s*/g, "")) {
      return true;
    }
    return false;
  }

  judgeNotText(str: any) {
    if (!str || !str.replace(/\s*/g, "")) {
      return true;
    }
  }

  // 2.日期格式化输出****************

  // this.dateFormat("YYYY-mm-dd HH:MM", new Date(i.dPubufts));
  dateFormat(fmt: any, date: any) {
    let ret: any;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }

  // 3.深拷贝，遍历对象中的每一个属性。typeof 'abc'="string";Date是"function";new Date()是"object"。字符串没有浅拷贝。

  deepClone(obj: any) {
    let result;
    if (typeof obj == "object") {
      result = this.isArray(obj) ? [] : {};
      for (let i in obj) {
        //isObject(obj[i]) ? deepClone(obj[i]) : obj[i]
        //多维数组或对象数组就递归
        result[i] =
          this.isObject(obj[i]) || this.isArray(obj[i])
            ? this.deepClone(obj[i])
            : obj[i];
      }
    } else {
      result = obj;
    }
    return result;
  }
  isObject(obj: any) {
    return Object.prototype.toString.call(obj) == "[object Object]";
  }
  isArray(obj: any) {
    return Object.prototype.toString.call(obj) == "[object Array]";
  }

  // 4.Angular 文件上传****************

  // <nz-upload [nzBeforeUpload]="beforeUpload" [(nzFileList)]="fileList" [nzRemove]="remove" [nzShowButton]="'true'" nzMultiple="true">
  //     <button nz-button ><i nz-icon nzType="upload"></i>上传</button>
  // </nz-upload>

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  // 暂存文件列表
  public fileArr = [];
  // 文件列表
  public fileList = [];
  // 备份接口传来的文件
  public fileListBK = [];
  // 文件删除列表
  public delFile = [];
  // 备份成功上传的文件，以备回滚
  public upOkSaveFailed = [];

  uploadFiles() {
    this.fileArr = [];
    if (this.fileList.length === 0) {
      this.saveIdx();
    } else {
      const formData = new FormData();
      // const reader = new FileReader();
      let serverFiles = 0;
      this.fileList.forEach((file: any, index) => {
        let fileF = true;
        for (let i = 0, len = this.fileListBK.length; i < len; i++) {
          if (
            this.fileListBK[i].cAddress === file.url &&
            this.fileListBK[i].cDocument === file.name
          ) {
            this.fileArr.push({
              cAddress: this.fileListBK[i].cAddress,
              cDocument: this.fileListBK[i].cDocument,
              cFileCode: this.fileListBK[i].cFileCode,
              cFileUUID: this.fileListBK[i].cFileUUID,
            });
            fileF = false;
            break;
          }
        }
        fileF ? formData.append("files[]" + index, file) : serverFiles++;
      });
      if (serverFiles === this.fileList.length) {
        this.saveIdx();
      } else {
        const req = new HttpRequest(
          "POST",
          this.login.cFileServerInfo +
            "/Sys_DocumentLibray_CNICM/upLoadImageDocument/" +
            this.account.iSysID +
            "/" +
            this.login.cUserName,
          formData,
          {
            // reportProgress: true,
          }
        );

        this.htp
          .request(req)
          .pipe(filter((e) => e instanceof HttpResponse))
          .subscribe((res: any) => {
            if (res.body && res.body.Result.iRsult === 1) {
              this.upOkSaveFailed = [];
              for (let i = 0; i < res.body.listData.length; i++) {
                const url =
                  this.login.cFileLoadServerInfo +
                  "/" +
                  res.body.listData[i].cDirRelativePath +
                  "/" +
                  res.body.listData[i].cUpDocumentName;
                // 已经上传成功的文件，页面保存需要这些文件的信息。但若页面保存失败，那么要删除这些文件。
                this.upOkSaveFailed.push(res.body.listData[i].cDLCode);

                this.fileArr.push({
                  cAddress: url,
                  cDocument: res.body.listData[i].cDocumentName,
                  cFileCode: res.body.listData[i].cDLCode,
                  cFileUUID: res.body.listData[i].cDLID,
                });
              }
              this.saveIdx();
            } else {
              this.msg.error(res.body.Result.cRsultInfo);
              // this.msg.error(res.Result.cRsultInfo);
            }
          });
      }
    }
  }

  saveIdx() {
    this.fileList.length === 0
      ? (this.upImpObj.fileList = null)
      : (this.upImpObj.fileList = this.fileArr);
    this.http
      .post(
        "/cnic-organizationdepartment/IndexPlanExecuteAction/saveExecuteInfo",
        this.upImpObj
      )
      .subscribe(
        (res: any) => {
          if (res.code === 1) {
            this.delFile.length > 0 ? this.deleteFile(this.delFile) : null;
            this.msg.success(res.msg);
            this.reUpImpObj();
          } else {
            this.msg.warning(res.msg);
            this.deleteFile(this.upOkSaveFailed);
          }
        },
        () => {
          this.msg.error("请检查网络连接");
        }
      );
  }

  // 删除文件列表
  remove = (file: UploadFile): boolean => {
    if (this.flag === 3) {
      return false;
    } else {
      for (let i = 0, len = this.fileListBK.length; i < len; i++) {
        if (
          this.fileListBK[i].cAddress === file.url &&
          this.fileListBK[i].cDocument === file.name
        ) {
          this.delFile.push(file.uid);
        }
      }
      return true;
    }
  };

  // 将服务器上已存在的文件删除
  deleteFile(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      this.http
        .get(
          this.login.cFileServerInfo +
            "/Sys_DocumentLibray_CNICM/deleteDocument/" +
            arr[i]
        )
        .subscribe(
          (res: any) => {
            if (res.Result.iRsult === 1) {
            } else {
              this.msg.error(res.Result.cRsultInfo);
            }
          },
          () => {
            this.msg.error("请检查网络连接");
          }
        );
    }
  }

  // 产生展示文件列表
  genFileList(t: any) {
    const fl = [];
    if (t && t.length > 0) {
      t.forEach((item) => {
        fl.push({
          name: item.cDocument,
          url: item.cAddress,
          uid: item.cFileCode,
        });
      });
    }
    return fl;
  }

  // 5.填充红绿灯。树表同高。紧凑指示灯*****************
  public already = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#96c1ff;text-align: center;background:#edf4ff;border: 0.3px solid #96c1ff;border-radius: 8px;">审核通过</div>`;
  public notAudit = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#fdc15e;text-align: center;background:#fff7ea;border: 0.3px solid #fdc15e;border-radius: 8px;">未审核</div>`;
  public reject = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">驳回</div>`;
  public notUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 70px;color:#c0c0c0;text-align: center;background:#f8f8f8;border: 0.3px solid #c0c0c0;border-radius: 8px;">未上报</div>`;
  // 七种指示灯
  public timeoutNotUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时未上报</div>`;
  public timeoutUp = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">已超时上报</div>`;
  public up = `<div style="font-size:14px;vertical-align: bottom;display:inline-block;width: 90px;color:#f76c74;text-align: center;background:#ffe9ea;border: 0.3px solid #f76c74;border-radius: 8px;">即将超时</div>`;
  public mark = [
    this.already,
    this.notAudit,
    this.reject,
    this.notUp,
    this.timeoutNotUp,
    this.timeoutUp,
    this.up,
  ];

  // 修改考核对象样式
  getTableExam() {
    let pageLeft: any = this.nzPageSize0;
    this.nzPageIndex0 * this.nzPageSize0 <= this.idxList.length
      ? (pageLeft = this.nzPageSize0)
      : (pageLeft = this.idxList.length % this.nzPageSize0);
    for (let i = 0; i < pageLeft; i++) {
      let flag: any = document.querySelector(`#flag${i}`) as HTMLElement;
      if (flag) {
        let str: any = this.idxList[
          (this.nzPageIndex0 - 1) * this.nzPageSize0 + i
        ].kaoHe;
        document.querySelector(`#flag${i}`).innerHTML = this.depAndStyle(str);
      }

      let depTable: any = document.querySelector(`#dep${i}`) as HTMLElement;
      if (depTable) {
        let depArr: any = this.idxList[
          (this.nzPageIndex0 - 1) * this.nzPageSize0 + i
        ].zeRen;
        let str: any = "";
        if (depArr && depArr.length > 0) {
          for (let i = 0, len = depArr.length; i < len - 1; i++) {
            str = str + depArr[i].cOrgName + "<br />";
          }
          str = str + depArr[depArr.length - 1].cOrgName;
          document.querySelector(`#dep${i}`).innerHTML = str;
        }
      }
    }
  }
  
  public depWrap =
    '<div style="float:left;"><div style="vertical-align: bottom;display:inline-block;width:140px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">';

  // 部门和红绿灯一起显示
  depAndStyle(str: any) {
    let tmp: any = "";
    if (str && str.length > 0) {
      for (let i = 0, len = str.length; i < len - 1; i++) {
        // tmp = tmp + this.depWrap + str[i].cOrgName + '</div>' + this.chooseLight(1) + '<br />';
        tmp =
          tmp +
          this.depWrap +
          str[i].cOrgName +
          "</div>" +
          this.chooseLight(str[i].iStite) +
          "<br />";
      }
      tmp =
        tmp +
        this.depWrap +
        str[str.length - 1].cOrgName +
        "</div>" +
        this.chooseLight(str[str.length - 1].iStite);
    }
    return tmp;
  }

  // 选择某种灯
  chooseLight(num: any) {
    let str = "";
    switch (num) {
      case 1:
        str = this.notUp;
        break;
      case 2:
        str = this.timeoutNotUp;
        break;
      case 4:
        str = this.timeoutUp;
        break;
      case 5:
        str = this.notAudit;
        break;
      case 6:
        str = this.already;
        break;
      case 7:
        str = this.reject;
        break;
      case 9:
        str = this.up;
        break;
      default:
        str = "无状态";
        break;
    }
    return str;
  }

  // 填充红绿灯。树表同高
  tableChange() {
    setTimeout(() => {
      this.getTableExam();
    }, 20);
    setTimeout(() => {
      this.setTreeHeight();
    }, 100);
  }

  // 设定树高与表格同高
  // <nz-table #rowSelectionTable [nzData]="idxList" [(nzPageIndex)]="nzPageIndex0" [(nzPageSize)]="nzPageSize0"
  // [nzLoading]="tableLoading" nzSize="small" [nzScroll]="{x:'1150px'}"
  // (nzCurrentPageDataChange)="tableChange()" nzShowPagination nzShowSizeChanger [nzPageSizeOptions]="nzPageSizeOptions">
  public tableHeightFlag = true;
  public treeHeightFlag = true;
  setTreeHeight() {
    const tableHeight = this._elementRef.nativeElement.querySelector(
      "#idxCardTable"
    );
    const card = this._elementRef.nativeElement.querySelector("#idxCardTree");
    const tree0 = this._elementRef.nativeElement.querySelector("#idxTree");
    // console.log(tableHeight.scrollHeight,tableHeight.offsetHeight,card.offsetHeight)
    const h = 660;
    if (!this.tableHeightFlag) {
      this._render.removeStyle(tableHeight, "height");
      this.tableHeightFlag = true;
    }
    if (!this.treeHeightFlag) {
      this._render.removeStyle(card, "height");
      this.treeHeightFlag = true;
    }
    if (tableHeight.offsetHeight <= h && card.offsetHeight <= h) {
      this._render.setStyle(tableHeight, "height", h + "px");
      this._render.setStyle(card, "height", h + "px");
      this.tableHeightFlag = false;
      this.treeHeightFlag = false;
    } else if (
      card.offsetHeight <= tableHeight.offsetHeight &&
      h <= tableHeight.offsetHeight
    ) {
      this._render.setStyle(card, "height", tableHeight.offsetHeight + "px");
      this.treeHeightFlag = false;
    } else if (
      tableHeight.offsetHeight <= card.offsetHeight &&
      h <= card.offsetHeight
    ) {
      this._render.setStyle(tableHeight, "height", card.offsetHeight + "px");
      this.tableHeightFlag = false;
    }
    // this._render.setProperty(tree, 'style', 'height:' + tableHeight.offsetHeight + 'px');
  }

  constructor(
    public http: _HttpClient,
    public modal: ModalHelper,
    public modalService: NzModalService,
    public htp: HttpClient,
    public msg: NzMessageService,
    public toolsService: ToolsService,
    public route: ActivatedRoute,
    public router: Router,
    public _elementRef: ElementRef,
    public _render: Renderer2,
    public orgServe: OrgChooseService,
    public menuService: MenuService
  ) {
    // 路由监听，路由改变时重新初始化富文本组件配置，解决切换菜单时组件不可编辑，数据清空的问题
    // angular的特性，是在切换tab时，会清空缓存，导致富文本组件没有重新渲染导致的。
    this.rooterChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.idxList = this.genTableData();
        this.getTableExam();
      }
    });
  }
}
