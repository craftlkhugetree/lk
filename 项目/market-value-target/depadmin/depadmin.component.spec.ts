import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetDepadminComponent } from './depadmin.component';

describe('MarketValueTargetDepadminComponent', () => {
  let component: MarketValueTargetDepadminComponent;
  let fixture: ComponentFixture<MarketValueTargetDepadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetDepadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetDepadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
