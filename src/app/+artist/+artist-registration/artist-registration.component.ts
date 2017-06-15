import { Component, Input } from '@angular/core';
import { LocalstorageService } from '../../../common/services/localstorage.service';

@Component({
  selector: 'artist-registration',
  templateUrl: './artist-registration.component.html',
  styleUrls: [ './artist-registration.component.css' ]
})

export class ArtistRegistrationComponent {
  @Input() public artistID: string;
  public stageID: number;
  private keyNameForStageID: string = 'artistRegistrationStageID';

  constructor(private localStorageService: LocalstorageService) {
    this.stageID = parseInt(this.localStorageService.getValue(this.keyNameForStageID), 10) || 0;
    this.artistID = this.localStorageService.getValue('artistID');
  };

  public nextStage(artistID?: string) {
    if (artistID) {
      this.artistID = artistID;
      this.localStorageService.setValue('artistID', artistID.replace(/[↵"]/ig, ''));
    }

    this.stageID ++;

    if (this.stageID < 3) {
      this.localStorageService.setValue(this.keyNameForStageID, this.stageID.toString());
    } else {
      this.localStorageService.deleteValue(this.keyNameForStageID);
    }
  };
}
