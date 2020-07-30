import { Component, OnInit } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {StorageService} from '../../services/storage.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public keyword:string=""

  public todolist:any[]=[]


  constructor(public storage:StorageService) { }

  ngOnInit(): void {
    console.log('页面刷新会触发这个生命周期函数')
    var todolist:any = this.storage.get('todolist');  //storage没专门声明
    if(todolist){
      this.todolist = todolist;
    }
  }

  

  doAdd(e) {
    
    if (e.keyCode == 13) {
      if (!this.todolistHasKeyword(this.todolist, this.keyword)) {
        this.todolist.push({
          title: this.keyword,
          status: 0  //0表示待办，1表示完成
        })
        this.keyword = ''

        this.storage.set('todolist',this.todolist)
      } else {
          alert('already exist!')
          this.keyword = ''
        }
    }

    
  }


  deleteData(key){
    this.todolist.splice(key,1)
    this.storage.set('todolist',this.todolist)
  }

  // todolistHasKeyword(todolist,keyword){//   异步会存在问题
  //   todolist.forEach(value => {
  //     if(value.title==keyword){
  //       return true;
  //     }
  //     return false;
  //   })
  // }
  
  // function isHas(arr, val) {
  //   let isFind = false
  //   arr.forEach(item = {
  //   if (val === item) {
  //   isFind = true
  //   }
  //   })
  //   return isFind
  //   }
  //   let res = isHas(【1, 2, 3, 4】, 2)
  //   console.log(res)
    // 想要使用forEach遍历，你需要这么写。
    // 大地老师那么写不行的原因是：forEach循环是无法使用return 跳出循环的，当循环执行完毕，最终返回的结果就是 return 0。
    // 纠正一下forEach是同步遍历，不是异步。


  todolistHasKeyword(todolist:any,keyword:any){
    if(!keyword) return false;
    for(var i=0;i<todolist.length;i++){
      if(todolist[i].title==keyword){
        return true
      }
    }
    return false  //不能写成else！！
  }

  checkboxch(){
    console.log('changebox触发')
    this.storage.set('todolist',this.todolist)
  }
  
}
