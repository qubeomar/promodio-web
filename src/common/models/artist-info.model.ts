import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class ArtistInfoModel {
  @JsonMember
  public 'name': string | null;
  @JsonMember
  public 'country': string | null;
  @JsonMember
  public 'description': string;
  @JsonMember({ elements: String })
  public 'genres': string[];
  @JsonMember({ elements: String })
  public 'members': string[];
  @JsonMember({ name: 'promoter_count' })
  public 'promoterCount': number | null;
  @JsonMember
  public 'songCount': number | null;
  @JsonMember
  public 'state': string;
}
