import { NgModule } from "@angular/core";
import { Tap1OptionalComponent } from '../components/initial-config/tap1-optional/tap1-optional.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SebastianModule } from "./SebastianModule";

const MicaComponents = [

];

@NgModule({
    declarations: [
        Tap1OptionalComponent,
    ],
    exports: [] // Poner [MicaComponents]
    ,
    imports: [
        BrowserModule,
        FormsModule,
        SebastianModule
    ]
})
export class MicaModule {}