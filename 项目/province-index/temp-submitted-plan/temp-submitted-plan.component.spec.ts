import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexTempSubmittedPlanComponent } from './temp-submitted-plan.component';

describe('ProvinceIndexTempSubmittedPlanComponent', () => {
  let component: ProvinceIndexTempSubmittedPlanComponent;
  let fixture: ComponentFixture<ProvinceIndexTempSubmittedPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexTempSubmittedPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexTempSubmittedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
