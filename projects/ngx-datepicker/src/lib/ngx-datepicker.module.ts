import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker/datepicker.component';



@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatepickerComponent
  ]
})
export class NgxDatepickerModule { }



export type Options = {
  mode?: any,
  classes?: {
    container?: any,
    input?: any
  },
  styles?: {
    container?: {
      width?: any
    }
  },
  icons?: {
    left?: any
    right?: any,
    up?: any,
    down?: any
  },
  formats?: {
    preview?: any,
    input?: any,
    output?: any
  },
  weeks?: any,
  months?: any
}