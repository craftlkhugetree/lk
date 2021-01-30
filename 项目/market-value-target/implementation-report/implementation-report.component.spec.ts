import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetImplementationReportComponent } from './implementation-report.component';

describe('MarketValueTargetImplementationReportComponent', () => {
  let component: MarketValueTargetImplementationReportComponent;
  let fixture: ComponentFixture<MarketValueTargetImplementationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetImplementationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetImplementationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
