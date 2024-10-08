import { TestBed } from '@angular/core/testing';

import { EncryptionInterceptorService } from './intercepeter/encryption-interceptor.service';

describe('EncryptionInterceptorService', () => {
  let service: EncryptionInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
