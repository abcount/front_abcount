import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCompaniesComponent } from './components/my-companies/my-companies.component';
import { Tap1Component } from "./components/initial-config/tap1/tap1.component";
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from "./components/initial-config/tap3/tap3.component";
import { Tap4Component } from "./components/initial-config/tap4/tap4.component";
import { ConfigurationTap1Component } from "./components/configuration/configuration-tap1/configuration-tap1.component";
import { ConfigurationTap2Component } from './components/configuration/configuration-tap2/configuration-tap2.component';
import { ConfigurationTap3Component } from './components/configuration/configuration-tap3/configuration-tap3.component';
import { ConfigurationTap4Component } from './components/configuration/configuration-tap4/configuration-tap4.component';
import { ConfigurationTap5Component } from './components/configuration/configuration-tap5/configuration-tap5.component';
import { AddUsersAndPermissionsComponent } from './components/configuration/add-users-and-permissions/add-users-and-permissions.component';
import { UsersAndPermissionsComponent } from './components/configuration/users-and-permissions/users-and-permissions.component';
import {
  AccountingVoucherViewComponent
} from "./components/accounting-voucher/accounting-voucher-view/accounting-voucher-view.component";
import {
  AccountingVoucherAddComponent
} from "./components/accounting-voucher/accounting-voucher-add/accounting-voucher-add.component";


const routes: Routes = [
  { path: '', redirectTo: '/my-companies', pathMatch: 'full'},
  { path: 'my-companies', component: MyCompaniesComponent },
  { path: 'tap1', component: Tap1Component }, // {4}
  { path: 'tap2', component: Tap2Component },
  { path: 'tap3', component: Tap3Component },
  { path: 'tap4', component: Tap4Component },
  { path: 'configuration-tap1', component: ConfigurationTap1Component },
  { path: 'configuration-tap2', component: ConfigurationTap2Component },
  { path: 'configuration-tap3', component: ConfigurationTap3Component },
  { path: 'configuration-tap4', component: ConfigurationTap4Component },
  { path: 'configuration-tap5', component: ConfigurationTap5Component },
  { path: 'add-users-and-permissions', component: AddUsersAndPermissionsComponent },
  { path: 'users-and-permissions', component: UsersAndPermissionsComponent },
  {path: 'accounting-voucher-view', component: AccountingVoucherViewComponent},
  {path: 'accounting-voucher-add', component: AccountingVoucherAddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
