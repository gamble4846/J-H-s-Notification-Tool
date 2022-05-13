import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompaniesService } from 'src/app/Services/CompaniesService/companies.service';
import { NotificationSERService } from 'src/app/Services/NotificationSERService/notification-ser.service';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  fullPageLoading = false;
  notificationData:any = [];
  CompaniesData:any = [];
  UserData:any = [];
  showTable=true;
  constructor(private User: UserService, private Companies: CompaniesService, private SessionManagement:SessionManagementService, private Notification:NotificationService, private fb: FormBuilder, private NotificationSER: NotificationSERService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Notifications');

    this.UpdateNotifications();
  }

  UpdateNotifications(){
    this.fullPageLoading = true;
    this.NotificationSER.GetNotificaitons()
    .subscribe((response:any) => {
      response = JSON.parse(response);
      if(response.status != "200"){
        this.fullPageLoading = false;
        this.Notification.HandleServerError(response.message);
      }
      else{
        this.notificationData = response.data;
        this.notificationData.pop();
        this.Companies.GetCompanies()
        .subscribe((response:any) => {
          response = JSON.parse(response);
          if(response.status != "200"){
            this.fullPageLoading = false;
            this.Notification.HandleServerError(response.message);
          }
          else{
            this.CompaniesData = response.data;
            this.CompaniesData.pop();
            this.User.GetUsers()
            .subscribe((response:any) => {
              response = JSON.parse(response);
              if(response.status != "200"){
                this.fullPageLoading = false;
                this.Notification.HandleServerError(response.message);
              }
              else{
                this.UserData = response.data;
                this.UserData.pop();
                console.log(this.UserData);
                this.AllDataRecieved();
                this.fullPageLoading = false;
              }
            },
            (error) => {
              this.fullPageLoading = false;
              this.Notification.HandleServerError(error.message);
            });
            this.fullPageLoading = false;
          }
        },
        (error) => {
          this.fullPageLoading = false;
          this.Notification.HandleServerError(error.message);
        });
      }
    },
    (error) => {
      this.fullPageLoading = false;
      this.Notification.HandleServerError(error.message);
    });
  }

  AllDataRecieved(){
    this.notificationData.forEach((noti:any) => {
      noti.CompanyName = this.CompaniesData.find((x:any) => x.CompanyID = noti.CompanyID).CompanyName;
      noti.UserName = this.UserData.find((x:any) => x.UsersId = noti.UsersId).Name;
    });

    console.log(this.notificationData);
  }

  ShowNotificationForm(){
    this.showTable=false;
  }

  ShowTable(){
    this.showTable=true;
  }
}
