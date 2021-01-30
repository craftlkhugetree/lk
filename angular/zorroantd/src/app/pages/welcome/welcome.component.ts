import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';


@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number = 1,
    pageSize: number = 20,
    sortField: string,
    sortOrder: string,
    genders: string[]
  ): Observable<{}> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach((gender) => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params,
    });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: "welcome",
  providers: [RandomUserService],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {

  constructor(
    private randomUserService: RandomUserService,
    private btnModal: NzModalService,
    private renderInput: Renderer2,
    private http: HttpClient,
    private message: NzMessageService
  ) {}
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  tListOfData = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [
    { text: "male", value: "male" },
    { text: "female", value: "female" },
  ];
  searchGenderList: string[] = [];
  searchValue = "";

  dDataDate: Date = new Date(); //new 才能得到当天日期，默认为当前月份。
  @ViewChild("myInput", { static: false }) myInput: ElementRef; //终于找到了这个DOM

  
  // 第一列的一级指标
  // tslint:disable-next-line: member-ordering
  disData3 = [
    "销售收入（本月）",
    "产值（本月）",
    "增加值（本月）",
    "营业收入（本月）",
    "利润总额（本月）",
    "流动资产（本月）",
    "应收账款（本月）",
    "存货（本月）",
    "产成品（本月）",
    "固定资产原价（本月）",
    "资产总计（本月）",
    "负债合计（本月）",
    "营业成本（本月）",
    "税金及附加（本月）",
    "销售费用（本月）",
    "管理费用（本月）",
    "研发费用（本月）",
    "财务费用（本月）",
    "资产减值损失（本月）",
    "其他收益（本月）",
    "投资收益（本月）",
    "净敞口套期收益（本月）",
    "公允价值变动收益（本月）",
    "资产处置收益（本月）",
    "营业利润（本月）",
    "营业外收入（本月）",
    "应交增值税（本月）",
    "平均用工人数（本月）",
    // tslint:disable-next-line: quotemark
    "用电量（本月）",
  ];
  tmpFirstChecked = [
    {"nameOfTheIndustry": "销售收入（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 12999}, {"nameOfTheIndustry": "增加值（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13001}, {"nameOfTheIndustry": "营业收入（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13002}, {"nameOfTheIndustry": "利润总额（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13003}, {"nameOfTheIndustry": "流动资产（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13004}, {"nameOfTheIndustry": "应收账款（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13005}, {"nameOfTheIndustry": "存货（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13006}, {"nameOfTheIndustry": "产成品（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13007}, {"nameOfTheIndustry": "固定资产原价（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13008}, {"nameOfTheIndustry": "资产总计（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13009}, {"nameOfTheIndustry": "负债合计（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13010}, {"nameOfTheIndustry": "营业成本（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": null, "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13011}, {"nameOfTheIndustry": "税金及附加（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": null, "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13012}, {"nameOfTheIndustry": "销售费用（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13013}, {"nameOfTheIndustry": "管理费用（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13014}, {"nameOfTheIndustry": "研发费用（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13015}, {"nameOfTheIndustry": "财务费用（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13016}, {"nameOfTheIndustry": "资产减值损失（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13017}, {"nameOfTheIndustry": "其他收益（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13018}, {"nameOfTheIndustry": "投资收益（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13019}, {"nameOfTheIndustry": "净敞口套期收益（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13020}, {"nameOfTheIndustry": "公允价值变动收益（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13021}, {"nameOfTheIndustry": "资产处置收益（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13022}, {"nameOfTheIndustry": "营业利润（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13023}, {"nameOfTheIndustry": "营业外收入（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13024}, {"nameOfTheIndustry": "应交增值税（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13025}, {"nameOfTheIndustry": "平均用工人数（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13026}, {"nameOfTheIndustry": "用电量（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13027}, {"nameOfTheIndustry": "销售收入（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13028}, {"nameOfTheIndustry": "产值（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13029}, {"nameOfTheIndustry": "增加值（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13030}, {"nameOfTheIndustry": "营业收入（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13031}, {"nameOfTheIndustry": "利润总额（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13032}, {"nameOfTheIndustry": "流动资产（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13033}, {"nameOfTheIndustry": "应收账款（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13034}, {"nameOfTheIndustry": "存货（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13035}, {"nameOfTheIndustry": "产成品（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13036}, {"nameOfTheIndustry": "固定资产原价（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13037}, {"nameOfTheIndustry": "资产总计（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13038}, {"nameOfTheIndustry": "负债合计（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13039}, {"nameOfTheIndustry": "营业成本（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13040}, {"nameOfTheIndustry": "税金及附加（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13041}, {"nameOfTheIndustry": "销售费用（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13042}, {"nameOfTheIndustry": "管理费用（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13043}, {"nameOfTheIndustry": "研发费用（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13044}, {"nameOfTheIndustry": "财务费用（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13045}, {"nameOfTheIndustry": "资产减值损失（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13046}, {"nameOfTheIndustry": "其他收益（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13047}, {"nameOfTheIndustry": "投资收益（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13048}, {"nameOfTheIndustry": "净敞口套期收益（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13049}, {"nameOfTheIndustry": "公允价值变动收益（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13050}, {"nameOfTheIndustry": "资产处置收益（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13051}, {"nameOfTheIndustry": "营业利润（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13052}, {"nameOfTheIndustry": "营业外收入（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13053}, {"nameOfTheIndustry": "应交增值税（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13054}, {"nameOfTheIndustry": "平均用工人数（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13055}, {"nameOfTheIndustry": "用电量（累计）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 13056}, {"nameOfTheIndustry": "产值（本月）", "fieldNames": null, "whetherTheFieldIsDisplayed": "1", "expand": false, "cAccUniqueID": "m8p742eb8cb5d3684004bcdf308890550bd5", "cOrgUUID": "hs9rd700a59181e648c4b73a1e1b83c69241", "cOrgDepUUID": "eqrr6af78074513b4e1c81bc2eb7137b4a2e", "ruleType": 6, "enterpriseClassificationTableID": 14681}
   ];
  // tslint:disable-next-line: member-ordering
  disData = [];
  data7 = []

  data = [];      // 简略指标
  disData2 = [];  // 总的一级指标
  disData1 = [];  // 总的二级指标
  disData0 = [];  // 添加一级指标，上传的参数
  disData9 = []    // 添加二级指标，上传的参数
  objIndustry = {
    // 测试组织UUID
    // cAccUniqueID: "m8p742eb8cb5d3684004bcdf308890550bd5",
    // cOrgDepUUID: "eqrr6af78074513b4e1c81bc2eb7137b4a2e",
    // cOrgUUID: "hs9rd700a59181e648c4b73a1e1b83c69241",
    // 正式组织UUID
    cAccUniqueID: "i9v7abde112e80f1473f8b32c4b91d914d71",
    // cAccUniqueID: "y3msc3eb505c52c04926b1ace043754174b2",
    // cAccUniqueID: "tu5zb170d8cf8e604e2fa2faecfacdbe5b6a",
    // cAccUniqueID: "l48a2afc9fbc04614cb492055a4a93ee2cc5",
    // cOrgDepUUID: "q0djb881258c1090423c91ae347df0305284",
    // cOrgUUID: "vi59f11f8c5e5ca341d9ac2707653c2bef42",
    ruleType: null,
    whetherTheFieldIsDisplayed: null,
    nameOfTheIndustry: null,
    enterpriseClassificationTableID: null,
    fieldNames: null
  };
  disDataIF = [
    {nameOfTheIndustry: "工业", expand: false, id: 6 },
    {nameOfTheIndustry: "贸易业", expand: false, id: 8},
    {nameOfTheIndustry: "服务业", expand: false, id: 11},
    {nameOfTheIndustry: "劳资业", expand: false, id: 9},
    {nameOfTheIndustry: "房地产业", expand: false, id: 12},
    {nameOfTheIndustry: "建筑业营业收入", expand: false, id: 7},
    {nameOfTheIndustry: "建筑业产值", expand: false, id: 10},
  ];

  // 添加其他6个行业，先添加一级指标otherData1，再二级指标otherData2
  otherData1 = [
    {first:["商品销售额（本月）","商品销售额（累计）","其它"],id:8},
    {first:["营业收入（累计）"],id:11},
    {first:["完成投资（本年）","完成投资（本月）","商品房销售面积（本年）","商品房销售面积（本月）","商品房销售额（本年）","商品房销售额（本月）"],id:12},
    {first:["本季本年折旧（累计）","本季营业收入（累计）","本季营业成本（累计）","本季营业税金及附加（累计）","本季营业利润（累计）","本季应付职工薪酬（累计）","本季应交增值税（累计）"],id:7},
    {first:["本季签订的建筑合同额（累计）","本季建筑业总产值（累计）","本季竣工产值（累计）"],id:10},
    {first: ["本季从业人员期末人数（本季）", "本季从业人员工资总额（累计）", "本季从业人员平均工资（累计）", "本季劳务派遣人员平均工资（累计）"], id: 9},
  ]
  otherData2 = [
    {second:[["商品销售额","同期商品销售额","商品销售额同比"],["累计商品销售额","同期累计商品销售额","上月累计商品销售额","累计商品销售额同比"],["累计数比对差","累计本季营业收入"]],id:8},
    {second:[["累计营业收入","同期累计营业收入","累计营业收入同比"]],id:11},
    {second:[["本年完成投资","本年完成投资同比"],["单月完成投资","单月完成投资同比","单月完成投资环比"],["本年商品房销售面积","本年商品房销售面积同比"],
      ["单月商品房销售面积","单月商品房销售面积同比","单月商品房销售面积环比"],["本年商品房销售额","本年商品房销售额同比"],["单月商品房销售额","单月商品房销售额同比","单月商品房销售额环比"]],id:12},
    {second:[["累计本季本年折旧","累计本季本年折旧同比"],["累计本季营业收入","累计本季营业收入同比","累计本季销售收入-税务"],["累计本季营业成本","同期累计本季营业成本","累计本季营业成本同比"],
      ["累计本季营业税金及附加","累计本季营业税金及附加同比"],["累计本季营业利润","累计本季营业利润同比"],["累计本季应付职工薪酬","累计本季应付职工薪酬同比"],
      ["累计本季应交增值税","累计本季应交增值税同比","累计本季应交增值税-税务"]],id:7},
    {second:[["累计本季签订的建筑合同额","同期累计本季签订的建筑合同额","累计本季签订的建筑合同额同比"],["累计本季建筑业总产值","同期累计本季建筑业总产值","累计本季建筑业总产值同比"],
         ["累计本季竣工产值","同期累计本季竣工产值","累计本季竣工产值同比"]],id:10},
    {second: [["本季从业人员期末人数", "去年本季从业人员期末人数", "从业人员同/比增减"], ["累计本季从业人员工资总额", "去年累计本季从业人员工资总额", "从业人员同比累计工资增长"], ["累计本季从业人员平均工资", "去年累计本季从业人员平均工资", "从业人员同比平均工资增长"], ["累计本季劳务派遣人员平均工资", "去年累计本季劳务派遣人员平均工资", "劳务派遣同比平均工资增长"]], id: 9},
  ]
  other1 = []
  other2 = []

  dataQuery(result: Date): void {
    console.log(
      "点击日期与new Date(): ",
      result,
      result.getTime(),
      this.dDataDate,
      this.dDataDate.getTime()
    );
    console.log("Month:", this.dDataDate.getMonth() + 1);
    let tmpDate = new Date(result.getTime());
    let tmpYear = tmpDate.getFullYear();
    let tmpMonth = tmpDate.getMonth() + 1;
    let tempD = this.tListOfData.filter(
      (i) => new Date(i.dob.date).getMonth() + 1 === tmpMonth
    );
    console.log(
      "条件查询日期：",
      tmpDate,
      tmpYear,
      tmpMonth,
      this.listOfData,
      this.tListOfData,
      tempD
    );
    this.listOfData = tempD;
  }
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  showConfirm(index: number): void {
    this.btnModal.confirm({
      nzTitle: "<i>确定要退回正式库吗?</i>",
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        // this.tListOfData.splice(index,1);  splice等不起作用，只有filter能自动更新页面。而且注意slice的数据是在[0]里
        this.tListOfData = this.tListOfData.filter(
          (i) => this.listOfData.slice(index, index + 1)[0].email != i.email
        );
        this.listOfData = this.listOfData.filter(
          (i) => this.listOfData.slice(index, index + 1)[0].email != i.email
        );
        let querylen = this.listOfData.length;
        if (querylen === 0) {
          this.listOfData = this.tListOfData;
        }
        console.log("回退：", index, this.tListOfData);
      },
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    console.log(this.sortKey, this.sortValue);
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    //选择日期查询，取得全部数据后，本地筛选
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService //为何一定要远程数据，本地不是有一份数据了吗？
      .getUsers(
        this.pageIndex,
        this.pageSize,
        this.sortKey!,
        this.sortValue!,
        this.searchGenderList
      ) //感叹号(非空断言操作符) ，如果为空，会丢出断言失败。
      .subscribe((data: any) => {
        this.loading = false;
        this.total = 100;
        this.tListOfData = data.results;
        this.listOfData = this.tListOfData.filter(
          (i) =>
            new Date(i.dob.date).getMonth() + 1 === new Date().getMonth() + 1
        ); //仅看相同月份，不考虑年
        console.log("data:", data);
        console.table("全部数据:", this.tListOfData);
        console.log("渲染数据：", this.listOfData);
      });
  }

  search(): void {
    //输入查询日期
    // document.getElementById('getFocusInput').focus(); //在这里执行document语句？
    let tdate = new Date(this.searchValue);
    let ttmp = this.tListOfData.filter(
      (i) => tdate.getFullYear() === new Date(i.dob.date).getFullYear()
    ); //仅展示同一年
    this.listOfData = ttmp;
    // this.dDataDate = tdate //选项口与搜索框同步
    // const filterFunc = (item: { name: object,gender: string, email:string,registeredTimeDate: string }) => {
    //   return (
    //     (this.listOfData.length  //长度为零时，三元选择符选后者。
    //       ? this.listOfData.some(
    //           registeredTimeDate => item.registeredTimeDate.indexOf(registeredTimeDate) !== -1,
    //         )
    //       : false) && item.companyName.indexOf(this.searchValue) !== -1
    //   );
    // };
    // const data = this.data.filter((item: { companyName: string; companyCode: string; registeredTimeDate: string }) =>
    //   filterFunc(item),
    // );
    // this.listdata = data.sort((a, b) =>
    //   this.sortValue === 'ascend'
    //     ? a[this.sortName!] > b[this.sortName!]
    //       ? 1
    //       : -1
    //     : b[this.sortName!] > a[this.sortName!]
    //     ? 1
    //     : -1,
    // );
  }
  keydown(e: any) {
    if (e.which === 13) {
      this.search();
    }
  }

  // 20201121 删除工业某些字段
  // tslint:disable-next-line: member-ordering
  someIndustry = 
  [
"平均用工人数",

"流动资产",

"应收账款",

"存货",

"产成品",

"固定资产原价",

"资产总计",

"负债合计",

    ]
    someIndustryPlusMonth = [];
  getData3() {
    this.data7 = []
    this.objIndustry.nameOfTheIndustry = null;
    this.objIndustry.enterpriseClassificationTableID = null;
    this.objIndustry.whetherTheFieldIsDisplayed = null;
    this.objIndustry.fieldNames = null;
    for (let i = 6; i <= 12; i++){
      this.objIndustry.ruleType = i;
      let tmp: any = this.disDataIF.filter(item => item.id === i)
      this.http
      .post(
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustry",
        "https://gateway.leancloud.biz:4443/cnic-projectmanagement/IndustrialGroupaction/getIndustrialFinancial",
        // "http://192.168.9.154:8081/cnic-projectmanagement/IndustrialGroupaction/getIndustrialFinancial",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllClassificationFieldIndustryCalss",
        this.objIndustry
      )
      // tslint:disable-next-line: max-line-length
      // this.http.post('/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAllFieldAndFixedFieldSettingsInTheIndustryCalss',this.objIndustry,)
      .subscribe((res: any) => {
        if (res.code === 1) {
          this.disData =
            // res.data.getAllClassificationFieldIndustry;
            res.data.getIndustrialFinancial;
            // res.data.getAllFieldAndFixedFieldSettingsInTheIndustryCalss;
          console.log(`一二级指标disData,${tmp[0].nameOfTheIndustry}:`, this.disData);
          if (i === 6){
              // this.data7 = [...this.disData]
              this.data7 = [];
              this.disData.map(item => {
                this.someIndustry.map(i => {
                  if (item.nameOfTheIndustry === (i+'（本月）')) {
                      this.data7.push(item);
                  }
                })
              })
              console.log("哪个行业:", this.disDataIF.filter(item => item.id === i)[0].nameOfTheIndustry, this.data7)
              // this.delData()
          }
        } else {
          this.message.warning(res.msg);
        }
      });
    }
  }
  
  produceData() {
    // 解析出简略指标
    for (let i = 0; i < this.disData3.length; i++) {
      this.data.push(this.disData3[i].split("（")[0]);
    }
    // 生成总的一级指标，总的二级指标，添加二级指标数组
    this.disData2 = [...this.disData3];
    for (let i = 0; i < this.data.length; i++) {
      this.disData2.push(this.data[i] + "（累计）");
      let tmp = {...this.objIndustry}
      tmp.ruleType = 6
      tmp.nameOfTheIndustry = this.disData2[i]
      if (i < 5){
        this.disData1.push(this.data[i])
        let a = {...tmp}
        a.fieldNames = this.data[i]
        this.disData9.push(a)
        this.disData1.push(this.data[i] + '同比')
        let b = {...tmp}
        b.fieldNames = this.data[i] + '同比'
        this.disData9.push(b)
        this.disData1.push(this.data[i] + '环比')
        let c = {...tmp}
        c.fieldNames = this.data[i] + '环比'
        this.disData9.push(c)
      }else {
        this.disData1.push(this.data[i])
        let d = {...tmp}
        d.fieldNames = this.data[i]
        this.disData9.push(d)
        this.disData1.push(this.data[i] + '同比')
        let e = {...tmp}
        e.fieldNames = this.data[i] + '同比'
        this.disData9.push(e)
      }
    }

    for (let i = 29; i < this.disData2.length; i++){
      let tmp = {...this.objIndustry}
      tmp.ruleType = 6
      tmp.nameOfTheIndustry = this.disData2[i]

      this.disData1.push('累计' + this.data[i - 29])
      let a = {...tmp}
      a.fieldNames = '累计' + this.data[i - 29]
      this.disData9.push(a)
      this.disData1.push('累计' + this.data[i - 29] + '同比')
      let b = {...tmp}
      b.fieldNames = '累计' + this.data[i - 29] + '同比'
      this.disData9.push(b)
    }

    // 添加一级指标数组
    for (let i = 0; i < this.disData2.length; i++){
      this.disData0[i] = {...this.objIndustry};
      this.disData0[i].ruleType = 6;
      this.disData0[i].nameOfTheIndustry = this.disData2[i]
    }
    console.log("工业：简略指标，总的一级指标，总的二级指标，添加二级指标", this.data, this.disData2, this.disData1, this.disData9);

    this.someIndustryPlusMonth = [];
    this.disData9.map(item => {
      this.someIndustry.map(i => {
        if(i+'（本月）' === item.nameOfTheIndustry) {
          let obj:any = {class:item.nameOfTheIndustry, field:item.fieldNames};
          this.someIndustryPlusMonth.push(obj);
        }
      })
    })
    console.log("工业删的八条",this.someIndustryPlusMonth);

  }

  // 测试平台删除工业，正式平台要改组织id
  delData() {
    this.objIndustry.nameOfTheIndustry = null;
    this.objIndustry.ruleType = 6;
    this.objIndustry.enterpriseClassificationTableID = null;
    this.objIndustry.whetherTheFieldIsDisplayed = null;
    this.objIndustry.fieldNames = null;
    let tmpObj = []
    for ( let i = 0; i < this.tmpFirstChecked.length; i++){
      tmpObj[i] = {...this.tmpFirstChecked[i]}
      tmpObj[i].enterpriseClassificationTableID = null;
      tmpObj[i].whetherTheFieldIsDisplayed = null;
      // tmpObj[i].cAccUniqueID= "l48a2afc9fbc04614cb492055a4a93ee2cc5";
      // tmpObj[i].cOrgDepUUID="q0djb881258c1090423c91ae347df0305284";
      // tmpObj[i].cOrgUUID="vi59f11f8c5e5ca341d9ac2707653c2bef42";
      // tmpObj[i].ruleType = 12;
    }
    this.http
      .post(
        " https://gateway.leancloud.biz:4443/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelClassificationField",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelClassificationField",
        this.data7
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  // 添加工业
  addData1() {
    // 先删除，再添加disData0,最后添加disData9
    this.http
      .post(
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings",
        "https://gateway.leancloud.biz:4443/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdClassificationField",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings",
        this.disData9
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
          // this.disData =
          //   res.data.getupdClassificationField;
            // res.data.getAllFieldAndFixedFieldSettingsInTheIndustryCalss;
          console.log("disData3:", this.disData3);
        } else {
          this.message.warning(res.msg);
        }
      });
  }
  produceOther1(){
    for (let i = 0; i < this.otherData1.length; i++){
      for (let j = 0; j < this.otherData1[i].first.length; j++){
        this.otherData2[i].second[j].map(item => {
          let t: any = {...this.objIndustry}
          t.ruleType = this.otherData1[i].id;
          t.nameOfTheIndustry = this.otherData1[i].first[j];
          t.fieldNames = item;
          this.other2.push(t);
        });
      }
      this.otherData1[i].first.map(item => {
        let tmp: any = {...this.objIndustry};
        tmp.nameOfTheIndustry = item;
        tmp.ruleType = this.otherData1[i].id;
        this.other1.push(tmp);
      })
    }
    console.log("other1,2:", this.other1, this.other2)
  }

  addOther(){
      this.http
      .post(
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings",
        "https://gateway.leancloud.biz:4443/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getAddBaseSettings",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdClassificationField",
        // "http://192.168.9.154:8081/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getupdBaseSettings",
        this.other2
        // 先添加一级指标otherData1，再二级指标otherData2
      )
      .subscribe((res: any) => {
        if (res.code === 1) {
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  alertData = [{"cAccUniqueID":"l48a2afc9fbc04614cb492055a4a93ee2cc5","cOrgUUID":"vi59f11f8c5e5ca341d9ac2707653c2bef42","cOrgDepUUID":"q0djb881258c1090423c91ae347df0305284","dPubufts":"2020-09-21T06:19:15.603Z","ruleType":3,"cEnterpriseNameClass":null,"cEnterprisecode":null,"cEnterpriseName":null,"ruleDescription":"劳资业: |([应付职工薪酬(各专业)] - [工资总额])| >= ","ruleOfValue":"0.2","nameOfTheIndustry":null,"fieldNames":null,"whetherTheFieldIsDisplayed":null,"dataProcessing":null,"enterpriseClassificationTableUUID":"732D360F4ADD423C9F7B2B58C20ACDBB","enterpriseClassificationTableID":144,"dataProcessingCode":null},{"cAccUniqueID":"l48a2afc9fbc04614cb492055a4a93ee2cc5","cOrgUUID":"vi59f11f8c5e5ca341d9ac2707653c2bef42","cOrgDepUUID":"q0djb881258c1090423c91ae347df0305284","dPubufts":"2020-09-21T06:19:15.603Z","ruleType":3,"cEnterpriseNameClass":null,"cEnterprisecode":null,"cEnterpriseName":null,"ruleDescription":"劳资业: |([应付职工薪酬(各专业)] - [工资总额])| <= ","ruleOfValue":"0.6","nameOfTheIndustry":null,"fieldNames":null,"whetherTheFieldIsDisplayed":null,"dataProcessing":null,"enterpriseClassificationTableUUID":"F5E6F0CC45954A39A1B63EDA6EB5E91C","enterpriseClassificationTableID":145,"dataProcessingCode":null},]
  delAlert() {
    let tmpObj = this.alertData;
    this.http
      .post('https://gateway.leancloud.biz:4443/cnic-projectmanagement/EconomicAnalysisBaseSettingaction/getdelBaseSettings', tmpObj)
      .subscribe((res: any) => {
        if (res.code === 1) {
          // console.log('删除规则成功：', delIndex, tmpObj);
        } else {
          this.message.warning(res.msg);
        }
      });
  }

  ngOnInit(): void {
    this.produceData();
    this.produceOther1();
    this.getData3();
    // 其他六个行业的添加和删除
    // this.addOther();
    // this.delData();
    console.log('删除预警规则：',this.alertData)
   

    // 工业先添加一级，再添加二级。慎用，会复制二级指标，这样只能用delData()删除了。
    // this.addData1(); 
  }
}
/**
 *  
 "/CNIC_M/*": {
    "target": "http://b.leancloud.biz",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/cnic-auth/*": {
    "target": "https://gateway.leancloud.biz:4443",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
 */

 /**
  * 
  "/CNIC_M/*": {
    "target": "http://192.168.16.103:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/cnic-auth/*": {
    "target": "http://192.168.9.154:8081",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  */


