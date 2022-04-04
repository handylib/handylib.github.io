import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
  { path: "datepicker/datetime", loadChildren: () => import("./datepicker-datetime/datepicker-datetime.module").then(m => m.DatepickerDatetimeModule) },
  { path: "datepicker", loadChildren: () => import("./datepicker/datepicker.module").then(m => m.DatepickerModule) },
  { path: "selectpicker", loadChildren: () => import("./selectpicker/selectpicker.module").then(m => m.SelectpickerModule) },
  { path: "testing", loadChildren: () => import("./testing/testing.module").then(m => m.TestingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
