import { TestBed, inject } from '@angular/core/testing';

import { WasteManagementService } from './waste-management.service';

describe('WasteManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WasteManagementService]
    });
  });

  it('should be created', inject([WasteManagementService], (service: WasteManagementService) => {
    expect(service).toBeTruthy();
  }));
});
