import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';

const routes: Routes = [
  { path: 'tap2', component: Tap2Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
