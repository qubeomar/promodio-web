import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpInterceptorService } from '../../../../common/services/http-interceptor.service';
import { GENRES } from '../../../../common/data/genres.data';
import { COUNTRIES } from '../../../../common/data/countries.data';

@Component({
  selector: 'artist-registration-profile',
  templateUrl: './artist-registration-profile.component.html',
  styleUrls: [ './artist-registration-profile.component.css' ]
})

export class ArtistRegistrationProfileComponent implements OnInit {
  private static checkText(input: FormControl): any {
    return (
      /^[\w\d.-_]{3,30}$/i.test(input.value)
        ? null
        : { incorrect: true }
    );
  };

  private static checkDescription(input: FormControl): any {
    return (
      (input.value.length > 20 && input.value.length < 500)
        ? null
        : { incorrect: true }
    );
  };

  @Output() public onready: EventEmitter<string> = new EventEmitter<string>();

  public nameField = new FormControl('', [ ArtistRegistrationProfileComponent.checkText ]);
  public descriptionField = new FormControl('', [ ArtistRegistrationProfileComponent.checkDescription ]);

  public artistProfileForm: FormGroup = this.builder.group({
    name: this.nameField,
    description: this.descriptionField
  });

  public genresList: string[] = [];
  public allowedGenres: string[] = [];

  public allowedCountries: string[] = [];
  public selectedCountry: string[] = [];

  public selectedGenres: string[] = [];
  private genres: { [ key: number ]: string } = GENRES;
  private genresIDs: { [ key: string ]: number } = {};
  private genresMaxCount: number = 3;

  private countries: { [ key: number ]: string } = COUNTRIES;
  private countriesIDs: { [ key: string ]: number } = {};

  private submitURL: string = 'artist';

  constructor(private builder: FormBuilder,
              private http: HttpInterceptorService) {};

  public ngOnInit(): void {
    for (let key in this.genres) {
      if (this.genres.hasOwnProperty(key)) {
        this.genresIDs[this.genres[key]] = parseInt(key, 10);
        this.allowedGenres.push(this.genres[key]);
      }
    }

    for (let key in this.countries) {
      if (this.countries.hasOwnProperty(key)) {
        this.countriesIDs[this.countries[key]] = parseInt(key, 10);
        this.allowedCountries.push(this.countries[key]);
      }
    }
  };

  public addGenre(tag: string): void {
    if (this.allowedGenres.indexOf(tag) > -1 && this.selectedGenres.length < this.genresMaxCount) {
      this.selectedGenres.push(tag);
    } else {
      this.genresList.splice(this.genresList.indexOf(tag), 1);
    }
  };

  public removeGenre(tag: string): void {
    this.selectedGenres.splice(this.selectedGenres.indexOf(tag), 1);
  };

  public rewriteCountry(tag: string): void {
    if (this.allowedCountries.indexOf(tag) > -1) {
      this.selectedCountry = [tag];
    } else {
      this.removeCountry();
    }
  };

  public removeCountry(): void {
    this.selectedCountry = [];
  };

  public submitStage(): void {
    if (!this.artistProfileForm.valid || !this.selectedGenres.length || !this.selectedCountry.length) {
      return;
    }

    let form: { [ key: string ]: any } = this.artistProfileForm.value;

    form.genres = [];
    this.selectedGenres.forEach((genre) => {
      form.genres.push(this.genresIDs[genre].toString());
    });

    this.http.post(this.submitURL, form).subscribe(
      (response: Response) => {
        this.onready.emit(response.text().substring(1, response.text().length - 3));
      },
      (error: Response) => {
        console.error(error);
        throw new Error('Can\'t submit artist form (profile section)');
      }
    );

    form.country = this.countriesIDs[this.selectedCountry[0]].toString();
  };

  /*private getGenres(): void {
    this.http.get(this.genresURL).subscribe(
      () => {
        this.genres = [];
      },
      () => {
        setTimeout(this.getGenres.bind(this), 60000);
      }
    );
  };*/
}
