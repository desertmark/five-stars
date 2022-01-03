require("module-alias/register");
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { schema as buildSchema } from "@config/schema";
import { RequestPlugin } from "@config/plugins";
import { createContainer } from "@config/container";
import { CosmosManager } from "@config/cosmos";

(async () => {
  try {
    const container = await createContainer();
    const schema = await buildSchema(container);
    const server = new ApolloServer({
      schema,
      plugins: [new RequestPlugin()],
    });
    container.get(CosmosManager).init();
    const { url } = await server.listen({ port: 4001 });
    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to start server", error);
  }
})();
