import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  datetime: string = "2012-12-12 12:12:12";
  date: string = "2012-12-12";
  time: string = "12:12:12";
  intervalDate: string = "2022-03-01";
  month: any = new Date().getMonth();
  year: any = new Date().getFullYear();

  ngOnInit(): void {
  }

}
