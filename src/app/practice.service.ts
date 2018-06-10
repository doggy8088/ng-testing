import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  constructor(private dataService: DataService) { }

  sum(a, b) {
    return a+b;
  }

  get() {
    return this.dataService.value;
  }
}
