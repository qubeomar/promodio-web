import { Component, Input } from '@angular/core';

@Component({
  selector: 'artist-previewer',
  templateUrl: './artist-previewer.component.html',
  styleUrls: [ './artist-previewer.component.css' ]
})

export class ArtistPreviewerComponent {
  @Input() public imageID: number;
  @Input() public images: any[];

  public nextImage() { console.log('Next image'); };
  public previousImage() { console.log('Previous image'); };
}
