import { TestBed } from '@angular/core/testing';

import { ClassificationSettingsService } from './classification-settings.service';

describe('ClassificationSettingsService', () => {
  let service: ClassificationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
