import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afternoon',
  templateUrl: './afternoon.component.html',
  styleUrls: ['./afternoon.component.css']
})
export class AfternoonComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('ngOnInit called');
  }

  isOn: boolean;

  clicked() {
    this.isOn = !this.isOn;
  }

  get message() {
    return this.isOn ? 'ON' : 'OFF';
  }
}
