import { TestBed, inject } from '@angular/core/testing';

import { PracticeService } from './practice.service';
import { DataService } from './data.service';

describe('PracticeService', () => {

  let practiceService: PracticeService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PracticeService, DataService]
    });

    practiceService = TestBed.get(PracticeService);
    dataService = TestBed.get(DataService);
  });

  it('should be created', inject([PracticeService], (service: PracticeService) => {
    expect(service).toBeTruthy();
  }));

  it('should sum two numbers', inject([PracticeService], (service: PracticeService) => {
    expect(service.sum(1,2)).toBe(3);
  }));

  it('should return 1 from DataService', () => {
    expect(practiceService.get()).toBe(1);
    expect(dataService.value).toBe(1);
  });

  it('should return 200 when calling dataService.run()', () => {
    spyOn(dataService, 'run').and.returnValue(100);
    expect(dataService.run()).toBe(100);
  });

  it('should pass parameter', () => {
    spyOn(practiceService, 'send').and.callThrough();
    const attemptedValue = 'dir';
    let expected = practiceService.send(attemptedValue);
    expect(practiceService.send).toHaveBeenCalledWith('dir');
    expect(expected).toBe(attemptedValue);
  });

});
