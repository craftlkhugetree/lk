/** @Author: Adrian
 * @Prominent: Administrator
 * @Date: 2020/12/10 08:00
 * @Version: 1.0
 */
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, MenuService } from '@delon/theme';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd/upload';
import { ToolsService } from 'src/app/services/tools.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OrgChooseService } from '../../../services/orgchoose.service';
import { ProvinceIndexIndexManageComponent } from '../index-manage/index-manage.component';
@Component({
  selector: 'app-province-index-index-batch-release',
  templateUrl: './index-batch-release.component.html',
})
export class ProvinceIndexIndexBatchReleaseComponent extends ProvinceIndexIndexManageComponent {
  // 视窗数据
  public depList = [];
  // 获取末级指标
  // public endObj = {
  //   "cIndexUUID": null,
  //   "iStite": null,
  //   "iRelease": null,
  //   "dMkdir": null,
  //   "cIndexName": null,
  //   "iIndexType": 2
  // }

  // 顶部搜索
  search() {
    this.tableLoading = true;
    this.idxSearchObj.dMkdir = !!this.idxYear ? this.idxYear.getFullYear() : null;
    // this.endObj.iRelease = this.idxSearchObj.iRelease;
    this.http
      .post('cnic-organizationdepartment/ProvincialAction/getIndexSel', this.idxSearchObj)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.idxList = res.data;
          this.checkedId();
        } else {
          this.msg.warning(res.msg);
        }
      });
    setTimeout(() => {
      this.tableLoading = false;
    }, 200);
  }

  // 表格数据变化
  tableChange1(e: any) {
    this.depList = e;
    this.refreshStatus();
    setTimeout(() => {
      this.getTableExam();
      this.setTreeHeight();
    }, 100);
  }

  // 添加勾选id
  checkedId() {
    this.idxList.forEach((item,index) => {
      item.id = index;
    })
    this.mapOfCheckedId = {};
  }

  dealWithCast(e: any, state: any) {
    this.listIndex = [];
    const api =
      state === 'cast'
        ? 'cnic-organizationdepartment/ProvincialAction/getIndexIssue'
        : 'cnic-organizationdepartment/ProvincialAction/getIndexIssueNo';

    if (e === -1) {
      for (let obj in this.mapOfCheckedId) {
        if (obj !== "undefined" && !!obj && this.mapOfCheckedId[obj]) {
          this.listIndex.push(this.idxList[parseInt(obj)].cIndexUUID);
        }
      }
      if(this.listIndex.length === 0) {
        this.msg.warning('未选择指标！')
        return;
      }
    } else {
      this.listIndex.push(this.idxList[e].cIndexUUID);
    }
    this.http.post(api, { listIndex: this.listIndex }).subscribe((res: any) => {
      if (res.code === 200) {
        this.listIndex.forEach(item => {
          this.idxList.forEach(i => {
            item.cIndexUUID === i.cIndexUUID ? i.iRelease = !i.iRelease : null;
          })
        })
        // this.idxList[e].iRelease = !this.idxList[e].iRelease;
        this.clickTreeTable();
        this.msg.success(res.msg);
      } else {
        this.msg.warning(res.msg);
      }
      // this.mapOfCheckedId = {};
      this.listIndex = [];
    });
  }


  clickTreeTable() {
    this.http
        .post('cnic-organizationdepartment/ProvincialAction/getIndexSel', 
        { 
          cIndexUUID: null,
          iIndexType: 2,
          cAccUniqueID: this.account.cAccUniqueID,
          dMkdir:  !!this.idxYear ? this.idxYear.getFullYear() : new Date().getFullYear(),
         })
        .subscribe((res: any) => {
          if (res.code === 200) {
            this.idxList = !!res.data ? res.data : [];
            this.checkedId();
          } else {
            this.msg.warning(res.msg);
          }
        });
  
  }
}
