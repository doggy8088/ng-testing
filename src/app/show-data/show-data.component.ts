import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getData() {
    return this.http.get('myurl')
      .pipe(
        map((value: any) => value.name + '!!')
      )
  }
}
