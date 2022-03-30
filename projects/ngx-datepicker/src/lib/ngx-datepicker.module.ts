import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgxDatepickerDirective } from './ngx-datepicker.directive';
import { NgxDatetimepickerDirective } from './ngx-datetimepicker.directive';
import { NgxTimepickerDirective } from './ngx-timepicker.directive';



@NgModule({
  declarations: [
    DatepickerComponent,
    NgxDatepickerDirective,
    NgxDatetimepickerDirective,
    NgxTimepickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatepickerComponent,
    NgxDatepickerDirective,
    NgxTimepickerDirective,
    NgxDatetimepickerDirective
  ]
})
export class NgxDatepickerModule { }


