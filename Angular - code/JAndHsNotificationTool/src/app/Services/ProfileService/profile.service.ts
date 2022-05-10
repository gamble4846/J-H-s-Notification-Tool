import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../SessionManagement/session-management.service';
import { NotificationService } from '../NotificationService/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  APILINK = "https://script.google.com/macros/s/AKfycbzW-xeD3wz_NZi-UiiPwjwBxOGFTBeRYw1fP_X3x_qwZ3uQIqSRlDj-xUijECNRxM7A/exec";
  constructor(private http: HttpClient, private SessionManagement:SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return options;
  }

  GetProfile() {
    let body = {
      "method": "GETPROFILE",
      "tokken": this.SessionManagement.getCurrentUser().token
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  UpdateProfile(LogoURL:any, ContactEmail:any, Address:any){
    let body = {
      "method": "UPDATEPROFILE",
      "LogoURL": LogoURL,
      "ContactEmail": ContactEmail,
      "Address": Address,
      "tokken": this.SessionManagement.getCurrentUser().token
    }

    return this.http.post(this.APILINK, body, this.getOptions());
  }
}
