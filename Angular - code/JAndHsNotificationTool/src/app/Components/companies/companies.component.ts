import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  companyForm!: FormGroup;

  constructor(private SessionManagement:SessionManagementService, private Notification:NotificationService, private fb: FormBuilder, private Companies: CompaniesService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Companies');
    this.companyForm = this.fb.group({
      CompanyId: [null],
      CompanyCode: [null, [Validators.required]],
      CompanyName: [null, [Validators.required]]
    });
    this.UpdateCompanies();
  }

  CompanyFormSubmit(){
    if (this.companyForm.valid) {
      this.HandleCompanyFormSubmitValid(this.companyForm.value);
      this.resetCompanyForm();
      this.CompanyModal = false;
    } else {
      Object.values(this.companyForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  HandleCompanyFormSubmitValid(formData:any){
    this.fullPageLoading = true;

    let id = formData.CompanyId;
    let code = formData.CompanyCode;
    let name = formData.CompanyName;

    if(id == null || id == undefined){
      this.Companies.PostCompany(code,name)
      .subscribe((response:any) => {
        response = JSON.parse(response);
        this.fullPageLoading = false;
        if(response.status != "200"){
          this.fullPageLoading = false;
          this.Notification.HandleServerError(response.message);
        }
        else{
          this.fullPageLoading = false;
          this.UpdateCompanies();
        }
      },
      (error) => {
        this.fullPageLoading = false;
        this.Notification.HandleServerError(error.message);
      });
    }
    else{
      this.Companies.PutCompany(code,name,id)
      .subscribe((response:any) => {
        response = JSON.parse(response);
        this.fullPageLoading = false;
        if(response.status != "200"){
          this.fullPageLoading = false;
          this.Notification.HandleServerError(response.message);
        }
        else{
          this.fullPageLoading = false;
          this.UpdateCompanies();
        }
      },
      (error) => {
        this.fullPageLoading = false;
        this.Notification.HandleServerError(error.message);
      });
    }
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
    this.resetCompanyForm();
  }

  ShowCompanyModal(data:any){
    if(data == null){
      this.resetCompanyForm();
      this.CompanyModal = true;
    }else{
      this.companyForm.patchValue({
        CompanyId: data.CompanyID,
        CompanyCode: data.CompanyCode,
        CompanyName: data.CompanyName
      });
      this.CompanyModal = true;
    }
  }

  resetCompanyForm(){
    this.companyForm.patchValue({
      CompanyId: null,
      CompanyCode: null,
      CompanyName: null
    });

    this.companyForm.reset();
  }
}
