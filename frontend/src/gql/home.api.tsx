import { gql, useQuery, QueryResult, QueryHookOptions } from "@apollo/client";
export interface ITvShow {
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}
export interface TvShowResult {
  results: ITvShow[];
}
export const useGetTrending = (): QueryResult => {
  return useQuery(
    gql`
      query getTrending {
        getTrending {
          page
          results {
            id
            name
            overview
            poster_path
            vote_average
            backdrop_path
          }
        }
      }
    `
  );
};

export const useSearch = (
  options: QueryHookOptions<any, TvShowResult>
): QueryResult => {
  return useQuery(
    gql`
      query searchTvShow($query: String!, $page: Int!) {
        searchTvShow(query: $query, page: $page) {
          page
          results {
            id
            name
            overview
            poster_path
            vote_average
            backdrop_path
          }
        }
      }
    `,
    options
  );
};
