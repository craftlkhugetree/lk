import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/table';
import { XlsxService } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-market-value-target-yearquery',
  templateUrl: './yearquery.component.html',
})
export class MarketValueTargetYearqueryComponent implements OnInit {
  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;
  login = JSON.parse(window.sessionStorage.getItem('zw_loginInfo'));

  // 时间
  date = new Date();
  // 责任部门
  data = null; 
  // 部门名称
  industrytype=[
    {cCustomClassName:'市委办公室'},
    {cCustomClassName:'市纪委监委机关'},
    {cCustomClassName:'市委巡察办'},
    {cCustomClassName:'市委宣传部'},
    {cCustomClassName:'市委组织部'},
    {cCustomClassName:'市委统战部'},
    {cCustomClassName:'军分区政治工作处'},
    {cCustomClassName:'市退役军人事务局'},
  ]
  // 考核对象
  data1 = null;
  // 对象名称 
  industrytype1=[
    // {cCustomClassName:'市发改委'},
    // {cCustomClassName:'市统计局'},
    // {cCustomClassName:'市水利局'},
    // {cCustomClassName:'市生态环境委考核监督专业委员会、办公室'},
    // {cCustomClassName:'市财政局'},
    // {cCustomClassName:'市委新冠肺炎疫情防控工作领导小组办公室'},
    // {cCustomClassName:'全省统一组织调查市“12345”市民热线管理中心'},
  ]

  // 表格数据
  list = [
    // {name:'地区生产总值增幅和“十强”产业、“四新”经济增加值占比提高的幅度',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'单位地区生产总值地方税收贡献率',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'投资结构优化情况（“四新”投资、工业技改投资、新旧动能转换重点项目投资、民间投资）',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'制造业和服务业传统动能优化升级情况',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'高新技术企业新增数量和高新技术产业产值占比提高的幅度',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'研发投入强度和科技成果转化情况',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'保就业保市场主体促增收情况',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17'},
    // {name:'新增规模以上工业企业数量及“双50强工业企业”培植成效',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'五个振兴”推进情况',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'稳住外贸外资基本盘情况',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'开发区综合发展水平',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'市委依法治市办',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'大项目、好项目（含外资项目、内资项目）',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'扶贫开发工作成效',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'社会大救助体系建设',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
    // {name:'单位地区生产总值能耗降低及煤炭消费压减',value:'1',value1:'2',value2:'3',value3:'4',value4:'5',value5:'6',value6:'7',value7:'8',value8:'9',value9:'10',value10:'11',value11:'12',value12:'13',value13:'14',value14:'15',value15:'16',value16:'17',},
  ];
  list1 = [{name:'前曹'},{name:"政企协同"}]
  list2 = [
    {name:"高新技术企业新增数量和高新技术产 业产值占比提高的幅度",前曹:1,政企协同:2},
    {name:"地区生产总值增幅和“十强”产业、“四 新”经济增加值占比提高的幅度",前曹:3,政企协同:4},
    {name:"上述领域发生特别重大事件，导致严重 后果，造成恶劣社会影响的",前曹:5,政企协同:6},
  ]
  // 表头
  listheade = [
    // {name:'市委办公室'},
    // {name:'市纪委监委机关'},
    // {name:'市委巡察办'},
    // {name:'市委宣传部'},
    // {name:'市委组织部'},
    // {name:'市委统战部'},
    // {name:'军分区政治工作处'},
    // {name:'市退役军人事务局'},
    // {name:'市发改委'},
    // {name:'市委政法委'},
    // {name:'市市场监管局'},
    // {name:'市委依法治市办'},
    // {name:'市司法局'},
    // {name:'市政府办公室'},
    // {name:'市审批服务局'},
    // {name:'市大数据局'},
    // {name:'市大数据局1'},
  ];
  // 表格宽度
  xlength = null;

  // 查询参数
  searchObj = {
    cAccUniqueID: this.account.cAccUniqueID, // "帐套唯一标识",
    cIndexName: null, // "指标名",
    dMkdir: null, //  "指标年份",
    listOrgUUID:[], // "字符串数组,考核对象UUID"
  }

  constructor(
    private http: _HttpClient,
     private modal: ModalHelper,
     private xlsx: XlsxService,
     private msg: NzMessageService,
     ) { }

  ngOnInit() { 
    this.xlength = this.listheade.length * 100 + 100 + 'px';
    // 获取考核对象
    this.getObj();
    // 查询数据
    this.search();
  }

  // 获取考核对象
  getObj(){
    this.http.get('http://192.168.9.16:18095/cnic-organizationdepartment/DeptManageAction/getAllDepts/'+ this.account.iSysID +"/null").subscribe((res) => {
      // console.log(res)
      if(res.code === 1){
        this.industrytype1 = res.data;
      }else{
        this.industrytype1 = [];
      }
    })
  }
  // 获取表格数据
  search(){
    // console.log(this.data1);
    this.searchObj.listOrgUUID = [];
    if(this.data1 !== null ){
      this.searchObj.listOrgUUID.push(this.data1);
    }
    // tslint:disable-next-line:radix
    this.searchObj.dMkdir = this.date.getFullYear();
    this.http.post('/cnic-organizationdepartment/ProvincialAction/getQuerySelect',this.searchObj).subscribe((res) => {
      // console.log(res);
      if(res.code === 200){
        this.listheade = res.data.list1;
        this.list = res.data.list2
      }else{
        this.msg.warning(res.msg);
        this.listheade = [];
        this.list = [];
      }
    })
  }


  // 日期选择
  onChange(result: Date): void {
    // console.log('onChange: ', result);
  }

  // 表格虚拟滚动
  trackByIndex(_: number, data): number {
    return data.name;
  }

  // 导出
  // tslint:disable-next-line: member-ordering
  columns: STColumn[] = [];
  import(){
    this.columns = [];
    let arr = []
    arr = this.listheade.map(i => i);
    arr.unshift({name:'组织名称'});
    // tslint:disable-next-line: prefer-for-of
    for(let i=0;i<arr.length;i++){
      this.columns.push({
        title: arr[i].name,
        index: arr[i].name,
      })
    };
    const data = [this.columns.map(i => i.title)];
    let brr = [];
    brr = this.list.map((item: any) => {
      item = JSON.parse(JSON.stringify(item));
      let arr1 = {};
      arr1['1'] = item.name;
      arr1['2'] = item.value;
      arr1['3'] = item.value1;
      arr1['4'] = item.value2;
      arr1['5'] = item.value3;
      arr1['6'] = item.value4;
      arr1['7'] = item.value5;
      arr1['8'] = item.value6;
      arr1['9'] = item.value7;
      arr1['10'] = item.value8;
      arr1['11'] = item.value9;
      arr1['12'] = item.value10;
      arr1['13'] = item.value11;
      arr1['14'] = item.value12;
      arr1['15'] = item.value13;
      arr1['16'] = item.value14;
      arr1['17'] = item.value15;
      arr1['18'] = item.value16;
      arr1['19'] = item.value17;
      arr1 = Object.values(arr1);
      return arr1;
    });
    data.push(...brr);
    this.xlsx.export({
      filename: '年终查询与统计.xlsx',
      sheets: [
        {
          data,
          name: '年终查询与统计',
        },
      ],
    });

  }


}
