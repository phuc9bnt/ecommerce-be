import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./components/notification/notification.component').then(
        (m) => m.NotificationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];
