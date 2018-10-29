import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhosDashboardComponent } from './ehos-dashboard.component';

describe('EhosDashboardComponent', () => {
  let component: EhosDashboardComponent;
  let fixture: ComponentFixture<EhosDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhosDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
