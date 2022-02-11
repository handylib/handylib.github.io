import { Component, OnInit } from '@angular/core';
import { Options, SelectPickerItems } from 'projects/ngx-selectpicker/src/public-api';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor() { }

  hero: any = "ironman";

  heros: SelectPickerItems = [
    {
      id: "superman",
      label: "Superman"
    },
    {
      id: "batman",
      label: "Batman"
    },
    {
      id: "ironman",
      label: "Iron man"
    },
    {
      id: "test",
      label: "Test label"
    }
  ];

  options: Options = {
    classes: {
      container: {
        common: "card"
      },
      input: {
        focus: "",
        common: "form-control"
      }
    }
  };

  options2: Options = {
    classes: {
      container: {
        common: "card"
      },
      input: {
        focus: "",
        common: "form-control"
      }
    }
  };

  options3: Options = {
    classes: {
      container: {
        common: "card"
      },
      input: {
        focus: "",
        common: "form-control"
      }
    }
  };

  onSearch(keyword: any) {

  }

  ngOnInit(): void {
  }

}
