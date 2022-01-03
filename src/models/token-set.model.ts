import { TokenSet as _TokenSet } from "openid-client";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TokenSets extends _TokenSet {
  @Field()
  access_token?: string;
  @Field()
  token_type?: string;
  @Field()
  id_token?: string;
  @Field()
  refresh_token?: string;
  @Field()
  expires_in?: number;
  @Field()
  expires_at?: number;
  @Field()
  session_state?: string;
  @Field()
  scope?: string;
}
