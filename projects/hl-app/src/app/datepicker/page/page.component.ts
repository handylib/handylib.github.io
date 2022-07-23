import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  datetime: string = "2012-12-12 12:12:12";
  date: string = "2012-12-12";
  time: string = "12:12:12";
  intervalDate: string = "2022-03-01";
  month: any = new Date().getMonth();
  year: any = new Date().getFullYear();


  form: any = {};
  ngOnInit(): void {
    var date = 1;
    var inst = this;
    setInterval(function () {
      inst.intervalDate = "2022-03-" + date;
      date++;
      if (date >= 31) {
        date = 1;
      }
    }, 1000);
  }

}
