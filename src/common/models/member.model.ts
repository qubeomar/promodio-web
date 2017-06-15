import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class MemberModel {
  @JsonMember
  public 'role': string | null;
  @JsonMember
  public 'position': string | null;
  @JsonMember
  public 'status': string | null;
  @JsonMember({ name: 'user_id' })
  public 'user_id': string | null;
  @JsonMember({ name: 'artist_id' })
  public 'artist_id': string | null;
  @JsonMember({ name: 'invite_id' })
  public 'invite_id': string | null;
}
