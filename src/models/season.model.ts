import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Season {
  constructor(json: any) {
    if (json) {
      this.id = json.id;
      this.air_date = json.air_date;
      this.name = json.name;
      this.overview = json.overview;
      this.poster_path = json.poster_path;
      this.season_number = json.season_number;
      this.episodes = json.episodes?.map((e) => new Episode(e)) || [];
    }
  }
  @Field()
  id: number;
  @Field()
  air_date: string;
  @Field((returns) => [Episode])
  episodes: Array<Episode>;
  @Field()
  name: string;
  @Field()
  overview: string;
  @Field()
  poster_path: string;
  @Field()
  season_number: number;
}

@ObjectType()
export class Episode {
  constructor(json: any) {
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.air_date = json.air_date;
      this.episode_number = json.episode_number;
      this.overview = json.overview;
      this.season_number = json.season_number;
      this.vote_average = json.vote_average;
    }
  }
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  air_date: string;
  @Field()
  episode_number: number;
  @Field()
  overview: string;
  @Field()
  season_number: number;
  @Field()
  vote_average: number;
}
