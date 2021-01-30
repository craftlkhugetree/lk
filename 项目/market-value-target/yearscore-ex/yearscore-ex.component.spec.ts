import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetYearscoreExComponent } from './yearscore-ex.component';

describe('MarketValueTargetYearscoreExComponent', () => {
  let component: MarketValueTargetYearscoreExComponent;
  let fixture: ComponentFixture<MarketValueTargetYearscoreExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetYearscoreExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetYearscoreExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
