import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceltxtComponent } from './exceltxt.component';

describe('ExceltxtComponent', () => {
  let component: ExceltxtComponent;
  let fixture: ComponentFixture<ExceltxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceltxtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceltxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
