import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistInfoModel } from '../../../common/models/artist-info.model';
import { GENRES } from '../../../common/data/genres.data';
import { COUNTRIES } from '../../../common/data/countries.data';
import { ArtistImageModel } from '../../../common/models/artist-image.model';
import { ArtistService } from '../../../common/services/artist.service';
import { MemberModel } from '../../../common/models/member.model';

@Component({
  selector: 'artist-header',
  templateUrl: './artist-header.component.html',
  styleUrls: [ './artist-header.component.css' ]
})

export class ArtistHeaderComponent implements OnInit {
  @Output() public onShowPreview = new EventEmitter();
  @Output() public onArtistInfoReady: EventEmitter<ArtistInfoModel> = new EventEmitter<ArtistInfoModel>();
  @Output() public onArtistImagesReady: EventEmitter<ArtistImageModel[]> = new EventEmitter<ArtistImageModel[]>();

  public artistID: string;

  public artistInfo: ArtistInfoModel;
  public members: MemberModel[];
  public images: ArtistImageModel[];
  public preparedImages: ArtistImageModel[] = [];

  public genres: { [ key: string ]: string } = GENRES;
  public countries: { [ key: string ]: string } = COUNTRIES;

  constructor(private artistService: ArtistService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {};

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id && params.id !== this.artistID) {
        this.artistID = params[ 'id' ];
        this.getArtistInfo();
        this.getArtistMembers();
        this.getArtistImages();
      } else if (!params.id) {
        this.router.navigate(['/404']);
      }
    });
  };

  public showPreviewer(id: number): void {
    this.onShowPreview.emit(id);
  };

  private getArtistInfo(): void {
    this.artistService.getArtistInfo(this.artistID).subscribe(
      (artistInfo: ArtistInfoModel) => {
        this.artistInfo = artistInfo;
        this.onArtistInfoReady.emit(this.artistInfo);
      },
      () => {
        this.router.navigate(['/404']);
      }
    );
  };

  private getArtistMembers(): void {
    this.artistService.getArtistMembers(this.artistID).subscribe(
      (members: MemberModel[]) => {
        this.members = members;
      },
      () => {
        this.router.navigate(['/404']);
      }
    );
  };

  private getArtistImages(): void {
    this.artistService.getArtistImages(this.artistID).subscribe(
      (images: ArtistImageModel[]) => {
        this.images = images;
        this.preparedImages = [];

        this.onArtistImagesReady.emit(this.images);

        for (let i = 0; i < 3 && i < this.images.length; i ++) {
          this.preparedImages.push(this.images[i]);
        }
      },
      () => {
        this.router.navigate(['/404']);
      }
    );
  };
}
