import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import {Tap4Component} from "./components/initial-config/tap4/tap4.component";
import {Tap1Component} from "./components/initial-config/tap1/tap1.component";

const routes: Routes = [
  {path: 'tap1', component: Tap1Component}, // {4}
  { path: 'tap2', component: Tap2Component },
  { path: 'tap4', component: Tap4Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
