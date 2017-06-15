import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { LocalstorageService } from '../../../common/services/localstorage.service';
import { UserInfoModel } from '../../../common/models/user-info.model';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: [ './user-bar.component.css' ]
})

export class UserBarComponent {
  @Input() public style: string;

  public artistID: number;
  public userInfo: UserInfoModel | null;
  public currentURL: string = this.router.url;

  public isNotificationsDropdownActive: boolean = false;
  public isUserDropdownActive: boolean = false;

  public notifications: any[] = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.userInfo = this.authenticationService.userInfo;
    this.authenticationService.onuserinfochange.subscribe((userInfo: UserInfoModel) => {
      this.userInfo = userInfo;
    });
  };

  public notificationsDropdownToggle(event: Event) {
    this.isUserDropdownActive = false;
    this.isNotificationsDropdownActive = !this.isNotificationsDropdownActive;
    event.stopPropagation();
  };

  public userDropdownToggle(event: Event) {
    this.isNotificationsDropdownActive = false;
    this.isUserDropdownActive = !this.isUserDropdownActive;
    event.stopPropagation();
  };

  public logout() {
    this.authenticationService.logout();
  };
}
