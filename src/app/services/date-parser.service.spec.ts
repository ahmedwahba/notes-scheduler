import { TestBed } from '@angular/core/testing';

import { DateParserService } from './date-parser.service';

describe('DateParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateParserService = TestBed.get(DateParserService);
    expect(service).toBeTruthy();
  });

  it('should be has service getTodayStartOfWeek', () => {
    const service: DateParserService = TestBed.get(DateParserService);
    expect(service.getTodayStartOfWeek).toBeTruthy();
  });

  it('should be has function to get working days', () => {
    const service: DateParserService = TestBed.get(DateParserService);
    const first = service.getTodayStartOfWeek();
    const days = service.getWorkingDays(first);
    expect(days).toBeTruthy();
    expect(days.length).toEqual(5);
  });

});
