require("module-alias/register");
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { schema } from "@config/schema";
import { RequestPlugin } from "@config/plugins";

const server = new ApolloServer({
  schema,
  plugins: [new RequestPlugin()],
});

(async () => {
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
})();
