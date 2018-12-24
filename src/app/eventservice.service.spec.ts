import { TestBed } from '@angular/core/testing';

import { EventserviceService } from './eventservice.service';

describe('EventserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventserviceService = TestBed.get(EventserviceService);
    expect(service).toBeTruthy();
  });
});
