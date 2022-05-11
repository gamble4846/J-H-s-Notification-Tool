import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { SessionManagementService } from '../SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  APILINK = "https://script.google.com/macros/s/AKfycbzW-xeD3wz_NZi-UiiPwjwBxOGFTBeRYw1fP_X3x_qwZ3uQIqSRlDj-xUijECNRxM7A/exec";
  constructor(private http: HttpClient, private SessionManagement:SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return options;
  }

  GetCompanies() {
    let body = {
      "method": "GETCOMPANIES",
      "tokken": this.SessionManagement.getCurrentUser().token
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  PostCompany(code:any, name:any){
    let body = {
      "method": "POSTCOMPANY",
      "tokken": this.SessionManagement.getCurrentUser().token,
      "CompanyName": name,
      "CompanyCode": code
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  PutCompany(code:any, name:any, id:any){
    let body = {
      "method": "PUTCOMPANY",
      "tokken": this.SessionManagement.getCurrentUser().token,
      "CompanyName": name,
      "CompanyCode": code,
      "CompanyId": id
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }
}
