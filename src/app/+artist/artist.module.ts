import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './artist.routes';
import { ArtistHeaderComponent } from './artist-header/artist-header.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { ArtistGalleryComponent } from './artist-gallery/artist-gallery.component';
import { ArtistPreviewerComponent } from './artist-previewer/artist-previewer.component';
import { ArtistService } from '../../common/services/artist.service';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ArtistHeaderComponent,
    ArtistPageComponent,
    ArtistGalleryComponent,
    ArtistPreviewerComponent
  ],
  providers: [ ArtistService ]
})

export class ArtistModule {}
