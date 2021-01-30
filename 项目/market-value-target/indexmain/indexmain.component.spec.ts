import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetIndexmainComponent } from './indexmain.component';

describe('MarketValueTargetIndexmainComponent', () => {
  let component: MarketValueTargetIndexmainComponent;
  let fixture: ComponentFixture<MarketValueTargetIndexmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetIndexmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetIndexmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
