import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found';

import { AuthenticationGuard } from '../common/services/authentication-guard.service';
import { AuthenticationResolver } from './authentication.resolver';

export const ROUTES: Routes = [
  { path: '',
    loadChildren: './+guest-home#GuestHomeModule',
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'login',
    loadChildren: './+guest-home#GuestHomeModule',
    data: { action: 'login' }
  },
  {
    path: 'registration',
    loadChildren: './+guest-home#GuestHomeModule',
    data: { action: 'registration' }
  },
  {
    path: 'artist',
    pathMatch: 'prefix',
    loadChildren: './+artist#ArtistModule',
    resolve: { artist: AuthenticationResolver }
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
