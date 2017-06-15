import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ArtistService } from '../../../../common/services/artist.service';
import { MemberModel } from '../../../../common/models/member.model';

@Component({
  selector: 'artist-registration-members',
  templateUrl: './artist-registration-members.component.html',
  styleUrls: [ './artist-registration-members.component.css' ]
})

export class ArtistRegistrationMembersComponent implements OnInit {
  @Input() public artistID: string;
  @Output() public onready = new EventEmitter();

  public members: MemberModel[];

  private membersURL: string = 'artist/{{artist_id}}/members';

  constructor(private artistService: ArtistService) {};

  public ngOnInit(): void {
    this.getMembers();
  };

  public getMembers(): void {
    this.artistService.getArtistMembers(this.artistID).subscribe(
      (members: MemberModel[]) => {
        this.members = members;
      },
      (error: any) => {
        console.error(error);
        throw new Error('Can\'t get artist members');
      }
    );
  };

  public submitStage(): void {
    this.onready.emit();
  };
}
