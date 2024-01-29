import { Component, OnInit } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  blankValue : string = "";
  undefinedValue : any;


  datetime: string =  moment().format('YYYY-MM-DD LT');
  date: string =  moment().format('YYYY-MM-DD');
  time: string =  moment().format('LT');
  duration : string = '00:00:00';
  hours : string = '00';
  minutes : string = '00';
  seconds : string = '00';
  backDateTime : string = moment().format('YYYY-MM-DD LT');
  futureDateTime : string = moment().add('days',2).format('YYYY-MM-DD LT');

  backDate : string = moment().format('YYYY-MM-DD');
  futureDate : string = moment().add('days',2).format('YYYY-MM-DD');


  backTime : string = "12:00 AM";
  futureTime : string = "12:25 AM";

  enableHours : boolean = true;
  enableMinutes: boolean = true;
  enableSeconds : boolean = true;
  
  intervalDate: string = "2022-03-01";
  month: any = moment().format('MMMM');
  year: any = new Date().getFullYear();

  ngOnInit(): void {
  }

}
