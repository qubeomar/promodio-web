import { Component, Output, EventEmitter } from '@angular/core';
import { HttpInterceptorService } from '../../../common/services/http-interceptor.service';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'popup-registration',
  templateUrl: './popup-registration.component.html',
  styleUrls: [ './popup-registration.component.css' ]
})

export class PopupRegistrationComponent {
  private static checkName(input: FormControl) {
    return (
      /^[\w\d.-_]{3,30}$/i.test(input.value)
        ? null
        : { incorrect: true }
    );
  };
  private static checkEmail(input: FormControl) {
    return (
      /^[\w0-9.-_]+@[\w0-9-]+\.\w{2,10}$/i.test(input.value)
        ? null
        : { incorrect: true }
    );
  };
  private static checkPassword(input: FormControl) {
    return (
      /^[\w\d.-_]{8,30}$/i.test(input.value)
        ? null
        : { incorrect: true }
    );
  };

  public name = new FormControl('', [ PopupRegistrationComponent.checkName ]);
  public username = new FormControl('', [ PopupRegistrationComponent.checkEmail ]);
  public password = new FormControl('', [ Validators.required, PopupRegistrationComponent.checkPassword ]);

  public registrationForm: FormGroup = this.builder.group({
    name: this.name,
    username: this.username,
    password: this.password
  });

  @Output() public onclose = new EventEmitter();

  public success: boolean = false;
  public isLoading: boolean = false;
  private URL: string = 'user';

  constructor(private builder: FormBuilder, private http: HttpInterceptorService) {};

  public check() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.send();
    }
  };

  public closePopup() {
    this.onclose.emit();
  };

  private send() {
    this.http
      .post(this.URL, this.registrationForm.value)
      .subscribe(
        (response: Response) => {
          this.success = true;
          this.isLoading = false;
        },
        (error: Response) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  };
}
