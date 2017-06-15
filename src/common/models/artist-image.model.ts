import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class ArtistImageModel {
  @JsonMember
  public 'name': string | null;
  @JsonMember
  public 'group': string | null;
  @JsonMember
  public 'id': string | null;
  @JsonMember({ name: 'location'})
  public 'url': string | null;
  @JsonMember
  public 'text': string | null;
}
