import {NgModule} from "@angular/core";
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConfigurationTap1Component } from '../components/configuration/configuration-tap1/configuration-tap1.component';



const CarlosComponents = [
    NavbarComponent,
    ConfigurationTap1Component
]

@NgModule({
    declarations: [
        NavbarComponent,
        ConfigurationTap1Component

    ],
    imports: [
        
    ],
    exports: [CarlosComponents] // Poner [CarlosComponents]
})
export class CarlosModule {}