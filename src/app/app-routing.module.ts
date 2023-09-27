import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import {Tap4Component} from "./components/initial-config/tap4/tap4.component";
import {Tap1Component} from "./components/initial-config/tap1/tap1.component";
import {Tap3Component} from "./components/initial-config/tap3/tap3.component";
import {Tap1OptionalComponent} from "./components/initial-config/tap1-optional/tap1-optional.component";
import {ConfigurationTap1Component} from "./components/configuration/configuration-tap1/configuration-tap1.component";
import { MyCompaniesComponent } from './components/my-companies/my-companies.component';
import { ConfigurationTap2Component } from './components/configuration/configuration-tap2/configuration-tap2.component';
import { ConfigurationTap3Component } from './components/configuration/configuration-tap3/configuration-tap3.component';

const routes: Routes = [
  { path: 'my-companies', component: MyCompaniesComponent},
  { path: 'tap1', component: Tap1Component }, // {4}
  { path: 'tap2', component: Tap2Component },
  { path: 'tap3', component: Tap3Component },
  { path: 'tap4', component: Tap4Component },
  { path: 'tap1-optional', component: Tap1OptionalComponent },
  { path: 'configuration-tap1', component: ConfigurationTap1Component },
  { path: 'configuration-tap2', component: ConfigurationTap2Component },
  { path: 'configuration-tap3', component: ConfigurationTap3Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
