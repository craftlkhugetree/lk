import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvinceIndexIndexBatchReleaseComponent } from './index-batch-release.component';

describe('ProvinceIndexIndexBatchReleaseComponent', () => {
  let component: ProvinceIndexIndexBatchReleaseComponent;
  let fixture: ComponentFixture<ProvinceIndexIndexBatchReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIndexIndexBatchReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIndexIndexBatchReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
