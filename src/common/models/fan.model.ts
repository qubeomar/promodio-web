import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class FanModel {
  @JsonMember
  public 'id': string | null;
}
