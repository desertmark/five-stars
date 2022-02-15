import { gql, useQuery } from "@apollo/client";
export interface LoginResponse {
  access_token: string;
}
export const useLogin = () => {
  return useQuery<{login: LoginResponse}>(
    gql`
      query {
        getTrending {
          
        }
      }
    `
  );
};
