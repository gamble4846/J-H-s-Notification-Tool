import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private Notification:NotificationService,private fb: FormBuilder, private Login: LoginService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value.password);
      this.Login.LoginUser(this.validateForm.value.password,this.validateForm.value.userName)
      .subscribe((response:any) => {
        response = JSON.parse(response);
        console.log(response);

        if(response.status != 200){
          this.Notification.HandleServerError(response.message);
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
