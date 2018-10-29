import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrosiveComponent } from './corrosive.component';

describe('CorrosiveComponent', () => {
  let component: CorrosiveComponent;
  let fixture: ComponentFixture<CorrosiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrosiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrosiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
