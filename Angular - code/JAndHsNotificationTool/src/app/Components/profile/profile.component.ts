import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fullPageLoading = false;
  constructor(private SessionManagement:SessionManagementService, private Notification:NotificationService, private fb: FormBuilder, private Profile: ProfileService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Profile');
    this.profileForm = this.fb.group({
      LogoURL: [null, [Validators.required]],
      ContactEmail: [null, [Validators.email, Validators.required]],
      Address: [null, [Validators.required]],
    });

    this.getProfile();
  }

  profileForm!: FormGroup;

  ProfileFormSubmit(): void {
    if (this.profileForm.valid) {
      this.updateProfile(this.profileForm.value.LogoURL, this.profileForm.value.ContactEmail, this.profileForm.value.Address);
    } else {
      Object.values(this.profileForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateProfile(LogoURL:any, ContactEmail:any, Address:any){
    this.fullPageLoading = true;
    this.Profile.UpdateProfile(LogoURL,ContactEmail,Address)
    .subscribe((response:any) => {
      response = JSON.parse(response);
      this.fullPageLoading = false;
      if(response.status != "200"){
        this.fullPageLoading = false;
        this.Notification.HandleServerError(response.message);
      }
      else{
        this.fullPageLoading = false;
        this.getProfile();
      }
    },
    (error) => {
      this.fullPageLoading = false;
      this.Notification.HandleServerError(error.message);
    });
  }

  getProfile(){
    this.fullPageLoading = true;
    this.Profile.GetProfile()
    .subscribe((response:any) => {
      response = JSON.parse(response);
      this.fullPageLoading = false;
      if(response.status != "200"){
        this.fullPageLoading = false;
        this.Notification.HandleServerError(response.message);
      }
      else{
        this.fullPageLoading = false;
        this.profileForm.patchValue({
          LogoURL: response.data.LogoURL,
          ContactEmail: response.data.ContactEmail,
          Address: response.data.Address,
        });
      }
    },
    (error) => {
      this.fullPageLoading = false;
      this.Notification.HandleServerError(error.message);
    });
  }
}
