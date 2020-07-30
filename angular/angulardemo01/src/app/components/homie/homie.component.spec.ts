import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomieComponent } from './homie.component';

describe('HomieComponent', () => {
  let component: HomieComponent;
  let fixture: ComponentFixture<HomieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
