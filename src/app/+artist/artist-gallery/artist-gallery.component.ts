import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistImageModel } from '../../../common/models/artist-image.model';

@Component({
  selector: 'artist-gallery',
  templateUrl: './artist-gallery.component.html',
  styleUrls: [ './artist-gallery.component.css' ]
})

export class ArtistGalleryComponent implements OnInit {
  public selectedImageID: number;
  public isPopupOpen: boolean = false;
  public artistID: string;
  public images: ArtistImageModel[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {};

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.artistID = params['id'];
      } else {
        this.router.navigate(['/404']);
      }
    });
  };

  public onArtistImagesReady(images: ArtistImageModel[]) {
    this.images = images;
  };

  public openPopup(id: number) {
    this.selectedImageID = id;
    this.isPopupOpen = true;
  };

  public closePopup() {
    this.selectedImageID = null;
    this.isPopupOpen = false;
  };
}
