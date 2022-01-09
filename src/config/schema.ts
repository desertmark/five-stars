import { buildSchemaSync, ResolverData } from "type-graphql";
import { ApiVersionResolver } from "@api/api-version.resolver";
import { Context } from "./container";
import { TmdbResolver } from "@api/tmdb.resolver";
import { AuthResolver } from "@api/auth.resolver";
import { Container } from "inversify";
import { GraphQLSchema } from "graphql";
import { AuthDal } from "@dal/auth.dal";
import { UserInfo, UserInfoManager } from "@models/user-info.model";
import { WatchListResolver } from "@api/watch-list.resolver";

export const schema = async (container: Container): Promise<GraphQLSchema> =>
  buildSchemaSync({
    resolvers: [
      ApiVersionResolver,
      TmdbResolver,
      AuthResolver,
      WatchListResolver,
    ],
    container: ({ context }: ResolverData<Context>) => {
      container.rebind("context").toConstantValue(context);
      return container;
    },
    authChecker: async (
      resolverData: ResolverData<Context>,
      roles: string[]
    ): Promise<boolean> => {
      const authDal = container.get<AuthDal>(AuthDal);
      const userInfo = await authDal.authorize(resolverData.context);
      if (userInfo) {
        const userInfoManager = container.get<UserInfoManager>(UserInfoManager);
        userInfoManager.setUserInfo(userInfo);
        return true;
      }
      return false;
    },
  });
