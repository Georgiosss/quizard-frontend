import { TestBed } from '@angular/core/testing';

import { QuestionsEditorService } from './questions-editor.service';

describe('QuestionsEditorService', () => {
  let service: QuestionsEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
