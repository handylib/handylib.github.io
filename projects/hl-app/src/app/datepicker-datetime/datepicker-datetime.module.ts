import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerDatetimeRoutingModule } from './datepicker-datetime-routing.module';
import { PageComponent } from './page/page.component';
import { ShareModule } from '../share/share.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    FormsModule,
    CodemirrorModule,
    ShareModule,
    CommonModule,
    DatepickerDatetimeRoutingModule
  ]
})
export class DatepickerDatetimeModule { }
