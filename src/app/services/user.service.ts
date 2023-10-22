import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralDto } from '../dto/general.dto';
import { CompanyDto } from '../dto/company.dto';
import { AreaSubsAndRoles, UserSearcherDto } from '../dto/areasubsroles.dto';
import { EmployeeAndInvitationDto, EmployeeDto } from '../dto/userinvitation.dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  configurationUrl = `${environment.BACKEND_URL}/config/enterprise`;

  companyId = localStorage.getItem('companyId');

  

  //Function to get users and invited by companyId
  getUsersAndInvitedByCompanyId(){
 
    let compId = 1;
    return this.http.get<GeneralDto<EmployeeAndInvitationDto>>(`${environment.BACKEND_URL}/companies/${compId}/employees`);
  }

  // Función para eliminar usuarios de la empresa
  deleteUser(id: any) {
    return this.http.delete(`${this.configurationUrl}/invitation/pending/user/${id}`);
  }

  // function to invite
  inviteUserWithData(userId: number, areaSubsidiaryId: number[], roles: number[]){
    const body = {
      userId: userId,
      areaSubsidiaryId: areaSubsidiaryId, 
      roles: roles
    };
    let compId = 1
    
    return this.http.post<GeneralDto<any>>(`${environment.BACKEND_URL}/companies/${compId}/invitations`, body);
  }
  

  // Function to update users similar to create invitations
  updatePermissions(userId: number, areaSubsidiaryId: number[], roles: number[]) {
    const body = {
      userId: userId,
      areaSubsidiaryId: areaSubsidiaryId, 
      roles: roles
    };
    let compId = 1
    
    return this.http.put<GeneralDto<any>>(`${environment.BACKEND_URL}/companies/${compId}/users/${userId}/roles`, body);
    
  }

  // Function to get companies by user
  getCompaniesByUser(){
    return this.http.get<GeneralDto<CompanyDto[]>>(`${environment.BACKEND_URL}/companies`);
  }
  // Function to get information of user
  getInfoUser(){
    return this.http.get(`${environment.BACKEND_URL}/users/info`);
  }

  getSummInfoUserByIdAndCompany(userId: number){
    let compId = 1; 
    return this.http.get<GeneralDto<EmployeeDto>>(`${environment.BACKEND_URL}/companies/${compId}/employees/${userId}`);
  }

  getPermissionAndRolesByUserAndCompany(userId: number){
    let compId = 1;
    return this.http.get<GeneralDto<AreaSubsAndRoles>>(`${environment.BACKEND_URL}/companies/${compId}/users/${userId}/roles`);
  }
 
  // Function to search user
  searchUser(limit:number, pattern:string){
    return this.http.get<GeneralDto<UserSearcherDto[]>>(`${environment.BACKEND_URL}/users?search=${pattern}&limit=${limit}`);
 
  }
}
