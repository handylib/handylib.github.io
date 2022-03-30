import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';
import { TestingComponent } from './testing/testing.component';
import { FormsModule } from '@angular/forms';
// import { NgxDatepickerModule as DatepickerModule } from 'projects/ngx-datepicker/src/public-api';
// import { NgxDatepickerModule as DatepickerModule } from 'dist/ngx-datepicker/public-api';
import { NgxDatepickerModule as DatepickerModule } from '@handylib/ngx-datepicker';




@NgModule({
  declarations: [
    TestingComponent
  ],
  imports: [
    FormsModule,
    DatepickerModule,
    CommonModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
