import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortCombineComponent } from './table-sort-combine.component';

describe('TableSortCombineComponent', () => {
  let component: TableSortCombineComponent;
  let fixture: ComponentFixture<TableSortCombineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSortCombineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortCombineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
