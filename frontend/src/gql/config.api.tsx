export interface ConfigResponse {
  imageBaseUrl: string;
}
export const useConfig = () => {
  return {
    data: {
      getConfig: {
        imageBaseUrl: "http://image.tmdb.org/t/p/w1280/",
      },
    },
  };
};
