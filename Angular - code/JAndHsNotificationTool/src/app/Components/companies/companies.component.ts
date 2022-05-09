import { Component, OnInit } from '@angular/core';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private SessionManagement:SessionManagementService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Companies');
  }

}
