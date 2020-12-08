import { Component, OnInit } from '@angular/core';
import { MenuService, _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuChooseService } from '../../../services/menuchoose.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '@delon/theme';
declare let $:any;

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  // tab页签对象
  public tabArray: any;
  // logo
  public logo: any;
  // title
  public title: any;

  constructor(
    private titleService: TitleService,
    private httpClient: HttpClient,
    private menuService: MenuService,
    private cache: CacheService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private menuServe: MenuChooseService,
  ) {}
  setDefaultSysSet(resolve: any) {
    this.httpClient.get('assets/project-info.json').subscribe(
      (res: any) => {
        // 存储系统设置信息
        const setInfo: any = {
          default: true,
          title: res.sysInfo.title,
          logo: res.sysInfo.logo,
          loginBackground: res.sysInfo.loginBackground,
        };
        this.cache.set('zw_setInfo', JSON.stringify(setInfo), { type: 'm' });
      },
      () => {},
      () => {
        resolve ? resolve(null) : null;
      },
    );
  }
  ngOnInit() {
    // 获取当前授权的所有菜单数据
    const menuInfo: any = JSON.parse(window.sessionStorage.getItem('zw_menuInfo'));

    // 获取当前登录信息
    // const loginInfo: any = JSON.parse(window.sessionStorage.getItem("zw_loginInfo"));

    // 初始化菜单数据对象
    if (menuInfo === undefined || menuInfo === null || menuInfo === '' || menuInfo.length === 0) {
      this.tabArray = [];
      this.menuService.add([]);
    } else {
      this.tabArray = [];
      for (const obj of this.creatMenuData(menuInfo, 0)) {
        this.tabArray.push({
          text: obj.text,
          icon:obj.icon,
          content: [obj],
        });
      }
      // 初始化一次左侧菜单
      this.tabClickEvent(this.tabArray[0],0);

      // 初始化一次控制台监听触发
      // setTimeout(() => {
      //   this.menuServe.menuChooseEventer.emit(this.tabArray[0]);
      // },500)
    }
    let resolve: any;
    this.httpClient
      .post('/cnic-auth/ZwzqAction/getSystemManagement2', {
        url: JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account.cCNICSigID,
      })
      .subscribe(
        (res: any) => {
          if (res.code === 1) {
            this.title = res.data.sys_SystemManagement.cSystemTitle;
            this.logo = this.sanitizer.bypassSecurityTrustUrl(res.data.sys_SystemManagement.cSystemLOGOmin);
            // 存储系统设置信息
            const setInfo: any = {
              default: false,
              title: res.data.sys_SystemManagement.cSystemTitle,
              logo: res.data.sys_SystemManagement.cSystemLOGOmin,
              loginBackground: res.data.sys_SystemManagement.cLoginBackgroundImage,
            };
            this.cache.set('zw_setInfo', JSON.stringify(setInfo), { type: 'm' });
            resolve(null);
          } else {
            this.title = '奥链·政企协同平台';
            this.logo = this.sanitizer.bypassSecurityTrustUrl('../../../assets/img/logo.png');
            this.setDefaultSysSet(resolve);
          }
        },
        (error: any) => {
          this.setDefaultSysSet(resolve);
        },
        () => {
          this.titleService.separator = '';
          this.titleService.suffix = '';
        },
      );
  }

  // tab页签点击事件
  tabClickEvent(obj: any,index) {

    setTimeout(()=>{
      for(let i=0;i<this.tabArray.length;i++){
        $('#title' + i).css('background','#3789ff')
      }

      $('#title' + index).css('background','#69b3ff');
    },10);


    this.menuService.clear();
    this.menuService.add(obj.content);
    // 点击大菜单分组-默认打开第一个菜单
    let siderMenus = obj.content[0].children;
    if (siderMenus[0].children && siderMenus[0].children.length > 0) {
      this.menuService.openedByUrl(siderMenus[0].children[0].link);
      this.router.navigateByUrl(siderMenus[0].children[0].link);
    } else {
      this.menuService.openedByUrl(siderMenus[0].link);
      this.router.navigateByUrl(siderMenus[0].link);
    }

    this.menuServe.menuChooseEventer.emit(obj.content[0]);
  }

  // 递归处理菜单数据
  creatMenuData(menuObj: any, level: number) {
    const resObj: any = [];

    for (const obj of menuObj) {
      // 菜单基础对象 名称
      const itemObj: any = {
        text: obj.text,
        icon:obj.icon.value,
        key: obj.cMenuCode + ',' + obj.iMenuID,
        hideInBreadcrumb: true,
        reuse: true,
      };

      // tab群组级菜单
      if (level === 0) {
        itemObj.group = false;
      }

      // 1级菜单
      if (level === 1) {
        itemObj.icon = { type: 'icon', value: 'project' };
      }

      if (obj.children !== undefined && obj.children.length > 0) {
        itemObj.children = this.creatMenuData(obj.children, level + 1);
      } else {
        itemObj.link = obj.link;
      }

      resObj.push(itemObj);
    }

    return resObj;
  }

  // 显示工作台 首页
  showMain() {
    this.router.navigateByUrl('/');
  }
}
