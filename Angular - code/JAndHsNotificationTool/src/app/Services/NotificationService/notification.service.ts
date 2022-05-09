import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  public HandleServerError(error:any){
    this.notification.create(
      'error',
      'Error From Server!',
      error
    );
  }
}
