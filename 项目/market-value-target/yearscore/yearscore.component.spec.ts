import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetYearscoreComponent } from './yearscore.component';

describe('MarketValueTargetYearscoreComponent', () => {
  let component: MarketValueTargetYearscoreComponent;
  let fixture: ComponentFixture<MarketValueTargetYearscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetYearscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetYearscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
