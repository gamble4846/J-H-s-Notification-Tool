import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor() { }

  getCurrentUser(){
    let user = JSON.parse(localStorage.getItem('user') || "{}");
    return user;
  }

  putCurrentuser(email:any, token:any){
    let user = {
      email: email,
      token: token
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteCurrentuser(){
    localStorage.setItem('user', "{}");
  }

  isLoggedIn(){
    return (!(this.getCurrentUser().email == undefined));
  }
}
