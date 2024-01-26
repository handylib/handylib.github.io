import { Component, OnInit } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  datetime: string = "2012-12-12 12:00 AM";
  date: string = "2012-12-12";
  time: string = "12:00 AM";
  intervalDate: string = "2022-03-01";
  month: any = moment().format('MMMM');
  year: any = new Date().getFullYear();

  ngOnInit(): void {
  }

}
