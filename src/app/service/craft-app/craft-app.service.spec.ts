import { TestBed } from '@angular/core/testing';

import { CraftAppService } from './craft-app.service';

describe('CraftAppService', () => {
  let service: CraftAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
