import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalManagementInformationDeliveryComponent } from './information-delivery.component';

describe('PortalManagementInformationDeliveryComponent', () => {
  let component: PortalManagementInformationDeliveryComponent;
  let fixture: ComponentFixture<PortalManagementInformationDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalManagementInformationDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalManagementInformationDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
