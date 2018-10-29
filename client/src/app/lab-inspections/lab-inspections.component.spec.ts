import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabInspectionsComponent } from './lab-inspections.component';

describe('LabInspectionsComponent', () => {
  let component: LabInspectionsComponent;
  let fixture: ComponentFixture<LabInspectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabInspectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
