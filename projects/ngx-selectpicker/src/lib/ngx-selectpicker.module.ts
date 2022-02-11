import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectpickerComponent } from './selectpicker/selectpicker.component';



@NgModule({
  declarations: [
    SelectpickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectpickerComponent
  ]
})
export class NgxSelectpickerModule { }



export type Options = {
  classes?: {
    input?: {
      focus?: string,
      blur?: string,
      common?: string
    },
    container?: {
      common?: string
    },
    searchInput?: {
      focus?: string,
      blur?: string,
      common?: string
    }
  },
  styles?: {
    container?: {
      padding?: any,
      width?: any,
      maxWidth?: any
    }
  },
  search?: boolean,
  searchThreshold?: number,
  searching?: boolean,
  searchPlaceholder?: string,
  searchDisableInput?: boolean
}


export type SelectPickerItems = Array<{
  id?: any,
  label?: string,
  selected?: boolean,
  data?: any
}>