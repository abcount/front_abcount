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
    return this.http.get<GeneralDto<AreaSubsAndRoles>>("http://localhost:3000/roles-subs-and-areas")
  }
}
