import { Component } from '@angular/core';
import { SessionManagementService } from './Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private SessionManagement:SessionManagementService){}

  logout(){
    this.SessionManagement.deleteCurrentuser();
    this.SessionManagement.redirectAccLogin("");
  }
}
