import { Component, OnInit } from '@angular/core';

//引入服务,看其文件，暴露出的就是一个类
import {StorageService} from '../../services/storage.service';
var storagelk=new StorageService(); //这样可以使用服务，但不推荐

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public keyword:string=""
  public historyList:any[]=[];


  constructor(public storage:StorageService) {   //推荐的调用服务
    //console.log(storagelk.get())
    

  }

  ngOnInit(): void {
    console.log('页面刷新会触发这个生命周期函数')
    var searchlist:any = this.storage.get('searchlist');  //storage没专门声明
    if(searchlist){
      this.historyList = searchlist;
    }
  }

  keyDown(e){
    if(e.keyCode==13){
      this.doSearch()
    }else{
      return ''
    }
  } 

  doSearch(){
    
    if(this.historyList.indexOf(this.keyword)==-1){ //原数组中没有该元素
      this.historyList.push(this.keyword)
      this.storage.set('searchlist',this.historyList) //缓存数据，持久化
    }
    this.keyword=""
    console.log(this.keyword) /**上一句对this.keyword赋值空字符串，所以本句无输出了 */
  
  }

  deleteHistory(key){
    alert(key)
    this.historyList.splice(key,1)  /*删除一条记录*/
    this.storage.set('searchlist',this.historyList) 
  }
}
