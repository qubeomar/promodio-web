import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ArtistService } from '../../../common/services/artist.service';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardGalleryComponent } from './dashboard-gallery/dashboard-gallery.component';
import { DashboardSongsComponent } from './dashboard-songs/dashboard-songs.component';
import { DashboardMembersComponent } from './dashboard-members/dashboard-members.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

const ROUTES: Routes = [
  {
    path: ':id', component: DashboardSongsComponent
  },
  {
    path: ':id/gallery', component: DashboardGalleryComponent
  },
  {
    path: ':id/profile', component: DashboardProfileComponent
  },
  {
    path: ':id/members', component: DashboardMembersComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardProfileComponent,
    DashboardGalleryComponent,
    DashboardSongsComponent,
    DashboardMembersComponent,
    DashboardHeaderComponent
  ],
  providers: [ ArtistService ]
})

export class DashboardModule {}
