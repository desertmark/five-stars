import path from "path";
import { config as dotenv } from "dotenv";
const rootPath = path.resolve(__dirname, "../", "../");
const envPath = path.resolve(rootPath, ".env");
dotenv({ path: envPath });

const { COSMOS_CONNECTION_STRING, TMDB_KEY } = process.env;

export interface IConfig {
  connectionString: string;
  dbName: string;
  tmdbKey: string;
  tmbdbUrl: string;
}

export const config: IConfig = {
  connectionString: COSMOS_CONNECTION_STRING,
  dbName: "fiveStars",
  tmdbKey: TMDB_KEY,
  tmbdbUrl: "https://api.themoviedb.org/3",
};
