import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor(public router:Router) { }

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

  redirectAccLogin(Component:any){
    if(this.isLoggedIn()){
      this.router.navigate([Component]);
    }
    else{
      this.router.navigate(['Login']);
    }
  }
}
