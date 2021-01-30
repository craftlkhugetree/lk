import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetSituationComponent } from './situation.component';

describe('MarketValueTargetSituationComponent', () => {
  let component: MarketValueTargetSituationComponent;
  let fixture: ComponentFixture<MarketValueTargetSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
