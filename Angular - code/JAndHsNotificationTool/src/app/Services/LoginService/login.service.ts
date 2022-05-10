import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APILINK = "https://script.google.com/macros/s/AKfycbzW-xeD3wz_NZi-UiiPwjwBxOGFTBeRYw1fP_X3x_qwZ3uQIqSRlDj-xUijECNRxM7A/exec";
  constructor(private http: HttpClient) { }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return options;
  }

  LoginUser(password:any, email:any) {
    let body = {
      "method": "LOGIN",
      "Email": email,
      "Password": password
    }
    return this.http.post(this.APILINK, body, this.getOptions());
  }

}
