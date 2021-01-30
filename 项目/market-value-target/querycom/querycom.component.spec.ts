import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetQuerycomComponent } from './querycom.component';

describe('MarketValueTargetQuerycomComponent', () => {
  let component: MarketValueTargetQuerycomComponent;
  let fixture: ComponentFixture<MarketValueTargetQuerycomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetQuerycomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetQuerycomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
