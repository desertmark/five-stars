import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";
import { GraphQLRequestContext } from "apollo-server-types";
import { v4 as uuidv4 } from "uuid";

export class RequestPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any> | void> {
    return new RequestListener();
  }
}

class RequestListener implements GraphQLRequestListener {
  [key: string]: import("apollo-server-types").AnyFunction;
  async didResolveOperation(
    requestContext: GraphQLRequestContext
  ): Promise<void> {
    requestContext.context.accessToken = this.getAccessToken(requestContext);
    requestContext.context.headers = requestContext.request.http.headers;
    requestContext.context.requestId = uuidv4();
  }

  private getAccessToken(requestContext: GraphQLRequestContext) {
    try {
      return requestContext.request.http.headers
        .get("authorization")
        ?.toLowerCase()
        ?.slice(7);
    } catch (error) {
      console.log("Failed to get access token", error);
    }
  }
}
