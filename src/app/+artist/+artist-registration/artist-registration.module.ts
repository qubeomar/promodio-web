import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ArtistRegistrationComponent } from './artist-registration.component';
import { ArtistRegistrationProfileComponent }
  from './artist-registration-profile/artist-registration-profile.component';
import { ArtistRegistrationPhotoComponent }
  from './artist-registration-photo/artist-registration-photo.component';
import { ArtistRegistrationSongComponent }
  from './artist-registration-song/artist-registration-song.component';
import { ArtistRegistrationMembersComponent }
  from './artist-registration-members/artist-registration-members.component';
import { RlTagInputModule } from 'angular2-tag-input';

const ROUTES: Routes = [
  { path: '', component: ArtistRegistrationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RlTagInputModule
  ],
  declarations: [
    ArtistRegistrationComponent,
    ArtistRegistrationProfileComponent,
    ArtistRegistrationPhotoComponent,
    ArtistRegistrationSongComponent,
    ArtistRegistrationMembersComponent
  ]
})

export class ArtistRegistrationModule {}
