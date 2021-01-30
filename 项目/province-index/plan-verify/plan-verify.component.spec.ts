import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexPlanVerifyComponent } from './plan-verify.component';

describe('ProvinceIndexPlanVerifyComponent', () => {
  let component: ProvinceIndexPlanVerifyComponent;
  let fixture: ComponentFixture<ProvinceIndexPlanVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexPlanVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexPlanVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
