import { Injectable } from '@angular/core';
import { HttpInterceptorService } from './http-interceptor.service';
import { Observable, Observer } from 'rxjs';
import { Response } from '@angular/http';
import { ArtistInfoModel } from '../models/artist-info.model';
import { TypedJSON } from 'typedjson-npm/src/typed-json';
import { MemberModel } from '../models/member.model';
import { AudioModel } from '../models/audio.model';
import { ArtistImageModel } from '../models/artist-image.model';
import { FanModel } from '../models/fan.model';

@Injectable()

export class ArtistService {
  constructor(private http: HttpInterceptorService) {};

  public getArtistInfo(artistID: string): Observable<ArtistInfoModel> {
    return Observable.create((observer: Observer<ArtistInfoModel>) => {
      return this.http.get(`artist/${artistID}`).subscribe(
        (response: Response) => {
          let artistInfo: ArtistInfoModel = TypedJSON.parse(response.json(), ArtistInfoModel);
          observer.next(artistInfo);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  };

  public getArtistMembers(artistID: string): Observable<MemberModel[]> {
    return Observable.create((observer: Observer<MemberModel[]>) => {
      return this.http.get(`artist/${artistID}/members`).subscribe(
        (response: Response) => {
          let json = response.json();
          let data: MemberModel[] = json.map((res) => TypedJSON.parse(res, MemberModel));
          observer.next(data);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  };

  public getArtistAudio(artistID: string): Observable<AudioModel[]> {
    return Observable.create((observer: Observer<AudioModel[]>) => {
      return this.http.get('audio', { artist_id: artistID }).subscribe(
        (response: Response) => {
          let json = response.json();
          let data: AudioModel[] = json.map((res) => TypedJSON.parse(res, AudioModel));
          observer.next(data);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  };

  public getArtistImages(artistID: string): Observable<ArtistImageModel[]> {
    return Observable.create((observer: Observer<ArtistImageModel[]>) => {
      return this.http.get(`artist/${artistID}/images`).subscribe(
        (response: Response) => {
          let json = response.json();
          let data: ArtistImageModel[] = json.map((res) => TypedJSON.parse(res, ArtistImageModel));
          observer.next(data);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  };

  public getArtistFans(artistID: string): Observable<FanModel[]> {
    return Observable.create((observer: Observer<FanModel[]>) => {
      return this.http.get(`artist/${artistID}/fans`).subscribe(
        (response: Response) => {
          let json = response.json();
          let data: FanModel[] = json.map((res) => TypedJSON.parse(res, FanModel));
          observer.next(data);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  };
}
