import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexImplementationUploadComponent } from './implementation-upload.component';

describe('ProvinceIndexImplementationUploadComponent', () => {
  let component: ProvinceIndexImplementationUploadComponent;
  let fixture: ComponentFixture<ProvinceIndexImplementationUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexImplementationUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexImplementationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
