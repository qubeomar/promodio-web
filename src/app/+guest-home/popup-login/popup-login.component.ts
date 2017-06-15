import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { HttpInterceptorService } from '../../../common/services/http-interceptor.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../common/services/authentication.service';

@Component({
  selector: 'popup-login',
  templateUrl: './popup-login.component.html',
  styleUrls: [ './popup-login.component.css' ]
})

export class PopupLoginComponent {
  /*private static checkEmail(input: FormControl) {
    return (
      /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,10}$/i.test(input.value)
        ? null
        : { incorrectEmail: true }
    );
  };*/
  private static checkName(input: FormControl) {
    return (
      /^[\w\.\d.-_]{3,30}$/i.test(input.value)
        ? null
        : { incorrectText: true }
    );
  };
  private static checkPassword(input: FormControl) {
    return (
      /^[\w\.\d.-_]{4,30}$/i.test(input.value)
        ? null
        : { incorrectPassword: true }
    );
  };

  public username = new FormControl('', [ PopupLoginComponent.checkName ]);
  public password = new FormControl('', [ Validators.required, PopupLoginComponent.checkPassword ]);

  public loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password
  });

  @Output() public onclose = new EventEmitter();

  public success: boolean = false;
  public isLoading: boolean = false;
  private URL: string = 'auth';

  constructor(private builder: FormBuilder,
              private http: HttpInterceptorService,
              private router: Router,
              private authenticationService: AuthenticationService) {};

  public check() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.send();
    }
  };

  public closePopup() {
    this.onclose.emit();
  };

  private send() {
    this.http
      .post(this.URL, this.loginForm.value)
      .subscribe(
        (response: Response) => {
          this.success = true;
          this.isLoading = false;

          if (response['_body']) {
            this.authenticationService.login(response['_body'].substr(1, response['_body'].length - 3));
          }
        },
        (error: Response) => {
          this.isLoading = false;
          console.error(error);
        }
      );
  };
}
