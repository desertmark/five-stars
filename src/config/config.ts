import path from "path";
import { config as dotenv } from "dotenv";
const rootPath = path.resolve(__dirname, "../", "../");
const envPath = path.resolve(rootPath, ".env");
dotenv({ path: envPath });

const { COSMOS_CONNECTION_STRING, TMDB_KEY } = process.env;

export abstract class IConfig {
  connectionString: string;
  dbName: string;
  tmdbKey: string;
  tmbdbUrl: string;
  auth: {
    client_id: string;
    client_secret: string;
    base_url: string;
    realm_name: string;
    token_expiration: number;
    issuer_uri: string;
  };
}

export const config: IConfig = {
  connectionString: COSMOS_CONNECTION_STRING,
  dbName: "fiveStars",
  tmdbKey: TMDB_KEY,
  tmbdbUrl: "https://api.themoviedb.org/3",
  auth: {
    client_id: "five-stars",
    client_secret: "five-stars-secret",
    base_url: "http://localhost:8080/auth",
    realm_name: "master",
    token_expiration: 60 * 60,
    issuer_uri: `${"http://localhost:8080/auth"}/realms/${"master"}`,
  },
};
