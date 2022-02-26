import { gql, useQuery, QueryResult } from "@apollo/client";
export interface LoginResponse {
  access_token: string;
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
    `,
  );
};
