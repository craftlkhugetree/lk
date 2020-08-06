import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/contact.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact:any;
  constructor(private contactService:ContactService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.paramMap)
    this.route.paramMap.subscribe(params=>{
      // 在组件中注入了ContactService和ActivatedRoute，在钩子函数ngOnInit()中检索将从路由中传递过来的id属性，并使用它获取我们分配给contact对象的联系人信息。
      console.log(params.get('id'),params)
      this.contactService.getContact(params.get('id')).subscribe(c => {
        console.log(c)
        this.contact=c
      })
    })
  }

}
