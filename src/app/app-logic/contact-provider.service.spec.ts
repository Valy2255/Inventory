import { TestBed } from '@angular/core/testing';

import { ContactProviderService } from '../app-logic/contact-provider.service';

describe('ContactProviderService', () => {
  let service: ContactProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
