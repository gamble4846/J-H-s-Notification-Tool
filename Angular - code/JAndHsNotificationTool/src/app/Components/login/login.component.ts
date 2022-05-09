import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private SessionManagement:SessionManagementService, private Notification:NotificationService,private fb: FormBuilder, private Login: LoginService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ["jayprakash@JandH.com", [Validators.required, Validators.email]],
      password: ["admin123#$Jay", [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.Login.LoginUser(this.validateForm.value.password,this.validateForm.value.userName)
      .subscribe((response:any) => {
        response = JSON.parse(response);
        if(response.status != 200){
          this.Notification.HandleServerError(response.message);
        }
        else{
          console.log(this.SessionManagement.isLoggedIn());
          console.log(response);
          this.SessionManagement.putCurrentuser(this.validateForm.value.userName, response.data.Tokken);
          console.log(this.SessionManagement.isLoggedIn());
          console.log(this.SessionManagement.getCurrentUser());
        }
      },
      (error) => {
        this.Notification.HandleServerError(error.message);
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
