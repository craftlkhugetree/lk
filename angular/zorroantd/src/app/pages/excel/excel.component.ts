import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { XlsxService } from '@delon/abc/xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelComponent implements OnInit {
  data = [
    ['1','a','aa'],
    ['2','b','bb'],
    ['3','c','cc']
  ]
  inputdata = []
  dataDelon:any;
  constructor(private xlsx: XlsxService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
  }

  url(): void {
    this.xlsx.import(`../../assets/SheetJS.xlsx`).then(res => {
      this.dataDelon = res;
      console.log(res)
      this.cdr.detectChanges();
    });
  }

  change(e: Event): void {
    // const node = e.target ;
    const node = e.target as HTMLInputElement;  // HTMLInputElement 接口提供了特定的属性和方法（继承自常规的HTML元素接口）用于管理输入元素的布局和外观。
    console.log("node,e:",node,e,node.files,node.files[0],node.files![0])
    this.xlsx.import(node.files![0]).then(res => {  // 感叹号(非空断言操作符) ，如果node.files可能为空，可以用这个，如果为空，会丢出断言失败。
      this.dataDelon = res;
      this.cdr.detectChanges();
      console.log("res,cdr:",res,this.cdr)
    });
    node.value = '';
  }

  // 导出
  daochu(){
    /* generate worksheet */
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    // const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.inputdata);
    const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.inputdata);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
 
    console.log("wb:",wb)
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
 
  // 导入
  daoru(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    // let f = evt.raw;
    const reader: FileReader = new FileReader();
    // reader.readAsArrayBuffer(target.files[0])
    console.log(evt)
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
 
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
 
      /* save data */
      // this.inputdata = (XLSX.utils.sheet_to_html(ws));
      // let range = XLSX.utils.decode_range(ws['!ref']);  //行列数
      // console.log("rangeDecode:",range)      
      // this.inputdata = (XLSX.utils.sheet_to_json(ws));
      this.inputdata = (XLSX.utils.sheet_to_json(ws, {header: 1}));


      // console.log("inputdata",reader,e,e.target,bstr,wb,wsname,ws,this.inputdata)
      console.log(wb,this.inputdata,this.inputdata.splice(0,1))
      this.inputdata.map( i=>{
        // console.log(i.length,i[0],i[1]);
      })
 
      evt.target.value="" // 清空
    };
    reader.readAsBinaryString(target.files[0]);
 
  }
 
}