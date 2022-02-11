import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerRoutingModule } from './datepicker-routing.module';
import { PageComponent } from './page/page.component';
import { ShareModule } from '../share/share.module';
import { NgxDatepickerModule } from 'projects/ngx-datepicker/src/public-api';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    FormsModule,
    NgxDatepickerModule,
    ShareModule,
    CommonModule,
    DatepickerRoutingModule
  ]
})
export class DatepickerModule { }
