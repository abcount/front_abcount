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
  // Función para obtener las sucursales y areas
  getUsers() {
    return this.http.get(`${this.configurationUrl}/invitation/pending`);
  }
}
