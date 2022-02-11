import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectpickerRoutingModule } from './selectpicker-routing.module';
import { PageComponent } from './page/page.component';
import { ShareModule } from '../share/share.module';
import { NgxSelectpickerModule } from 'projects/ngx-selectpicker/src/public-api';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    FormsModule,
    NgxSelectpickerModule,
    ShareModule,
    CommonModule,
    SelectpickerRoutingModule
  ]
})
export class SelectpickerModule { }
