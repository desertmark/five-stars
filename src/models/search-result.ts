import { ClassType, Field, Int, ObjectType } from "type-graphql";

export function SearchResult<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class SearchResultClass {
    constructor(json: any) {
      if (json) {
        this.page = json.page || 1;
        this.results =
          json.results?.map((tvShow) => new TItemClass(tvShow)) || [];
      }
    }
    @Field((type) => [TItemClass])
    results: TItem[];

    @Field((type) => Int)
    page: number;
  }
  return SearchResultClass;
}
