import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistInfoModel } from '../../../common/models/artist-info.model';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { ArtistService } from '../../../common/services/artist.service';
import { AudioModel } from '../../../common/models/audio.model';
import { FanModel } from '../../../common/models/fan.model';

@Component({
  selector: 'artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: [ './artist-page.component.css' ]
})

export class ArtistPageComponent implements OnInit {
  public artistID: string;
  public artistInfo: ArtistInfoModel;
  public songs: AudioModel[];
  public fans: FanModel[];

  public isRequestToBeAMemberLoading: boolean = false;
  public isRequestToBeAMemberSent: boolean = false;
  public isNotOwnPage: boolean;
  public isUserLogged: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private artistService: ArtistService,
              private authenticationService: AuthenticationService) {};

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.artistID = params['id'];
        this.getArtistAudio();
        this.getArtistFans();
      } else {
        this.router.navigate(['/404']);
      }
    });

    this.isNotOwnPage = (
      this.authenticationService.userInfo
      &&
      this.authenticationService.userInfo.artistIds.indexOf(this.artistID) < 0
    );

    this.isUserLogged = !!this.authenticationService.userInfo;
  };

  public onArtistInfoReady(info: ArtistInfoModel): void {
    this.artistInfo = info;
  };

  public changeSortingCondition(value: number): void { console.log(value); };

  private getArtistAudio(): void {
    this.artistService.getArtistAudio(this.artistID).subscribe(
      (songs: AudioModel[]) => {
        this.songs = songs;
      },
      () => {
        this.router.navigate(['/404']);
      }
    );
  };

  private getArtistFans(): void {
    this.artistService.getArtistFans(this.artistID).subscribe(
      (fans: FanModel[]) => {
        this.fans = fans;
      },
      () => {
        this.router.navigate(['/404']);
      }
    );
  };
}
