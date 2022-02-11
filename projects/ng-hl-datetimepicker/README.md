Installation
------------
```bash
npm install --save moment ngx-moment @handylib/ng-hl-datetimepicker
```

Usage
-----

Import `NgHlDatetimepickerModule` into your app's modules:


``` typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgHlDatetimepickerModule } from '@handylib/ng-hl-datetimepicker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgHlDatetimepickerModule,
    CommonModule,
    AppRoutingModule
  ]
})
export class TestbenchModule { }

```


Your component ts file :

``` typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  date: string = "1996-08-14 14:10:20";
  options: any = {
    inputClass: "form-control",
    inputFormat: "DD MMMM, YYYY hh:mm A",
    outputFormat: "YYYY-MM-DD HH:mm:ss",
    showTimepicker: false
  };

  ngOnInit(): void {
  }

}
```


Your component html file :

``` html
    <datetimepicker [options]="options" [(ngModel)]="date"></datetimepicker> <br>
    You selected : {{date}}
```