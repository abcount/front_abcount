import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  configurationUrl = `${environment.BACKEND_URL}/config/enterprise`;

  companyId = localStorage.getItem('companyId');

  // Función para obtener usuarios de la empresa
  getUsers() {
    return this.http.get(`${this.configurationUrl}/invitation/pending/${this.companyId}`);
  }
  // Función para eliminar usuarios de la empresa
  deleteUser(id: any) {
    return this.http.delete(`${this.configurationUrl}/invitation/pending/user/${id}`);
  }
}
