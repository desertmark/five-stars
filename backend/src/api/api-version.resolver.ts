import { inject, injectable } from "inversify";
import { Arg, Query, Resolver } from "type-graphql";
import { Context } from "@config/container";
import { ApiVersion } from "@models/api-version";
import pkg from "../../package.json";
@injectable()
@Resolver(ApiVersion)
export class ApiVersionResolver {
  constructor(@inject("context") context) {
    this.context = context;
  }
  private context: Context;

  @Query((returns) => ApiVersion)
  async getApiVersion() {
    const info = new ApiVersion();
    info.status = "ok";
    info.version = pkg.version;
    info.date = new Date().toISOString();
    return info;
  }
}
