require("module-alias/register");
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { schema as buildSchema } from "@config/schema";
import { RequestPlugin } from "@config/plugins";
import { createContainer } from "@config/container";
import { CosmosManager } from "@config/cosmos";
import { TmdbDal } from "@dal/tmdb.dal";

(async () => {
  try {
    const container = await createContainer();
    const schema = await buildSchema(container);
    const server = new ApolloServer({
      schema,
      plugins: [new RequestPlugin()],
    });
    await container.get(CosmosManager).init();
    // await container.get(TmdbDal).getConfig();
    const { url } = await server.listen({ port: 4002 });
    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to start server", error);
  }
})();
