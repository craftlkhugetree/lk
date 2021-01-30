import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTargetIndexreleaseComponent } from './indexrelease.component';

describe('MarketValueTargetIndexreleaseComponent', () => {
  let component: MarketValueTargetIndexreleaseComponent;
  let fixture: ComponentFixture<MarketValueTargetIndexreleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketValueTargetIndexreleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketValueTargetIndexreleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
