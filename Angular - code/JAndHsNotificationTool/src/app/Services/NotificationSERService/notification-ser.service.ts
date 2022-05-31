import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { SessionManagementService } from '../SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationSERService {
  APILINK = "https://script.google.com/macros/s/AKfycbw-keS3ji-svKmFcpG505JkT4PJDvLNA5k8ph50KBkZ4O-LxuYy7GM7g9bT4Bi-GQtC/exec";
  constructor(private http: HttpClient, private SessionManagement:SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }

  GetNotificaitons(){
    let body = {
      "method": "GETNOTIFICATION",
      "tokken": this.SessionManagement.getCurrentUser().token
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  PostNotificaitons(newDate:any, CompanyID:any, Notification:any){
    newDate = '"' + newDate + '"';
    let body = {
      "method": "POSTNOTIFICATION",
      "tokken": this.SessionManagement.getCurrentUser().token,
      "newDate": newDate,
      "CompanyID": CompanyID,
      "Notification": Notification
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  PutNotificaitons(NotificationID:any, Notification:any){
    let body = {
      "method": "PUTNOTIFICATION",
      "tokken": this.SessionManagement.getCurrentUser().token,
      "Notification": Notification,
      "NotificationID": NotificationID
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }
}
