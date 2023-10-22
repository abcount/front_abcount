import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralDto } from '../dto/general.dto';
import { CompanyDto } from '../dto/company.dto';
import { UserSearcherDto } from '../dto/areasubsroles.dto';


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

  // Función para invitar usuarios de la empresa
  inviteUser(username: string, subsidiaries: number[], areas: number[], roles: number[]) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const body = {
      'username': username,
      'subsidiaries': subsidiaries,
      'areas': areas,
      'roles': roles
    };
    console.log(body);
    return this.http.post(`${this.configurationUrl}/invitation/pending/${this.companyId}`, body, { headers: header });
  }

  // Función para actualizar los permisos de un usuario
  updatePermissions(id: any, subsidiaries: number[], areas: number[], roles: number[]) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const body = {
      'id': id,
      'subsidiaries': subsidiaries,
      'areas': areas,
      'roles': roles
    };
    console.log(body);
    return this.http.put(`${this.configurationUrl}/invitation/pending/user/${id}`, body, { headers: header });
  }

  // Function to get companies by user
  getCompaniesByUser(){
    return this.http.get<GeneralDto<CompanyDto[]>>(`${environment.BACKEND_URL}/companies`);
  }
  // Function to get information of user
  getInfoUser(){
    return this.http.get(`${environment.BACKEND_URL}/users/info`);
  }

  // Function to search user
  searchUser(limit:number, pattern:string){
    return this.http.get<GeneralDto<UserSearcherDto[]>>("http://localhost:3000/search-users-by-parameters");
  }
}
