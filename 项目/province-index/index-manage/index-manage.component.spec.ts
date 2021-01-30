import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexIndexManageComponent } from './index-manage.component';

describe('ProvinceIndexIndexManageComponent', () => {
  let component: ProvinceIndexIndexManageComponent;
  let fixture: ComponentFixture<ProvinceIndexIndexManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexIndexManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexIndexManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
