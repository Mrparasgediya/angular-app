import { Injectable } from '@angular/core';
import { Notification } from 'src/app/model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private isNotificationOn: boolean;
  private notification: Notification | null;

  constructor() {
    this.isNotificationOn = false;
    this.notification = null;
  }

  showNotification(notificationType: Notification['type'], notificationMessage: Notification['message']) {
    this.notification = new Notification(notificationType, notificationMessage);
    this.isNotificationOn = true;
    console.log('show notification is called')
    setTimeout(() => {
      this.hideNotification()
    }, 3000);
  }

  hideNotification() {
    console.log('hide notification is called')
    this.isNotificationOn = false;
    this.notification = null;
  }

  public getIsNotificationOn(): boolean {
    return this.isNotificationOn;
  }

  public getNotification(): Notification | null {
    return this.notification;
  }
}
