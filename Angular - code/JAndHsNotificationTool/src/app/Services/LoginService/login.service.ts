import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APILINK = "https://script.google.com/macros/s/AKfycbx9ebea_WxtN7li5kWus2XqGZpERSZMGf7u19tZe6U3OPmx9Pz4ZCBsrRgrSWg7BXKU/exec";
  constructor(private http: HttpClient) { }

  LoginUser(password:any, email:any) {
    let body = {
      "method": "LOGIN",
      "Email": email,
      "Password": password
    }
    return this.http.post(this.APILINK, body);
  }

}
