import { Routes } from '@angular/router';
import { ArtistPageComponent }
  from './artist-page/artist-page.component';
import { ArtistGalleryComponent }
  from './artist-gallery/artist-gallery.component';
// import { DataResolver } from '../app.resolver';

export const ROUTES: Routes = [
  { path: 'registration', loadChildren: './+artist-registration#ArtistRegistrationModule' },
  { path: 'dashboard', loadChildren: './+dashboard#DashboardModule', pathMatch: 'prefix' },
  { path: ':id/gallery', component: ArtistGalleryComponent },
  { path: ':id', component: ArtistPageComponent },
  { path: '**', redirectTo: '/404' }
];
