import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

export interface Notification {
  title: string;
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class SignalrService implements OnDestroy {
  private hubConnection: signalR.HubConnection | null = null;
  private notificationSubject = new Subject<Notification>();

  notification$ = this.notificationSubject.asObservable();

  startConnection(): void {
    if (this.hubConnection) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiBaseUrl}/notificationHub`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on(
      'ReceiveNotification',
      (title: string, message: string) => {
        this.notificationSubject.next({
          title,
          message,
          timestamp: new Date(),
        });
      }
    );

    this.hubConnection
      .start()
      .catch((err) => console.error('SignalR connection error:', err));
  }

  stopConnection(): void {
    this.hubConnection?.stop();
    this.hubConnection = null;
  }

  async sendNotification(title: string, message: string): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.invoke('SendNotification', title, message);
    }
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }
}
