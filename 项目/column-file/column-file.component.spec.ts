import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalManagementColumnFileComponent } from './column-file.component';

describe('PortalManagementColumnFileComponent', () => {
  let component: PortalManagementColumnFileComponent;
  let fixture: ComponentFixture<PortalManagementColumnFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalManagementColumnFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalManagementColumnFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
