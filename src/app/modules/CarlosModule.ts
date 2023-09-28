import {NgModule} from "@angular/core";
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConfigurationTap1Component } from '../components/configuration/configuration-tap1/configuration-tap1.component';
import { ConfigNavbarComponent } from "../components/configuration/config-navbar/config-navbar.component";
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SebastianModule } from "./SebastianModule";
import { ConfigurationTap2Component } from "../components/configuration/configuration-tap2/configuration-tap2.component";
import { ConfigurationTap3Component } from "../components/configuration/configuration-tap3/configuration-tap3.component";
import { ConfigurationTap4Component } from '../components/configuration/configuration-tap4/configuration-tap4.component';
import { ConfigurationTap5Component } from "../components/configuration/configuration-tap5/configuration-tap5.component";
import { AddUsersAndPermissionsComponent } from '../components/configuration/add-users-and-permissions/add-users-and-permissions.component';
import { UsersAndPermissionsComponent } from '../components/configuration/users-and-permissions/users-and-permissions.component';

import { FormsModule } from '@angular/forms';

const CarlosComponents = [
    NavbarComponent,
    ConfigurationTap1Component
]

@NgModule({
    declarations: [
        NavbarComponent,
        ConfigurationTap1Component,
        ConfigNavbarComponent,
        ConfigurationTap2Component,
        ConfigurationTap3Component,
        ConfigurationTap4Component,
        ConfigurationTap5Component,
        AddUsersAndPermissionsComponent,
        UsersAndPermissionsComponent
    ],
    exports: [CarlosComponents] // Poner [CarlosComponents]
    ,
    imports: [
        CommonModule,
        AppRoutingModule,
        SebastianModule,
        FormsModule
    ]
})
export class CarlosModule {}