import { AuthDal } from "@dal/auth.dal";
import { TokenSets } from "@models/token-set.model";
import { UserInfo, UserInfoManager } from "@models/user-info.model";
import { inject, injectable } from "inversify";
import { Arg, Authorized, Query, Resolver, Mutation } from "type-graphql";

@injectable()
@Resolver(TokenSets)
export class AuthResolver {
  constructor(
    @inject(AuthDal) authDal,
    @inject(UserInfoManager) userInfoManager: any
  ) {
    this.authDal = authDal;
    this.userInfoManager = userInfoManager;
  }
  private authDal: AuthDal;
  private userInfoManager: UserInfoManager;

  @Mutation((returns) => TokenSets, { description: "Get tokens" })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<TokenSets> {
    try {
      return await this.authDal.login(username, password);
    } catch (error) {
      console.error("Failed to login", username, error);
    }
  }

  @Authorized()
  @Query((returns) => UserInfo, { description: "Get token user info" })
  async getUserInfo(): Promise<UserInfo> {
    return this.userInfoManager.userInfo;
  }
}
