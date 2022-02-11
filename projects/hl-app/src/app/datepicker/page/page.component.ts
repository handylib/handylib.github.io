import { Component, OnInit } from '@angular/core';
import { Options } from 'projects/ngx-datepicker/src/public-api';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  date: string = "1996-08-14";
  options: Options = {
    styles: {
      container: {
        width: "300px"
      }
    },
    classes: {
      container: "card",
      input: "form-control"
    },
    formats: {
      input: "YYYY-MM-DD",
      output: "YYYY-MM-DD",
      preview: "DD MMMM, YYYY"
    }
  };

  ngOnInit(): void {
  }

}
