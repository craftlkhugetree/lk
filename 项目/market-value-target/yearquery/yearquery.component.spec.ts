import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetYearqueryComponent } from './yearquery.component';

describe('MarketValueTargetYearqueryComponent', () => {
  let component: MarketValueTargetYearqueryComponent;
  let fixture: ComponentFixture<MarketValueTargetYearqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetYearqueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetYearqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
