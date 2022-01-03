import { buildSchemaSync, ResolverData } from "type-graphql";
import { ApiVersionResolver } from "@api/api-version.resolver";
import container, { Context } from "./container";
import { TmdbResolver } from "@api/tmdb.resolver";

export const schema = buildSchemaSync({
  resolvers: [ApiVersionResolver, TmdbResolver],
  container: ({ context }: ResolverData<Context>) => {
    container.rebind("context").toConstantValue(context);
    return container;
  },
});
