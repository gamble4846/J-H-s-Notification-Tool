import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompaniesService } from 'src/app/Services/CompaniesService/companies.service';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { ProfileService } from 'src/app/Services/ProfileService/profile.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  fullPageLoading = false;
  CompanyModal = false;
  CompanyModalTitle = "Add Comapny";
  CompaniesData:any = [];

  constructor(private SessionManagement:SessionManagementService, private Notification:NotificationService, private fb: FormBuilder, private Companies: CompaniesService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Companies');

    this.UpdateCompanies();
  }

  UpdateCompanies(){
    this.fullPageLoading = true;
    this.Companies.GetCompanies()
    .subscribe((response:any) => {
      response = JSON.parse(response);
      this.fullPageLoading = false;
      if(response.status != "200"){
        this.fullPageLoading = false;
        this.Notification.HandleServerError(response.message);
      }
      else{
        this.fullPageLoading = false;
        this.CompaniesData = response.data;
        this.CompaniesData.pop();
        console.log(this.CompaniesData);
      }
    },
    (error) => {
      this.fullPageLoading = false;
      this.Notification.HandleServerError(error.message);
    });
  }

  CompanyModalCancel(){
    this.CompanyModal = false;
  }

  CompanyModalSave(){
    this.CompanyModal = false;
  }

  ShowCompanyModal(data:any){
    this.CompanyModal = true;
  }
}
