import { gql, useMutation, useQuery } from "@apollo/client";

export const useLogin = () => {
  return useMutation(
    gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          access_token
        }
      }
    `
  );
};
