import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexPlanUploadComponent } from './plan-upload.component';

describe('ProvinceIndexPlanUploadComponent', () => {
  let component: ProvinceIndexPlanUploadComponent;
  let fixture: ComponentFixture<ProvinceIndexPlanUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexPlanUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexPlanUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
