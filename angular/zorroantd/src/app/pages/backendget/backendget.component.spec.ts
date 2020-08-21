import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendgetComponent } from './backendget.component';

describe('BackendgetComponent', () => {
  let component: BackendgetComponent;
  let fixture: ComponentFixture<BackendgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
