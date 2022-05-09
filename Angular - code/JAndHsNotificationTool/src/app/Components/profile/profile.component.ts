import { Component, OnInit } from '@angular/core';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private SessionManagement:SessionManagementService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Profile');
  }

}
