import { NgModule } from "@angular/core";
import { Tap1OptionalComponent } from '../components/initial-config/tap1-optional/tap1-optional.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const MicaComponents = [

];

@NgModule({
    declarations: [
        Tap1OptionalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    exports: [] // Poner [MicaComponents]
})
export class MicaModule {}