import { inject, injectable } from "inversify";
import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { TmdbDal } from "@dal/tmdb.dal";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import { Season } from "@models/season.model";
import { WatchListDal } from "@dal/watch-list.dal";
import { UserInfoManager } from "@models/user-info.model";
import { WatchListItem } from "@models/watch-list-item.model";
import { Watcher } from "@models/watcher.model";

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

  /**
   * Imports a tvShow from the movie database to cosmos. 
   */
  private async importTvShow(tvShowId: number, userId?: string) {
    const tvShow = await this.tmbdb.getTvShowById(tvShowId);
    const seasonRequests = [];
    for (let season = 1; season <= tvShow.number_of_seasons; season++) {
      seasonRequests.push(
        this.tmbdb.getSeason(tvShowId, season),
      );
    }
    const seasons = await Promise.all(seasonRequests);
    return await this.watchListDal.upsert(
      new WatchListItem({ tvShow, watchers: [{ userId }], seasons })
    );
  }

  @Authorized()
  @Query((returns) => WatchListItem, {
    description: "Adds a tv show to the user's watch list",
  })
  async addTvShow(@Arg("tvShowId") tvShowId: number): Promise<WatchListItem> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      const watchListItem = await this.watchListDal.getTvShowByTmdbId(tvShowId);
      if (!watchListItem) {
        return await this.importTvShow(tvShowId, userId);
      }
      watchListItem.watchers.push(new Watcher({ userId }));
      return await this.watchListDal.upsert(watchListItem);
    } catch (error) {
      console.error("Failed to add tv show", error);
      throw error;
    }
  }

  @Authorized()
  @Query((returns) => [WatchListItem], {
    description: "Adds a tv show to the user's watch list",
  })
  async myTvShows(): Promise<WatchListItem[]> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      return await this.watchListDal.getTvShowsByUserId(userId);
    } catch (error) {
      console.error("Failed to get user's watch list", error);
      throw error;
    }
  }

  @Authorized()
  @Query((returns) => WatchListItem, {
    description: "Marks an episode of a tv show as seen by the current user.",
  })
  async markAsSeen(
    @Arg("tvShowId") tvShowId: number,
    @Arg("seasonNumber") seasonNumber: number,
    @Arg("episodeNumber") episodeNumber: number
  ): Promise<WatchListItem> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      const watchListItem = await this.watchListDal.getTvShowByTmdbId(tvShowId);
      watchListItem.seasons[seasonNumber].episodes[episodeNumber].watchers.push(new Watcher({ userId }));
      await this.watchListDal.upsert(watchListItem);
      return watchListItem;
    } catch (error) {
      console.error("Failed to get user's watch list", error);
      throw error;
    }
  }

  @Authorized()
  @Query((returns) => WatchListItem, {
    description: "Unmarks an episode of a tv show as seen by the current user.",
  })
  async unMarkAsSeen(
    @Arg("tvShowId") tvShowId: number,
    @Arg("seasonNumber") seasonNumber: number,
    @Arg("episodeNumber") episodeNumber: number
  ): Promise<WatchListItem> {
    try {
      const userId = this.userInfoManager.userInfo.userId;
      const watchListItem = await this.watchListDal.getTvShowByTmdbId(tvShowId);

      watchListItem.seasons[seasonNumber].episodes[episodeNumber].watchers = watchListItem.seasons[seasonNumber].episodes[episodeNumber].watchers.filter(w => w.userId === userId)

      await this.watchListDal.upsert(watchListItem);
      return watchListItem;
    } catch (error) {
      console.error("Failed to get user's watch list", error);
      throw error;
    }
  }

}
