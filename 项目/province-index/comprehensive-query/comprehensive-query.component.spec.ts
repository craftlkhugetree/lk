import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexComprehensiveQueryComponent } from './comprehensive-query.component';

describe('ProvinceIndexComprehensiveQueryComponent', () => {
  let component: ProvinceIndexComprehensiveQueryComponent;
  let fixture: ComponentFixture<ProvinceIndexComprehensiveQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexComprehensiveQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexComprehensiveQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
