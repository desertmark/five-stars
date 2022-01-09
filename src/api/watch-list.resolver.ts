import { inject, injectable } from "inversify";
import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { TmdbDal } from "@dal/tmdb.dal";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import { Season } from "@models/season.model";
import { WatchListDal } from "@dal/watch-list.dal";
import { UserInfoManager } from "@models/user-info.model";
import { GraphQLJSON, GraphQLVoid } from "graphql-scalars";
import { WatchListItem } from "@models/watch-list-item.model";
@injectable()
@Resolver(WatchListItem)
export class WatchListResolver {
  constructor(
    @inject(WatchListDal) watchListDal,
    @inject(UserInfoManager) userInfoManager: any,
    @inject(TmdbDal) tmbdb
  ) {
    this.watchListDal = watchListDal;
    this.userInfoManager = userInfoManager;
    this.tmbdb = tmbdb;
  }
  private watchListDal: WatchListDal;
  private userInfoManager: UserInfoManager;
  private tmbdb: TmdbDal;

  @Authorized()
  @Query((returns) => WatchListItem, {
    description: "Adds a tv show to the user's watch list",
  })
  async addShow(@Arg("tvShowId") tvShowId: number): Promise<WatchListItem> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      const watchListItem = await this.watchListDal.getShowByTmdbId(tvShowId);
      if (!watchListItem) {
        const tvShow = await this.tmbdb.getTvById(tvShowId);
        return await this.watchListDal.upsert(
          new WatchListItem({ tvShow, userIds: [userId] })
        );
      }
      watchListItem.userIds.push(userId);
      return await this.watchListDal.upsert(watchListItem);
    } catch (error) {
      console.error("Failed to add tv show", error);
      throw error;
    }
  }

  @Authorized()
  @Query((returns) => [TvShow], {
    description: "Adds a tv show to the user's watch list",
  })
  async myShows(): Promise<TvShow[]> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      const watchList = await this.watchListDal.getShows(userId);
      return watchList?.map((wl) => wl.tvShow);
    } catch (error) {
      console.error("Failed to get user's watch list", error);
      throw error;
    }
  }
}
