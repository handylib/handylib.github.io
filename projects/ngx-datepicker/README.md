# Handylib ngx-datepicker

SIMPLE AND COOL LOOKING DATEPICKER FOR ANGULAR 13+



## Install

`momentjs` is a peer dependency and must also be installed

```sh
npm i @handylib/ngx-datepicker moment
```

Now import the `NgxDatepickerModule` to your module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatepickerModule } from '@handylib/ngx-datepicker';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxDatepickerModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Make sure you have also loaded `FormsModule` along with `NgxDatepickerModule` otherwise it will throw error cannot bind ngModel since its not known property of input or any element.

To you any type of picker you just have to add directive to that element


## DATETIME, DATE, MONTH, YEAR PICKER DIRECTIVES

| Directives |    |
| -------------------- | --------- |
| `datetimepicker`               | To pick Date and Time   |
| `datepicker`                | To pick only Date       |
| `timepicker`               | To pick only Time      |
| `monthpicker`               | To pick only month |
| `yearpicker`              | To pick only year   |





add any  directive to any input or element for example `datetimepicker`

```html
<input type="text" datetimepicker placeholder="select date & time" [(ngModel)]="myDateTime" >
```

default date and time format is "YYYY-MM-DD HH:mm:ss" which is same as mysql default datetime format.

To change format just give your format to `[format]` input.

```html
<input type="text" datetimepicker [format]="'DD MMMM, YYYY hh:mm A'" placeholder="select date & time" [(ngModel)]="myDateTime" >
```

output `4 April, 2022 12:45 AM`





## DATE AND TIME 

![](https://raw.githubusercontent.com/handylib/handylib.github.io/master/projects/hl-app/src/assets/image/datetime.png)

```html
<input type="text" datetimepicker placeholder="select date & time" [(ngModel)]="myDateTime" >
```

## DATE ONLY 

![](https://raw.githubusercontent.com/handylib/handylib.github.io/master/projects/hl-app/src/assets/image/date.png)

```html
<input type="text" datepicker placeholder="select a date" [(ngModel)]="myDate" >
```

## TIME ONLY 

![](https://raw.githubusercontent.com/handylib/handylib.github.io/master/projects/hl-app/src/assets/image/time.png)

```html
<input type="text" timepicker placeholder="select time" [(ngModel)]="myTime" >
```

## MONTH ONLY 

![](https://raw.githubusercontent.com/handylib/handylib.github.io/master/projects/hl-app/src/assets/image/month.png)

```html
<input type="text" monthpicker placeholder="select month" [(ngModel)]="myMonth" >
```


## YEAR  ONLY 

![](https://raw.githubusercontent.com/handylib/handylib.github.io/master/projects/hl-app/src/assets/image/year.png)

```html
<input type="text" yearpicker placeholder="select year" [(ngModel)]="myYear" >
```



| NOT REQUIRED    
| --------------------
| `Angular Material`               
| `Angular CDK`                
| `Jquery`               
| `Bootstrap`               


For more information visit https://handylib.github.io/

Any issues or bugs or  source code  - https://github.com/handylib/handylib.github.io


