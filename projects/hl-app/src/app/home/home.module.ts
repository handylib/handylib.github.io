import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
