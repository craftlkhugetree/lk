import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexImplementationVerifyComponent } from './implementation-verify.component';

describe('ProvinceIndexImplementationVerifyComponent', () => {
  let component: ProvinceIndexImplementationVerifyComponent;
  let fixture: ComponentFixture<ProvinceIndexImplementationVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexImplementationVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexImplementationVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
