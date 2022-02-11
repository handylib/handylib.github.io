import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatetimepickerComponent } from './datetimepicker.component';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DatetimepickerComponent
  ],
  imports: [
    FormsModule,
    MomentModule,
    CommonModule
  ],
  exports: [
    DatetimepickerComponent
  ]
})
export class NgHlDatetimepickerModule { }
