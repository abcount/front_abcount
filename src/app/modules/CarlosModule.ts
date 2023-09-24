import {NgModule} from "@angular/core";
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConfigurationTap1Component } from '../components/configuration/configuration-tap1/configuration-tap1.component';
import { ConfigNavbarComponent } from "../components/configuration/config-navbar/config-navbar.component";
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SebastianModule } from "./SebastianModule";
import { ConfigurationTap2Component } from "../components/configuration/configuration-tap2/configuration-tap2.component";

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
    ],
    exports: [CarlosComponents] // Poner [CarlosComponents]
    ,
    imports: [
        CommonModule,
        AppRoutingModule,
        SebastianModule
    ]
})
export class CarlosModule {}