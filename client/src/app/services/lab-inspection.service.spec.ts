import { TestBed, inject } from '@angular/core/testing';

import { LabInspectionService } from './lab-inspection.service';

describe('LabInspectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabInspectionService]
    });
  });

  it('should be created', inject([LabInspectionService], (service: LabInspectionService) => {
    expect(service).toBeTruthy();
  }));
});
