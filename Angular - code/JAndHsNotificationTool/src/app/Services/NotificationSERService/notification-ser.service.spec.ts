import { TestBed } from '@angular/core/testing';

import { NotificationSERService } from './notification-ser.service';

describe('NotificationSERService', () => {
  let service: NotificationSERService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationSERService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
