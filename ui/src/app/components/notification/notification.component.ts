import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Notification, SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  newTitle = '';
  newMessage = '';
  private subscription: Subscription | null = null;

  constructor(private readonly signalrService: SignalrService) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.subscription = this.signalrService.notification$.subscribe(
      (notification) => {
        this.notifications.unshift(notification);
      }
    );
  }

  async sendNotification(): Promise<void> {
    if (this.newTitle.trim() && this.newMessage.trim()) {
      await this.signalrService.sendNotification(this.newTitle, this.newMessage);
      this.newTitle = '';
      this.newMessage = '';
    }
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.signalrService.stopConnection();
  }
}
