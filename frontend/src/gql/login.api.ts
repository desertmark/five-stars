import { gql, useMutation } from "@apollo/client";
export interface LoginResponse {
  access_token: string;
}
export const useLogin = () => {
  return useMutation<{login: LoginResponse}>(
    gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          access_token
        }
      }
    `
  );
};
