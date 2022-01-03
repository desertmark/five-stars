require("module-alias/register");
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { schema } from "@config/schema";
import { RequestPlugin } from "@config/plugins";
import container from "@config/container";
import { CosmosManager } from "@config/cosmos";

const server = new ApolloServer({
  schema,
  plugins: [new RequestPlugin()],
});

(async () => {
  container.get(CosmosManager).init();
  const { url } = await server.listen({ port: 4001 });
  console.log(`🚀  Server ready at ${url}`);
})();
