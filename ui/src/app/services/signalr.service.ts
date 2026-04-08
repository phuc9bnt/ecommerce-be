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
  private connectionErrorSubject = new Subject<string>();

  notification$ = this.notificationSubject.asObservable();
  connectionError$ = this.connectionErrorSubject.asObservable();

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
      .catch((err) => {
        const errorMsg = err instanceof Error ? err.message : 'Unknown connection error';
        this.connectionErrorSubject.next(errorMsg);
      });
  }

  stopConnection(): void {
    this.hubConnection?.stop();
    this.hubConnection = null;
  }

  async sendNotification(title: string, message: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('SignalR connection is not established.');
    }
    await this.hubConnection.invoke('SendNotification', title, message);
  }

  ngOnDestroy(): void {
    this.notificationSubject.complete();
    this.connectionErrorSubject.complete();
    this.stopConnection();
  }
}
