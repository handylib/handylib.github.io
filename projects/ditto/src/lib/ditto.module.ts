import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DittoComponent } from './ditto/ditto.component';
import { DittoDirective } from './ditto.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DittoComponent,
    DittoDirective
  ],
  exports : [
    DittoDirective
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class DittoModule { }
