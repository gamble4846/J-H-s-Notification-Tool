import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionManagementService } from '../SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APILINK = "https://script.google.com/macros/s/AKfycbw-keS3ji-svKmFcpG505JkT4PJDvLNA5k8ph50KBkZ4O-LxuYy7GM7g9bT4Bi-GQtC/exec";
  constructor(private http: HttpClient, private SessionManagement:SessionManagementService) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return options;
  }

  GetUsers() {
    let body = {
      "method": "GETUSERS",
      "tokken": this.SessionManagement.getCurrentUser().token
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

  GetCurrentUser(){
    let body = {
      "method": "GETCURRENTUSER",
      "tokken": this.SessionManagement.getCurrentUser().token
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }
}
