import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOperatorDashboardComponent } from './lab-operator-dashboard.component';

describe('LabOperatorDashboardComponent', () => {
  let component: LabOperatorDashboardComponent;
  let fixture: ComponentFixture<LabOperatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabOperatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOperatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
