import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetImplementReportComponent } from './implement-report.component';

describe('MarketValueTargetImplementReportComponent', () => {
  let component: MarketValueTargetImplementReportComponent;
  let fixture: ComponentFixture<MarketValueTargetImplementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetImplementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetImplementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
