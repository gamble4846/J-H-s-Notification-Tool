import { Component, OnInit } from '@angular/core';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private SessionManagement:SessionManagementService) { }

  ngOnInit(): void {
    this.SessionManagement.redirectAccLogin('Notifications');
  }

}
