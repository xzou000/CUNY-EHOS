import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhosQuickViewComponent } from './ehos-quick-view.component';

describe('EhosQuickViewComponent', () => {
  let component: EhosQuickViewComponent;
  let fixture: ComponentFixture<EhosQuickViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhosQuickViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhosQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
