import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-components-search-card',
  templateUrl: './search-card.component.html',
})
export class ComponentsSearchCardComponent implements OnInit {

 @Input() tableLoading: any;		//通过@input来修饰父组件中在子组件上定义的属性名
 @Input() id: any;		
 @Input() dad: any;
 @Input() search: any;

 @Input() isV:any;
 @Input() da:any;
 @Output() on1Cancel: any = new EventEmitter();
 @Output() on1Ok: any = new EventEmitter();  // 通过方法可以向父组件传值。

//  @Output() private toDad: any = new EventEmitter;


  public plzInput = '请输入';
  public inputLength = 200;
  
  constructor() { }


  ngOnInit() { 
  }

  search1() {
    this.search();
  }
  
  outSearch() {
    this.dad.outSearch();
    console.log(this.dad.dataSet, this.dad.isLoading, this.tableLoading);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['id']) {
    //   console.log(this.id);
    // }
    // if (changes['tableLoading']) {
    //     console.log('change:', this.tableLoading)
    // }
    if(changes['isV']) {
      console.log(this.isV);
      
    }
    if(changes['da']) {
      console.log(this.da);      
    }

  }

  onCancel() {
    this.on1Cancel.emit();
  }

  onOk() {
    this.on1Ok.emit();
  }

  public fromDad: any = '';
  imChild(msg) {
    this.fromDad += 'imMsg' + msg
    console.log(this.fromDad);
  }

  two() {
    console.log('222');
  }
}
