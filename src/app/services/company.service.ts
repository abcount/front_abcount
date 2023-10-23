import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralDto } from '../dto/general.dto';
import { AreaSubsAndRoles } from '../dto/areasubsroles.dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  configurationUrl = `${environment.BACKEND_URL}/config/enterprise`;
  companyId = localStorage.getItem('companyId');
  constructor(private http: HttpClient) { }

  getAllSubsAndRoles(){
    let comId = 1;
    `${environment.BACKEND_URL}/users/info`
    //return this.http.get<GeneralDto<AreaSubsAndRoles>>("http://localhost:3000/roles-subs-and-areas")
    return this.http.get<GeneralDto<AreaSubsAndRoles>>(`${environment.BACKEND_URL}/companies/${this.companyId}/area-subsidiary`)
  }
}
