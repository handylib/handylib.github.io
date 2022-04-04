import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
import { NgxDatepickerModule } from 'projects/ngx-datepicker/src/public-api';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FormsModule,
    NgxDatepickerModule,
    ShareModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
