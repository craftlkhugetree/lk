import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  current_org = JSON.parse(window.sessionStorage.getItem('zw_currentOrg'));
  account = JSON.parse(window.sessionStorage.getItem('zw_loginInfo')).account;

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit(): void {
    this.initdata()
  }

  searchObj = {
    // 组织ID
    cOrgUUID: this.current_org.cOrgUUID,
    // 帐套ID
    cAccUniqueID: this.account.cAccUniqueID,
  };
  landEvaluatingTable:any;
  initdata() {
    this.http.post('http://192.168.9.154:8081/cnic-dcas/AnalysisBySynthesisAction/getSpatialDataOverlay', this.searchObj)
    .subscribe((res: any) => {
      if (res.code === 1) {
        this.landEvaluatingTable = res.data;
      } else {
        console.log('error'); 
      }
    });
  }

}
