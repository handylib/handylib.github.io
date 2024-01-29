import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgxDatepickerDirective } from './ngx-datepicker.directive';
import { NgxDatetimepickerDirective } from './ngx-datetimepicker.directive';
import { NgxTimepickerDirective } from './ngx-timepicker.directive';
import { NgxMonthpickerDirective } from './ngx-monthpicker.directive';
import { NgxYearpickerDirective } from './ngx-yearpicker.directive';
import { NgxDurationpickerDirective } from './ngx-durationpicker.directive';



@NgModule({
  declarations: [
    DatepickerComponent,
    NgxDatepickerDirective,
    NgxDatetimepickerDirective,
    NgxTimepickerDirective,
    NgxMonthpickerDirective,
    NgxYearpickerDirective,
    NgxDurationpickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatepickerComponent,
    NgxDatepickerDirective,
    NgxTimepickerDirective,
    NgxDatetimepickerDirective,
    NgxMonthpickerDirective,
    NgxYearpickerDirective,
    NgxDurationpickerDirective
  ]
})
export class NgxDatepickerModule { }


