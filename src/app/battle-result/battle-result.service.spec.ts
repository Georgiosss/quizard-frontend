import { TestBed } from '@angular/core/testing';

import { BattleResultService } from './battle-result.service';

describe('BattleResultService', () => {
  let service: BattleResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
