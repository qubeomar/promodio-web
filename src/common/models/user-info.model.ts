import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class UserInfoModel {
  @JsonMember
  public 'id': string;
  @JsonMember
  public 'username': string;
  @JsonMember
  public 'name': string | null;
  @JsonMember
  public 'country': string | number | null;
  @JsonMember
  public 'about': string | null;
  @JsonMember({ name: 'artist_ids', elements: String })
  public 'artistIds': string[];
  @JsonMember({ name: 'enrolled_date' })
  public 'enrolledDate': string;
  @JsonMember({ name: 'followers_count' })
  public 'followersCount': number | null;
}
