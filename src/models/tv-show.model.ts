import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TvShowResult {
  constructor(json: any) {
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.overview = json.overview;
      this.poster_path = json.poster_path;
      this.vote_average = json.vote_average;
    }
  }
  /**
   *eg:  71912
   */
  @Field({ nullable: true })
  id?: number;
  /**
   *eg:  "The Witcher"
   */
  @Field({ nullable: true })
  name?: string;
  /**
   *eg:  "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts."
   */
  @Field({ nullable: true })
  overview?: string;
  /**
   *eg:  "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg"
   */
  @Field({ nullable: true })
  poster_path?: string;
  /**
   *eg:  8.2
   */
  @Field({ nullable: true })
  vote_average?: number;
}

@ObjectType()
export class TvShow extends TvShowResult {
  constructor(json: any) {
    super(json);
    if (json) {
      this.number_of_seasons = json.number_of_seasons;
    }
  }
  @Field({ nullable: true })
  number_of_seasons?: number;
}

@ObjectType()
export class TvShowSearchResult {
  constructor(json: any) {
    if (json) {
      this.page = json.page || 1;
      this.results =
        json.results?.map((tvShow) => new TvShowResult(tvShow)) || [];
    }
  }
  @Field()
  page: number;
  @Field((returns) => [TvShowResult])
  results: TvShowResult[];
}