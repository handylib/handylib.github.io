import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
import { FormsModule } from '@angular/forms';
import { DittoModule } from 'projects/ditto/src/public-api';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FormsModule,
    DittoModule,
    ShareModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
