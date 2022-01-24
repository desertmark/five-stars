import { IConfig } from "@config/config";
import { CosmosManager } from "@config/cosmos";
import { Season } from "@models/season.model";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import { WatchListItem } from "@models/watch-list-item.model";
import axios, { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class WatchListDal {
  constructor(@inject(CosmosManager) private db: CosmosManager) {}

  async upsert(watchListItem: WatchListItem): Promise<WatchListItem> {
    try {
      const response = await this.db.watchLists.items.upsert<WatchListItem>(
        watchListItem
      );
      return response.resource;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getShowByTmdbId(tvShowId: number): Promise<WatchListItem> {
    try {
      const response = await this.db.watchLists.items
        .query<WatchListItem>({
          query: "SELECT * FROM WatchList wl WHERE wl.tvShow.id = @tvShowId",
          parameters: [{ name: "@tvShowId", value: tvShowId }],
        })
        .fetchAll();
      return response.resources[0];
    } catch (error) {
      console.error("Failed to getShowByTmdbId", tvShowId, error);
      throw error;
    }
  }

  async getShows(userId: string): Promise<WatchListItem[]> {
    try {
      const response = await this.db.watchLists.items
        .query<WatchListItem>({
          query:
            "SELECT * FROM WatchList wl WHERE ARRAY_CONTAINS(wl.userIds, @userId)",
          parameters: [{ name: "@userId", value: userId }],
        })
        .fetchAll();
      return response.resources;
    } catch (error) {
      console.error("Failed to getShows", userId, error);
    }
  }
}
