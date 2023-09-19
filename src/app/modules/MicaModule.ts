import { NgModule } from "@angular/core";
import { Tap1OptionalComponent } from '../components/initial-config/tap1-optional/tap1-optional.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SebastianModule } from "./SebastianModule";
import { MyCompaniesComponent } from '../components/my-companies/my-companies.component';
import { AppRoutingModule } from '../app-routing.module';

const MicaComponents = [

];

@NgModule({
    declarations: [
        Tap1OptionalComponent,
        MyCompaniesComponent,
    ],
    exports: [] // Poner [MicaComponents]
    ,
    imports: [
        BrowserModule,
        FormsModule,
        SebastianModule,
        AppRoutingModule
    ]
})
export class MicaModule {}