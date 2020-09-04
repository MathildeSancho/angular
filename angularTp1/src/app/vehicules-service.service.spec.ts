import { TestBed } from '@angular/core/testing';

import { VehiculesServiceService } from './vehicules-service.service';

describe('VehiculesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculesServiceService = TestBed.get(VehiculesServiceService);
    expect(service).toBeTruthy();
  });
});
