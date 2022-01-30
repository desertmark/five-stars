import { Field, ObjectType } from "type-graphql";
import { Season } from "./season.model";
import { TvShow } from "./tv-show.model";
import { Watcher } from "./watcher.model";

@ObjectType()
export class WatchListItem {
  constructor(json: any) {
    if (json) {
      this.id = json.id;
      this.watchers = json?.watchers?.map(w => new Watcher(w));
      this.tvShow = new TvShow(json.tvShow);
      this.seasons = json?.seasons?.map(s => new Season(s));
    }
  }
  id?: string;
  /**
   * Represents the list of users who has added this show to their watch list
   */
  watchers: Watcher[];
  @Field()
  tvShow: TvShow;
  @Field(type => [Season])
  seasons: Season[];
}
