import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APILINK = "https://script.google.com/macros/s/AKfycbwCcwCwWoK9oFmXUgDR28CSXo1pbOQOCW3c8VvNsku3On9tV0nYzelKr0JyOS4DUQsK/exec";
  //APILINK = "https://script.google.com/macros/s/AKfycbx-bFn5rk-eTKdGuMs1vS-Kt6XOnm-UCkizmtpc6E0TLUWePSJg8VNwxZwDqszuQUpM/exec";
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
