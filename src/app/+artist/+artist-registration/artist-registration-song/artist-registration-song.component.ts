import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpInterceptorService } from '../../../../common/services/http-interceptor.service';
import { Response } from '@angular/http';

@Component({
  selector: 'artist-registration-song',
  templateUrl: './artist-registration-song.component.html',
  styleUrls: [ './artist-registration-song.component.css' ]
})

export class ArtistRegistrationSongComponent implements OnInit {
  @Input() public artistID: string;
  @Output() public onready = new EventEmitter();

  public stateID: number;
  public loadingState: number;
  public preparedData: { [ key: string ]: any };
  public agreement: boolean;
  public title: string;
  public dragAudioActive: boolean;
  public dragImageActive: boolean;
  public audioError: string;
  public imageError: string;
  public imageSRC: string;
  public maxAudioFileSize: number = 10;
  public maxImageFileSize: number = 1;

  public isLoading: boolean = false;

  private URLs: { [ key: string ]: string } = {
    title: 'artist/{{artist_id}}/audio',
    audio: 'audio/{{audio_id}}',
    cover: 'audio/{{audio_id}}/image'
  };
  private audioID: string;
  private imageID: string;

  constructor(private http: HttpInterceptorService) {};

  public ngOnInit() {
    this.stateID = 0;
    this.loadingState = 1;
    this.preparedData = {};
    this.agreement = false;
    this.title = '';
    this.dragAudioActive = false;
    this.dragImageActive = false;
    this.audioError = '';
    this.imageError = '';
    this.imageSRC = '';
    this.isLoading = false;
    this.audioID = '';
    this.imageID = '';
  };

  public agreementOnChange(value: boolean): void { this.agreement = value; };
  public changeTitle(value: string): void { this.title = value; };

  public skip(): void {
    this.onready.emit();
  };

  public submitStage(form: NgForm): void {
    if (form.value.title && this.preparedData.audio && this.agreement) {
      this.isLoading = true;
      this.preparedData.title = form.value.title;

      switch (this.loadingState) {
        case 1: this.stage1(); break;
        case 2: this.stage2(); break;
        case 3: this.stage3(); break;
        default: throw new Error(`Unexpected stage ID: ${this.loadingState}`);
      }
    }
  };

  public drop(dragEvent: DragEvent, fileType: string): void {
    this.dragAudioActive = false;
    this.dragImageActive = false;

    if (fileType === 'image') {
      this.imageDropHandler(dragEvent);
    } else if (fileType === 'audio') {
      this.audioDropHandler(dragEvent);
    }

    dragEvent.stopPropagation();
    dragEvent.preventDefault();
  };

  public dragOver(event: DragEvent, targetName: string): boolean {
    this[`drag${targetName}Active`] = true;
    event.dataTransfer.dropEffect = 'copy';
    return false;
  };

  public dragLeave(): void {
    this.dragImageActive = false;
    this.dragAudioActive = false;
  };

  private imageDropHandler(dragEvent: DragEvent): void {
    this.imageSRC = null;
    this.imageError = null;

    if (dragEvent.dataTransfer.files[0].size > this.maxImageFileSize * 1000000) {
      this.imageError = 'File is too big';
    } else if (!dragEvent.dataTransfer.files[0].type.match(/^image\/(jpeg|jpg|png)/)) {
      this.imageError = 'Invalid file type';
    } else if (dragEvent.dataTransfer.files.length !== 1) {
      this.imageError = 'You can load only one file';
    }

    if (!this.imageError) {
      this.preparedData.artwork = dragEvent.dataTransfer.files[0];
      let fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(this.preparedData.artwork);
      fileReader.onload = (fileReaderEvent: any) => {
        this.imageSRC = fileReaderEvent.target.result;
      };
    }
  };

  private audioDropHandler(dragEvent: DragEvent): void {
    this.audioError = null;

    if (dragEvent.dataTransfer.files[0].size > this.maxAudioFileSize * 1000000) {
      this.audioError = 'File is too big';
    } else if (!dragEvent.dataTransfer.files[0].type.match(/^audio\/(mp3|aac)/)) {
      this.audioError = 'Invalid file type';
    } else if (dragEvent.dataTransfer.files.length !== 1) {
      this.audioError = 'You can load only one file';
    }

    if (!this.audioError) {
      this.preparedData.audio = dragEvent.dataTransfer.files[0];
      this.stateID = 1;
    }
  };

  private stage1(): void {
    this.isLoading = true;
    this.loadingState = 1;

    this.http
        .post(this.URLs.title.replace('{{artist_id}}', this.artistID), { title: this.preparedData.title })
        .subscribe(
          (response: Response) => {
            if (response.text()) {
              console.error(response.text(), response.text().replace(/[↵"]/ig, ''));
              this.audioID = response.text().replace(/[↵"]/ig, '');
              this.stage2();
            } else {
              this.isLoading = false;
              console.error(response);
              throw new Error('No audio ID in the server response');
            }
          },
          (error: Response) => {
            this.isLoading = false;
            console.error(error);
            throw new Error('Can not create new audio by artist ID');
          }
        );
  };

  private stage2(): void {
    this.isLoading = true;
    this.loadingState = 2;

    let formData: FormData = new FormData();
    formData.append('audio_file', this.preparedData.audio, this.preparedData.title);

    this.http
        .patch(
          this.URLs.audio.replace('{{audio_id}}', this.audioID),
          formData,
          { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' })
        .subscribe(
          (response: Response) => {
            if (response.status === 202) {
              this.stage3();
            } else {
              this.isLoading = false;
              console.error(response);
              throw new Error(`Can not upload audio file to the server, status is ${response.status}`);
            }
          },
          (error: Response) => {
            this.isLoading = false;
            console.error(error);
            throw new Error('Error during the file uploading');
          }
        );
  };

  private stage3(): void {
    this.isLoading = true;
    this.loadingState = 3;

    this.http
        .post(
          this.URLs.cover.replace('{{audio_id}}', this.audioID),
          {
            title: this.preparedData.title,
            group: 'covers',
            name: `${this.preparedData.title}-cover`
          },
          { 'Content-Type': 'multipart/form-data' }
        )
        .subscribe(
          (response: Response) => {
            if (response.status === 201 && response['_body']) {
              this.imageID = response['_body'];
              this.onready.emit();
            } else {
              this.isLoading = false;
              console.error(response);
              throw new Error('Invalid response from the server');
            }
          },
          (error: Response) => {
            this.isLoading = false;
            console.error(error);
            throw new Error(`Can not create new image by audio ID ${this.audioID}`);
          }
        );
  };
}
