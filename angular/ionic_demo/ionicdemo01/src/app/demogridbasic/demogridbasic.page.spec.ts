import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemogridbasicPage } from './demogridbasic.page';

describe('DemogridbasicPage', () => {
  let component: DemogridbasicPage;
  let fixture: ComponentFixture<DemogridbasicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemogridbasicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemogridbasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
