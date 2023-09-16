import {NgModule} from "@angular/core";
import {MyTextfieldComponent} from "../components/general-components/my-textfield/my-textfield.component";
import {MyButtonSquaredComponent} from "../components/general-components/my-button-squared/my-button-squared.component";
import {MyButtonComponent} from "../components/general-components/my-button/my-button.component";
import {MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';  


const SebastianComponents = [
  MyTextfieldComponent,
  MyButtonSquaredComponent,
  MyButtonComponent
];


@NgModule({
  declarations: [
    MyTextfieldComponent,
    MyButtonSquaredComponent,
    MyButtonComponent
  ],
  imports: [
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    SebastianComponents
  ]
})

export class SebastianModule {

}


