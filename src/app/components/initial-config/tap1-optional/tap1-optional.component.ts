import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountDto } from 'src/app/dto/account.dto';

@Component({
  selector: 'app-tap1-optional',
  templateUrl: './tap1-optional.component.html',
  styleUrls: ['./tap1-optional.component.css'],
})

export class Tap1OptionalComponent {
  
  chartOfAccounts: AccountDto[] = []; /*Array para guardar el plan de cuentas*/ 

  /*Variables para obtener los valores de los elementos del DOM*/
  @ViewChild('nombreCuentaInput') nombreCuentaInput: ElementRef;
  @ViewChild('rubroMonetarioInput') rubroMonetarioInput: ElementRef;
  @ViewChild('balanceInput') balanceInput: ElementRef;
  @ViewChild('resultInput') resultInput: ElementRef;

  /*-----------------------------------------------------------------------------------------------------*/
  /*AGREGAR NIVELES*/
  /*Agregar en el primer nivel*/
  addLevel1(){
    // Obtener los valores de los elementos
    const nombreCuenta = this.nombreCuentaInput.nativeElement.value;
    const rubroMonetario = this.rubroMonetarioInput.nativeElement.checked;
    const reporte = this.balanceInput.nativeElement.checked ? true : false; // Balance general = true, Estado de resultados = false
    
    if (this.chartOfAccounts.length < 1){
      this.chartOfAccounts.push({
        codeAccount: "1.00.000.0000",
        nameAccount: nombreCuenta,
        clasificator: true,
        level: 1,
        report: reporte,
        moneyRub: rubroMonetario,
      });
    } else {
      let aux = this.chartOfAccounts[0];
      for (let i = 0; i < this.chartOfAccounts.length; i++){
        if (this.chartOfAccounts[i].level == 1){
          aux = this.chartOfAccounts[i];
        }
      }
      console.log(aux);
      let code = aux.codeAccount.split(".");
      if (parseInt(code[0]) < 9){
        code[0] = (parseInt(code[0]) + 1).toString();
        code[1] = "00";
        code[2] = "000";
        code[3] = "0000";
        this.chartOfAccounts.push({
          codeAccount: code.join("."),
          nameAccount: nombreCuenta,
          clasificator: true,
          level: 1,
          report: reporte,
          moneyRub: rubroMonetario,
        });
      }
    }
    console.log(this.chartOfAccounts);
    this.sortChartOfAccounts();
    this.clearValues();
  }
  /*Agregar en el segundo nivel*/
  addLevel2(codeAccount:string, report: boolean){
    let nombreCuenta = this.nombreCuentaInput.nativeElement.value;
    let rubroMonetario = this.rubroMonetarioInput.nativeElement.checked;
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[0]) == parseInt(code[0])){
        aux.push(this.chartOfAccounts[i]);
      }
    }
    console.log(aux);
    let lastOne = aux[aux.length - 1];
    console.log(lastOne);
    let code2 = lastOne.codeAccount.split(".");
    if (parseInt(code2[1]) == 0){
      code2[1] = "11";
      code2[2] = "000";
      code2[3] = "0000";
      this.chartOfAccounts.push({
        codeAccount: code2.join("."),
        nameAccount: nombreCuenta,
        clasificator: true,
        level: 2,
        report: report,
        moneyRub: rubroMonetario,
      });
    } else {
      if (parseInt(code2[1]) < 99){
        code2[1] = (parseInt(code2[1]) + 1).toString();
        code2[2] = "000";
        code2[3] = "0000";
        this.chartOfAccounts.push({
          codeAccount: code2.join("."),
          nameAccount: nombreCuenta,
          clasificator: true,
          level: 2,
          report: report,
          moneyRub: rubroMonetario,
        });
      }
    }
    console.log(this.chartOfAccounts);
    this.sortChartOfAccounts();
    this.clearValues();
  }
  /*Agregar en el tercer nivel*/
  addLevel3 (codeAccount: string, report: boolean){
    let nombreCuenta = this.nombreCuentaInput.nativeElement.value;
    let rubroMonetario = this.rubroMonetarioInput.nativeElement.checked;
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[1]) == parseInt(code[1]) && parseInt(account[0]) == parseInt(code[0])) {
        aux.push(this.chartOfAccounts[i]);
      }
    }
    console.log(aux);
    let lastOne = aux[aux.length - 1];
    console.log(lastOne);
    let code2 = lastOne.codeAccount.split(".");
    if (parseInt(code2[2]) == 0){
      code2[2] = "111";
      code2[3] = "0000";
      this.chartOfAccounts.push({
        codeAccount: code2.join("."),
        nameAccount: nombreCuenta,
        clasificator: true,
        level: 3,
        report: report,
        moneyRub: rubroMonetario,
      });
    } else {
      if (parseInt(code2[2]) < 999){
        code2[2] = (parseInt(code2[2]) + 1).toString();
        code2[3] = "0000";
        this.chartOfAccounts.push({
          codeAccount: code2.join("."),
          nameAccount: nombreCuenta,
          clasificator: true,
          level: 3,
          report: report,
          moneyRub: rubroMonetario,
        });
      }
    }
    console.log(this.chartOfAccounts);
    this.sortChartOfAccounts();
    this.clearValues();
  }
  /*Agregar en el cuarto nivel*/
  addLevel4 (codeAccount: string, report: boolean){
    let nombreCuenta = this.nombreCuentaInput.nativeElement.value;
    let rubroMonetario = this.rubroMonetarioInput.nativeElement.checked;
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[2]) == parseInt(code[2]) && parseInt(account[1]) == parseInt(code[1]) && parseInt(account[0]) == parseInt(code[0])) {
        aux.push(this.chartOfAccounts[i]);
      }
    }
    console.log(aux);
    let lastOne = aux[aux.length - 1];
    console.log(lastOne);
    let code2 = lastOne.codeAccount.split(".");
    if (parseInt(code2[3]) == 0){
      code2[3] = "1111";
      this.chartOfAccounts.push({
        codeAccount: code2.join("."),
        nameAccount: nombreCuenta,
        clasificator: true,
        level: 4,
        report: report,
        moneyRub: rubroMonetario,
      });
    } else {
      if (parseInt(code2[3]) < 9999){
        code2[3] = (parseInt(code2[3]) + 1).toString();
        this.chartOfAccounts.push({
          codeAccount: code2.join("."),
          nameAccount: nombreCuenta,
          clasificator: true,
          level: 4,
          report: report,
          moneyRub: rubroMonetario,
        });
      }
    }
    console.log(this.chartOfAccounts);
    this.sortChartOfAccounts();
    this.clearValues();
  }
  /*Funcion para ordenar el plan de cuentas*/
  sortChartOfAccounts(){
    this.chartOfAccounts.sort((a, b) => {
      // Utiliza el método localeCompare para ordenar alfabéticamente
      return a.codeAccount.localeCompare(b.codeAccount);
    });
  }
  /*Limpiar los valores de los elementos*/
  clearValues(){
    this.nombreCuentaInput.nativeElement.value = '';
    this.rubroMonetarioInput.nativeElement.checked = false;
    this.balanceInput.nativeElement.checked = true;
    this.resultInput.nativeElement.checked = false;
  }
  /*-----------------------------------------------------------------------------------------------------*/
  /*ELIMINAR NIVELES*/
  /*Eliminar el primer nivel*/
  deleteLevel1(codeAccount: string){
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[0]) != parseInt(code[0])){
        if (parseInt(account[0]) > parseInt(code[0])){
          let code2 = account;
          code2[0] = (parseInt(code2[0]) - 1).toString();
          this.chartOfAccounts[i].codeAccount = code2.join(".");
          aux.push(this.chartOfAccounts[i]);
        } else {
          aux.push(this.chartOfAccounts[i]);
        }
      }
    }
    console.log(aux);
    this.chartOfAccounts = aux;
    console.log(this.chartOfAccounts);
  }
  /*Eliminar el segundo nivel*/
  deleteLevel2(codeAccount: string){
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[1]) != parseInt(code[1]) || parseInt(account[0]) != parseInt(code[0])){
        if (parseInt(account[1]) > parseInt(code[1]) && parseInt(account[0]) == parseInt(code[0])){
          let code2 = account;
          code2[1] = (parseInt(code2[1]) - 1).toString();
          this.chartOfAccounts[i].codeAccount = code2.join(".");
          aux.push(this.chartOfAccounts[i]);
        } else {
          aux.push(this.chartOfAccounts[i]);
        }
      }
    }
    console.log(aux);
    this.chartOfAccounts = aux;
    console.log(this.chartOfAccounts);
  }
  /*Eliminar el tercer nivel*/
  deleteLevel3(codeAccount: string){
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[2]) != parseInt(code[2]) || parseInt(account[1]) != parseInt(code[1]) || parseInt(account[0]) != parseInt(code[0])){
        if (parseInt(account[2]) > parseInt(code[2]) && parseInt(account[1]) == parseInt(code[1]) && parseInt(account[0]) == parseInt(code[0])){
          let code2 = account;
          code2[2] = (parseInt(code2[2]) - 1).toString();
          this.chartOfAccounts[i].codeAccount = code2.join(".");
          aux.push(this.chartOfAccounts[i]);
        } else {
          aux.push(this.chartOfAccounts[i]);
        }
      }
    }
    console.log(aux);
    this.chartOfAccounts = aux;
    console.log(this.chartOfAccounts);
  }
  /*Eliminar el cuarto nivel*/
  deleteLevel4(codeAccount: string){
    let code = codeAccount.split(".");
    let aux = [];
    for (let i = 0; i < this.chartOfAccounts.length; i++){
      let account = this.chartOfAccounts[i].codeAccount.split(".");
      if (parseInt(account[3]) != parseInt(code[3]) || parseInt(account[2]) != parseInt(code[2]) || parseInt(account[1]) != parseInt(code[1]) || parseInt(account[0]) != parseInt(code[0])){
        if (parseInt(account[3]) > parseInt(code[3]) && parseInt(account[2]) == parseInt(code[2]) && parseInt(account[1]) == parseInt(code[1]) && parseInt(account[0]) == parseInt(code[0])){
          let code2 = account;
          code2[3] = (parseInt(code2[3]) - 1).toString();
          this.chartOfAccounts[i].codeAccount = code2.join(".");
          aux.push(this.chartOfAccounts[i]);
        } else {
          aux.push(this.chartOfAccounts[i]);
        }
      }
    }
    console.log(aux);
    this.chartOfAccounts = aux;
    console.log(this.chartOfAccounts);
  }
}
