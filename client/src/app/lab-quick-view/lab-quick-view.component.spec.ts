import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabQuickViewComponent } from './lab-quick-view.component';

describe('LabQuickViewComponent', () => {
  let component: LabQuickViewComponent;
  let fixture: ComponentFixture<LabQuickViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabQuickViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
