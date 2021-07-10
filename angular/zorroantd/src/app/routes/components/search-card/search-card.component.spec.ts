import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsSearchCardComponent } from './search-card.component';

describe('ComponentsSearchCardComponent', () => {
  let component: ComponentsSearchCardComponent;
  let fixture: ComponentFixture<ComponentsSearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsSearchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
