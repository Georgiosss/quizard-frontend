import { TestBed } from '@angular/core/testing';

import { QuestionsManagementService } from './questions-management.service';

describe('QuestionsManagementService', () => {
  let service: QuestionsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
