import { Component, OnInit } from '@angular/core';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private SessionManagement:SessionManagementService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Users');
  }

}
