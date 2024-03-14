import { TestBed } from '@angular/core/testing';

import { CoreKitService } from './core-kit.service';

describe('CoreKitService', () => {
  let service: CoreKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
