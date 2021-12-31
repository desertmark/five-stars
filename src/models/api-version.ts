import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class ApiVersion {
  @Field()
  version: string;

  @Field()
  status: string;

  @Field()
  date: string;
}
