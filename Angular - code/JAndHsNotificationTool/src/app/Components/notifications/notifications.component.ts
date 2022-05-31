import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompaniesService } from 'src/app/Services/CompaniesService/companies.service';
import { NotificationSERService } from 'src/app/Services/NotificationSERService/notification-ser.service';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';
import { UserService } from 'src/app/Services/UserService/user.service';
import * as htmlToImage from 'html-to-image';
import * as FileSaver from 'file-saver';


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
  ProfileData:any = {};
  CurrentUserData:any;
  showTable=true;
  isSaving = false;


  //--------------------FORM----------------
  Greetings:any;
  NotificationMessage:any;
  SelectedCompany:any;
  SelectedCompanyObject:any;
  NewDate:any;
  //----------------------------------------

  constructor( private Profile: ProfileService, private User: UserService, private Companies: CompaniesService, private SessionManagement:SessionManagementService, private Notification:NotificationService, private fb: FormBuilder, private NotificationSER: NotificationSERService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Notifications');
    this.resetForm();
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
                this.Profile.GetProfile()
                .subscribe((response:any) => {
                  response = JSON.parse(response);
                  this.fullPageLoading = false;
                  if(response.status != "200"){
                    this.fullPageLoading = false;
                    this.Notification.HandleServerError(response.message);
                  }
                  else{
                    this.ProfileData = response.data;
                    this.fullPageLoading = true;
                    this.User.GetCurrentUser()
                    .subscribe((response:any) => {
                      response = JSON.parse(response);
                      if(response.status != "200"){
                        this.fullPageLoading = false;
                        this.Notification.HandleServerError(response.message);
                      }
                      else{
                        this.CurrentUserData = response.data;
                        this.AllDataRecieved();
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
    },
    (error) => {
      this.fullPageLoading = false;
      this.Notification.HandleServerError(error.message);
    });
  }

  CompanyChanged(){
    console.log(this.SelectedCompany);
    this.SelectedCompanyObject = this.CompaniesData.find((x:any)=> x.CompanyID == this.SelectedCompany);
  }

  resetForm(){
    console.log(this.notificationData);
    console.log(this.CompaniesData);
    console.log(this.UserData);
    console.log(this.ProfileData);
    console.log(this.CurrentUserData);

    this.Greetings = "Dear Customer,";
    this.NotificationMessage = "";
    this.SelectedCompany = this.CompaniesData[0];
    this.SelectedCompanyObject = this.CompaniesData[0];

    let today = (new Date());
    this.NewDate = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDay();

  }

  SaveNotificaiton(){

  }

  AllDataRecieved(){
    this.notificationData.forEach((noti:any) => {
      noti.CompanyName = this.CompaniesData.find((x:any) => x.CompanyID = noti.CompanyID).CompanyName;
      noti.UserName = this.UserData.find((x:any) => x.UsersId = noti.UsersId).Name;
    });
  }

  ShowNotificationForm(data:any){
    if(data == null){
      this.resetForm();
    }
    this.showTable=false;
  }

  ShowTable(){
    this.showTable=true;
  }

  SaveImage(){
    var node:any = document.getElementById('NotificationDIV');
    htmlToImage.toPng(node)
      .then( (dataUrl) => {
        var img = new Image();
        img.src = dataUrl;
        this.downloadBase64Data(dataUrl, "image.png")
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

      //lol

  }

  downloadBase64Data = (base64String:any, fileName:any) => {
    let file = this.convertBase64ToFile(base64String, fileName);
    FileSaver.saveAs(file, fileName);
  }

  convertBase64ToFile = (base64String:any, fileName:any) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  }

}
