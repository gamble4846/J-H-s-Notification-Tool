import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../SessionManagement/session-management.service';
import { NotificationService } from '../NotificationService/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  APILINK = "https://script.google.com/macros/s/AKfycbwCcwCwWoK9oFmXUgDR28CSXo1pbOQOCW3c8VvNsku3On9tV0nYzelKr0JyOS4DUQsK/exec";
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
}
