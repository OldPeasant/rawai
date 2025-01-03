import { TestBed } from '@angular/core/testing';

import { TokenSettingsService } from './token-settings.service';

describe('TokenSettingsService', () => {
  let service: TokenSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
