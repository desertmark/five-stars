import { buildSchemaSync, ResolverData } from "type-graphql";
import { ApiVersionResolver } from "@api/api-version.resolver";
import container, { Context } from "./container";

export const schema = buildSchemaSync({
  resolvers: [ApiVersionResolver],
  container: ({ context }: ResolverData<Context>) => {
    container.rebind("context").toConstantValue(context);
    return container;
  },
});
