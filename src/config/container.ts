import { Container, injectable } from "inversify";
import { Headers } from "apollo-server-env";
import { ApiVersionResolver } from "@api/api-version.resolver";
import { IConfig, config } from "./config";
import { CosmosManager } from "./cosmos";
import { TmdbDal } from "@dal/tmdb.dal";
import { TmdbResolver } from "@api/tmdb.resolver";

export interface Context {
  headers: Headers;
  accessToken: string;
  requestId: string;
}

@injectable()
export class Logger {
  log(...args) {
    console.log(...args);
  }
}

const container = new Container();

// Config
container.bind<IConfig>("config").toConstantValue(config);
container.bind<Context>("context").toConstantValue(null);
container.bind<CosmosManager>(CosmosManager).toSelf().inSingletonScope();
// DAL
container.bind<TmdbDal>(TmdbDal).toSelf().inRequestScope();
// Resolvers
container
  .bind<ApiVersionResolver>(ApiVersionResolver)
  .toSelf()
  .inRequestScope();
container.bind<TmdbResolver>(TmdbResolver).toSelf().inRequestScope();
export default container;
