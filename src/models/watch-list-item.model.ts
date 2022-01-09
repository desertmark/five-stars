import { Field, ObjectType } from "type-graphql";
import { TvShow } from "./tv-show.model";

@ObjectType()
export class WatchListItem {
  constructor(json: any) {
    if (json) {
      this.id = json.id;
      this.userIds = json.userIds;
      this.tvShow = new TvShow(json.tvShow);
    }
  }
  @Field()
  id?: string;
  @Field((type) => [String])
  userIds: string[];
  @Field()
  tvShow: TvShow;
}
