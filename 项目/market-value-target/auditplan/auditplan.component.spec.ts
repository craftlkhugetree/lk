import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetAuditplanComponent } from './auditplan.component';

describe('MarketValueTargetAuditplanComponent', () => {
  let component: MarketValueTargetAuditplanComponent;
  let fixture: ComponentFixture<MarketValueTargetAuditplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetAuditplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetAuditplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
