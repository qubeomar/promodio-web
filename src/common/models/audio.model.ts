import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class AudioModel {
  @JsonMember
  public 'title': string;
  @JsonMember
  public 'length': string;
  @JsonMember({ name: 'last_audio_update' })
  public 'lastAudioUpdate': string;
  @JsonMember
  public 'state': string;
  @JsonMember({ name: 'date_created' })
  public 'dateCreated': string;
  @JsonMember
  public 'id': string;
  @JsonMember({ name: 'artist_id' })
  public 'artistId': string;
}
