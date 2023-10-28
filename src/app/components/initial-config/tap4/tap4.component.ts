import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormStateService } from "../../../services/form-state.service";
import { Router } from '@angular/router';
import { newAccountDto } from 'src/app/dto/newAccount.dto';

interface Account {
  accountCode: number;
  nameAccount: string;
  moneyRub: boolean;
  report: boolean;
  classificator: boolean;
  level: number;
  childrenAccounts: Account[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})

export class Tap4Component {

  accountPlan: newAccountDto[] = [
    {
      accountCode: 1,
      nameAccount: 'Activo',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 110,
          nameAccount: 'Activo Corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 11010,
              nameAccount: 'Disponible',
              moneyRub: true,
              report: true,
              classificator: false,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [],
            },
            {
              accountCode: 11011,
              nameAccount: 'Exigible',
              moneyRub: true,
              report: true,
              classificator: false,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [],
            }
          ],
        },
        {
          accountCode: 111,
          nameAccount: 'Activo no corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 11110,
              nameAccount: 'Activo Fijo',
              moneyRub: true,
              report: true,
              classificator: false,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [],
            },
            {
              accountCode: 11111,
              nameAccount: 'Cuentas Complemetarias de Activo',
              moneyRub: true,
              report: true,
              classificator: false,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [],
            }
          ],
        }
      ],
    },
    {
      accountCode: 2,
      nameAccount: 'Pasivo',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 210,
          nameAccount: 'Pasivo Corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 21010,
              nameAccount: 'Exigible',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 2101010,
                  nameAccount: 'Cuentas por pagar',
                  moneyRub: true,
                  report: true,
                  classificator: false,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [],
                }
              ],
            }
          ],
        },
        {
          accountCode: 211,
          nameAccount: 'Pasivo No Corriente',
          moneyRub: true,
          report: true,
          classificator: false,
          level: 2,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        }
      ],
    },
    {
      accountCode: 3,
      nameAccount: 'Patrimonio',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 310,
          nameAccount: 'Capital',
          moneyRub: true,
          report: true,
          classificator: false,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        },
        {
          accountCode: 311,
          nameAccount: 'Ajuste al Patrimonio',
          moneyRub: true,
          report: true,
          classificator: false,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        }
      ],
    },
    {
      accountCode: 4,
      nameAccount: 'Ingreso',
      moneyRub: true,
      report: false,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 410,
          nameAccount: 'Ingresos Operacionales',
          moneyRub: true,
          report: false,
          classificator: false,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        },
        {
          accountCode: 411,
          nameAccount: 'Ingresos no Operacionales',
          moneyRub: true,
          report: false,
          classificator: false,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        }
      ]
    },
    {
      accountCode: 5,
      nameAccount: 'Egresos',
      moneyRub: true,
      report: false,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 510,
          nameAccount: 'Egresos Operacionales',
          moneyRub: true,
          report: false,
          classificator: false,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [],
        }
      ],
    }
  ];

  constructor(public formService: FormStateService, private router: Router) { }

  ngOnInit() {
    const accountPlan = localStorage.getItem('accountPlan');
    if (accountPlan != null) {
      this.accountPlan = JSON.parse(accountPlan);
      this.createAccountPlan(this.accountPlan);
    } else {
      localStorage.setItem('accountPlan', JSON.stringify(this.accountPlan));
      this.createAccountPlan(this.accountPlan);
    }
  }

  createAccountPlan (account: any[]) {
    for (let i = 0; i < account.length; i++) {
      if (account[i].childrenAccounts.length > 0) {
        account[i].childrenAccounts.forEach((element: any) => {
          element.parent = account[i];
        });
        this.createAccountPlan(account[i].childrenAccounts);
      }
    }
  }

  @ViewChild("accountName") accountName: string = "";
  accountMoneyRub: boolean = false;
  accountReport: boolean = false;

  newAccount: newAccountDto = {
    accountCode: 0,
    nameAccount: '',
    moneyRub: false,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: [],
    expanded: false,
    digitsOfLevel: 0,
    showAddPopup: false,
    showEditPopup: false
  };

  showAddPopupParent: boolean = false;
  // Función para mostrar el popup de agregar nuevo padre
  showAddPopupParentChange() {
    this.showAddPopupParent = !this.showAddPopupParent;
  }
  addParent(){
    this.newAccount.accountCode = this.accountPlan.length + 1;
    this.newAccount.nameAccount = this.accountName;
    this.newAccount.moneyRub = this.accountMoneyRub;
    this.newAccount.report = this.accountReport;
    this.newAccount.digitsOfLevel = 1;
    this.accountPlan.push(this.newAccount);
    this.reset();
    this.showAddPopupParentChange();
  }
  cancel(){
    this.reset();
    this.showAddPopupParentChange();
  }
  reset(){
    this.newAccount = {
      accountCode: 0,
      nameAccount: '',
      moneyRub: false,
      report: false,
      classificator: false,
      level: 0,
      childrenAccounts: [],
      expanded: false,
      digitsOfLevel: 0,
      showAddPopup: false,
      showEditPopup: false
    }
    this.accountName = "";
    this.accountMoneyRub = false;
  }

  // FORM GROUP
  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  treeData: Account[] = [];

  guardarJSON() {
    this.mostrarPopupConfirm = true;
    console.log('Datos en JSON:');
    this.transformAccountPlan(this.accountPlan);
    const treeData = this.treeData;

    console.log(JSON.stringify(treeData, null, 2));
    console.log('*********************************************');

    const accountPlanArray = this.formService.fb.array(
      treeData.map(account =>
        this.formService.fb.group({
          ...account, // spread para agregar todas las propiedades de la cuenta
          childrenAccounts: this.formService.fb.array(account.childrenAccounts) // childrenAccounts como FormArray
        })
      )
    );

    this.formGroup.setControl('accountablePlan', accountPlanArray);
    this.printValue();
    this.enviarDatos();
  }

  transformAccountPlan(account: newAccountDto[], parent: any = null) {
    for (let i = 0; i < account.length; i++) {
      const accountItem = {
        accountCode: account[i].accountCode,
        nameAccount: account[i].nameAccount,
        moneyRub: account[i].moneyRub,
        report: account[i].report,
        classificator: account[i].classificator,
        level: account[i].level,
        childrenAccounts: []
      };
  
      if (parent) {
        parent.childrenAccounts.push(accountItem);
      } else {
        this.treeData.push(accountItem);
      }
  
      if (account[i].childrenAccounts.length > 0) {
        this.transformAccountPlan(account[i].childrenAccounts, accountItem);
      }
    }
  }  

  printValue() {
    console.log('Datos en el formulario:');
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }
  
  loading: boolean = true;
  titleMessage: string = '¡Enhorabuena!';
  message: string = 'Los datos de la empresa se han guardado correctamente.';
  messageIcon: string = 'fa-regular fa-circle-check gradient';

  enviarDatos() {
    const storedImagen = localStorage.getItem('imagen');
    const formData = new FormData();
    const image= this.formService.getImage();
    if (image) {
      console.log('Imagen en el componente:');
      console.log(image);
      formData.append('image', image);
    }

    formData.append('datos', JSON.stringify(this.formGroup.value));

    this.formService.enviarDatos(formData).subscribe({
      next: response => {
        if(response.success){
          this.titleMessage = '¡Enhorabuena!';
          this.message = 'Los datos de la empresa se han guardado correctamente.';
          this.messageIcon = 'fa-regular fa-circle-check gradient';
        } else {
          this.titleMessage = 'Ocurrio un error!';
          this.message = response.message;
          this.messageIcon = 'fa-regular fa-circle-times gradient-red';
        }
        this.loading = false;
      },
      error: error => {
        this.titleMessage = 'Ocurrio un error!';
        this.message = 'No se pudo comunicar con el servidor, intente de nuevo más tarde.';
        this.messageIcon = 'fa-regular fa-circle-times gradient-red';
        this.loading = false;
      }
    });
  }

  mostrarPopupConfirm = false;

  confirm(){
    localStorage.clear();
    window.location.href = '/my-companies';
  }

  // Función para guardar los datos en el local storage
  accountsLocalStorage: newAccountDto[] = [];
  back(){
    this.accountsLocalStorage = this.accountPlan;
    this.saveLocalStorage(this.accountsLocalStorage);
    localStorage.setItem('accountPlan', JSON.stringify(this.accountsLocalStorage));
    this.router.navigate(['/initial-config/tap3']);
  }
  saveLocalStorage(account: newAccountDto[]) {
    for (let i = 0; i < account.length; i++) {
      account[i].parent = undefined;
      if (account[i].childrenAccounts.length > 0) {
        this.saveLocalStorage(account[i].childrenAccounts);
      }
    }
  }
}