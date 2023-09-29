import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnterpriseDto } from 'src/app/dto/enterprise.dto';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration-tap1',
  templateUrl: './configuration-tap1.component.html',
  styleUrls: ['./configuration-tap1.component.css']
})
export class ConfigurationTap1Component {

  // Controladores para los inputs
  controlName: FormControl = new FormControl('', []);
  controlRubro: FormControl = new FormControl('', []);
  controlNit: FormControl = new FormControl('', []);
  controlAddress: FormControl = new FormControl('', []);
  controlContactEmail: FormControl = new FormControl('', []);
  controlContactName: FormControl = new FormControl('', []);
  patternAll = '.*';
  patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  patternNumber = '^[0-9]*$';

  // Variable para almacenar los datos de la empresa
  enterpriseData: EnterpriseDto;
  logoUuid: string;

  // Constructor
  constructor(private ConfigurationService: ConfigurationService) {}

  // Funcion al iniciar la pantalla
  ngOnInit() {
    this.ConfigurationService.getEnterprise().subscribe(
      (data: any) => {
        this.enterpriseData = data.data;
        this.controlName.setValue(this.enterpriseData.companyName);
        this.controlRubro.setValue(this.enterpriseData.diccCategory);
        this.controlNit.setValue(this.enterpriseData.nit);
        this.controlAddress.setValue(this.enterpriseData.address);
        this.logoUuid = "data:image/jpeg;base64,"+this.enterpriseData.logoUuid;
        this.controlContactEmail.setValue(this.enterpriseData.contactEmail);
        this.controlContactName.setValue(this.enterpriseData.contactName);
      }
    );
    this.disable();
  }

  // Campos para las fotos
  selectedLogo: File;
  onFileSelectedLogo(event: any) {
    this.selectedLogo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result != null){
        this.logoUuid = reader.result?.toString();
        console.log(this.logoUuid);
      }
    };
    reader.readAsDataURL(this.selectedLogo);
  }

  // Variable para controlar que los campos esten llenos
  @ViewChild('errorMessage') errorMessage: ElementRef;

  // Función para guardar cambios realizados
  save() {
    if (this.controlName.value == '' || this.controlRubro.value == '' || this.controlNit.value == '' || this.controlAddress.value == '' || this.controlContactEmail.value == '' || this.controlContactName.value == '') {
      this.errorMessage.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessage.nativeElement.classList.remove('show');
      }, 3000);
    } else {
      if (this.controlName.valid && this.controlRubro.valid && this.controlNit.valid && this.controlAddress.valid && this.controlContactEmail.valid && this.controlContactName.valid) {
        this.ConfigurationService.updateEnterprise(this.controlName.value, this.controlRubro.value, this.controlNit.value, this.controlAddress.value, this.logoUuid, 
          this.controlContactEmail.value, this.controlContactName.value).subscribe(
            (data: any) => {
              console.log(data);
              this.enterpriseData = data.data;
              this.controlName.setValue(this.enterpriseData.companyName);
              this.controlRubro.setValue(this.enterpriseData.diccCategory);
              this.controlNit.setValue(this.enterpriseData.nit);
              this.controlAddress.setValue(this.enterpriseData.address);
              this.logoUuid = "data:image/jpeg;base64,"+this.enterpriseData.logoUuid;
              this.controlContactEmail.setValue(this.enterpriseData.contactEmail);
              this.controlContactName.setValue(this.enterpriseData.contactName);
            }
          );
        this.disable();
      } else {
        this.errorMessage.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorMessage.nativeElement.classList.remove('show');
        }, 3000);
      }
    }
  }

  // Función para cancelar los cambios
  cancel() {
    this.controlName.setValue(this.enterpriseData.companyName);
    this.controlRubro.setValue(this.enterpriseData.diccCategory);
    this.controlNit.setValue(this.enterpriseData.nit);
    this.controlAddress.setValue(this.enterpriseData.address);
    this.controlContactEmail.setValue(this.enterpriseData.contactEmail);
    this.controlContactName.setValue(this.enterpriseData.contactName);
    this.logoUuid = "data:image/jpeg;base64,"+this.enterpriseData.logoUuid;
    this.disable();
  }

  // Variable para controlar el modo de edición
  modeEdit: boolean = false;

  // Función para habilitar los inputs
  enable() {
    this.modeEdit = true;
    this.controlName.enable();
    this.controlRubro.enable();
    this.controlNit.enable();
    this.controlAddress.enable();
    this.controlContactEmail.enable();
    this.controlContactName.enable();
  }
  // Función para deshabilitar los inputs
  disable() {
    this.modeEdit = false;
    this.controlName.disable();
    this.controlRubro.disable();
    this.controlNit.disable();
    this.controlAddress.disable();
    this.controlContactEmail.disable();
    this.controlContactName.disable();
  }
}
