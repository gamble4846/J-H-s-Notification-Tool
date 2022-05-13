import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionManagementService } from '../SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APILINK = "https://script.google.com/macros/s/AKfycbxGJcx4I1BOKQAgWqOvZqCssix39ilfSkgwd0t4MrJDQXbo74dOZDSSQZwpkiRok5Il/exec";
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
}
