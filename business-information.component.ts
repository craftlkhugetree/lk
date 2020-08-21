import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { STColumn } from '@delon/abc/table';
import { XlsxService } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reserve-management-business-information',
  templateUrl: './business-information.component.html',
})
export class ReserveManagementBusinessInformationComponent implements OnInit {
  // 时间
  date = new Date();
  dateRange = [];
  isEnglish = false;
  // 表格
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchAddress: string[] = [];

  // 下载模版表头
  templateHeader = [
    { name: '公司名称' },
    { name: '统一社会信用代码' },
    { name: '注册营业时间' },
    { name: '公司地址' },
    { name: '行业代码' },
    { name: '电话' },
    { name: '年' },
    { name: '月' },
  ];

  // 导入数据
  showInContral = false;
  isEdit = false;
  datatitle = [];
  data = [];
  listdata = [];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msg: NzMessageService,
    private i18n: NzI18nService,
    private xlsx: XlsxService,
  ) {}

  ngOnInit() {}

  // 时间限制
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  };
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log(result);
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  // 下载模版
  // tslint:disable-next-line: member-ordering
  columns: STColumn[] = [];
  download() {
    this.columns = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.templateHeader.length; i++) {
      this.columns.push({
        title: this.templateHeader[i].name,
        index: this.templateHeader[i].name,
      });
    }
    // tslint:disable-next-line: no-shadowed-variable
    const data = [this.columns.map(i => i.title)];
    data.push(...[]);
    this.xlsx.export({
      sheets: [
        {
          // tslint:disable-next-line: object-literal-shorthand
          data: data,
          name: 'sheet1',
        },
      ],
    });
  }

  // 导入数据
  upFile() {
    this.showInContral = true;
  }
  // excle导入更新
  change(e: Event) {
    const file = (e.target as HTMLInputElement).files![0];
    this.xlsx.import(file).then(res => this.getData(res));
  }
  // 渲染表格
  getData(res: any) {
    // console.log(res);
    if (res.sheet1 !== null && res.sheet1.length > 1) {
      this.isEdit = true;
      this.data = [];
      const details = res.sheet1;
      this.datatitle = details.splice(0, 1);
      this.data = details.map(item => {
        const obj = {
          companyName: '',
          companyCode: '',
          registeredTimeDate: '',
          companyAddress: '',
          industryCode: '',
          phoneNumber: '',
          year: '',
          month: '',
        };
        obj.companyName = item[0];
        obj.companyCode = item[1];
        obj.registeredTimeDate = item[2];
        obj.companyAddress = item[3];
        obj.industryCode = item[4];
        obj.phoneNumber = item[5];
        obj.year = item[6];
        obj.month = item[7];
        return obj;
      });

      // 表格搜索
      this.listdata = [...this.data];
      // console.log(this.data);
    } else {
      return this.msg.warning('未导入数据!');
    }
  }

  // 放弃导入
  giveUp() {
    this.isEdit = false;
    this.showInContral = false;
  }

  // 保存
  submitForm() {
    this.searchObj.data = this.data;
    this.http.post('/cnic-dcas/PubBaseAction/get', this.searchObj).subscribe(res => {
      console.log(res);
    });
  }

  // 查询条件
  // tslint:disable-next-line: member-ordering
  searchObj = {
    id: 123,
    name: 'ggg',
    data: null,
  };

  // 表格搜索
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: { companyName: string; companyCode: string; registeredTimeDate: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(
              registeredTimeDate => item.registeredTimeDate.indexOf(registeredTimeDate) !== -1,
            )
          : true) && item.companyName.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.data.filter((item: { companyName: string; companyCode: string; registeredTimeDate: string }) =>
      filterFunc(item),
    );
    this.listdata = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1,
    );
  }
}
