import { IConfig } from "@config/config";
import { Context } from "@config/container";
import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import axios from "axios";
import { JWT } from "graphql-scalars/mocks";
import { inject, injectable } from "inversify";
import { BaseClient, Issuer, TokenSet } from "openid-client";
import { AuthChecker, ResolverData } from "type-graphql";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "@models/user-info.model";
import { User } from "@azure/cosmos";

@injectable()
export class AuthDal {
  constructor(
    @inject(KeycloakAdminClient) private adminClient: KeycloakAdminClient,
    @inject("openid") private userClient: BaseClient,
    @inject("kcPublicKey") private publicKey: string
  ) {}

  async login(username: string, password: string): Promise<TokenSet> {
    return await this.userClient.grant({
      grant_type: "password",
      username,
      password,
    });
  }

  async authorize(context: Context) {
    // TODO: check roles and groups
    return await this.verifyToken(context.accessToken);
  }

  verifyToken(accessToken: string): UserInfo {
    try {
      const payload = jwt.verify(accessToken, this.publicKey, {
        algorithms: ["RS256"],
      });
      return new UserInfo(payload);
    } catch (error) {
      console.error("Failed to authenticate user", error);
      throw error;
    }
  }
}
