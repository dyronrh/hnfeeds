import { TestBed } from '@angular/core/testing';

import { NhapiService } from './nhapi.service';

describe('NhapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhapiService = TestBed.get(NhapiService);
    expect(service).toBeTruthy();
  });
});
