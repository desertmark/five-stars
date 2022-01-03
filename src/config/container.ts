import { Container, injectable } from "inversify";
import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import { Headers } from "apollo-server-env";
import { ApiVersionResolver } from "@api/api-version.resolver";
import { IConfig, config } from "./config";
import { CosmosManager } from "./cosmos";
import { TmdbDal } from "@dal/tmdb.dal";
import { TmdbResolver } from "@api/tmdb.resolver";
import {
  kcAdminClientFactory,
  kcClientFactory,
  openIdClientFactory,
  publicKeyFactory,
} from "./keycloak";
import { BaseClient } from "openid-client";
import { AuthResolver } from "@api/auth.resolver";
import { AuthDal } from "@dal/auth.dal";
import { UserInfo, UserInfoManager } from "@models/user-info.model";

export abstract class Context {
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

export async function createContainer(): Promise<Container> {
  const container = new Container();

  // Config
  container.bind<IConfig>("config").toConstantValue(config);
  container.bind<Context>("context").toConstantValue(null);
  container.bind<CosmosManager>(CosmosManager).toSelf().inSingletonScope();
  container
    .bind<KeycloakAdminClient>(KeycloakAdminClient)
    .toConstantValue(await kcClientFactory(config));
  container
    .bind<BaseClient>("openid")
    .toConstantValue(await openIdClientFactory(config));
  container
    .bind<string>("kcPublicKey")
    .toConstantValue(await publicKeyFactory(config));
  container.bind<UserInfoManager>(UserInfoManager).toSelf().inSingletonScope();
  // DAL
  container.bind<AuthDal>(AuthDal).toSelf().inRequestScope();
  container.bind<TmdbDal>(TmdbDal).toSelf().inRequestScope();
  // Resolvers
  container
    .bind<ApiVersionResolver>(ApiVersionResolver)
    .toSelf()
    .inRequestScope();
  container.bind<TmdbResolver>(TmdbResolver).toSelf().inRequestScope();
  container.bind<AuthResolver>(AuthResolver).toSelf().inRequestScope();
  return container;
}
export default createContainer;
