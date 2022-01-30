import { injectable } from "inversify";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserInfo {
  @Field()
  public userId: string;
  @Field((returns) => [String])
  public roleNames: string[];
  @Field((returns) => [String])
  public groupPaths: string[];
  constructor(payload) {
    this.userId = payload.sub;
    this.groupPaths = payload?.groups;
    this.roleNames = payload?.realm_access?.roles;
  }
}
@injectable()
export class UserInfoManager {
  private _userInfo: UserInfo;
  public get userInfo(): UserInfo {
    return this._userInfo;
  }
  setUserInfo(userInfo: UserInfo) {
    this._userInfo = userInfo;
  }
}
