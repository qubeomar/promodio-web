import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'artist-registration-photo',
  templateUrl: './artist-registration-photo.component.html',
  styleUrls: [ './artist-registration-photo.component.css' ]
})

export class ArtistRegistrationPhotoComponent {
  @Input() public artistID: string;
  @Output() public onready: EventEmitter<void> = new EventEmitter<void>();

  public stateID: number = 0;
  public dragActive: boolean = false;
  public maxFileSize: number = 5;
  public error: string = '';

  constructor(private elementRef: ElementRef) {};

  public submitStage(): void {
    this.onready.emit();
  };

  public drop(dragEvent: DragEvent): void {
    console.log(dragEvent.dataTransfer.files);

    this.dragActive = false;

    if (dragEvent.dataTransfer.files[0].size > this.maxFileSize * 1000000) {
      this.error = 'File is too big';
    } else if (!dragEvent.dataTransfer.files[0].type.match(/^image\/(jpeg|jpg|png|gif|tiff|bmp)/)) {
      this.error = 'It\'s not the image file';
    } else if (dragEvent.dataTransfer.files.length !== 1) {
      this.error = 'You need to load one file per time.';
    }

    if (!this.error) {
      this.stateID = 1;

      let fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(dragEvent.dataTransfer.files[0]);
      fileReader.onload = (fileReaderEvent: any) => {
        let wrapper: HTMLDivElement = this.findCroppingContainer();
        if (wrapper) {
          let image: any = new Image();
          image.src = fileReaderEvent.target.result;
          wrapper.appendChild(image);
        }
      };
    }

    dragEvent.stopPropagation();
    dragEvent.preventDefault();
  };

  public dragOver(event: DragEvent): boolean {
    this.dragActive = true;
    event.dataTransfer.dropEffect = 'copy';
    return false;
  };

  public dragEnd(event: DragEvent): boolean {
    this.error = '';
    return false;
  };

  public dragLeave(): void { this.dragActive = false; };

  public crop(): void {
    // Crop the image
    this.stateID = 2;
  };

  public changeStateID(index: number): void {
    this.stateID = index;
  };

  private findCroppingContainer(): HTMLDivElement {
    return this.elementRef.nativeElement.querySelector('.imageWrapper') || null;
  }
}
