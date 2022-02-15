import { IConfig } from "@config/config";
import { Season } from "@models/season.model";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import axios, { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

export enum TmdbTimeWindow {
  Day = 'day',
  Week = 'week'
}

@injectable()
export class TmdbDal {
  private client: AxiosInstance;
  constructor(@inject("config") private config: IConfig) {
    this.client = axios.create({
      baseURL: this.config.tmbdbUrl,
      params: {
        api_key: this.config.tmdbKey,
      },
    });
  }

  async searchTvShows(
    search: string,
    page: number = 1
  ): Promise<TvShowSearchResult> {
    const response = await this.client.get("/search/tv", {
      params: {
        query: search,
        page,
      },
    });
    return new TvShowSearchResult(response.data);
  }

  async getTvShowById(tvShowId: number): Promise<TvShow> {
    const response = await this.client.get(`/tv/${tvShowId}`);
    return new TvShow(response.data);
  }

  async getSeason(tvShowId: number, seasonNumber: number): Promise<Season> {
    const response = await this.client.get(
      `/tv/${tvShowId}/season/${seasonNumber}`
    );
    return new Season(response.data);
  }

  async getTrending(timeWindow: TmdbTimeWindow = TmdbTimeWindow.Day): Promise<TvShowSearchResult> {
    const response = await this.client.get(
      `/trending/tv/${timeWindow}`,
    );
    return new TvShowSearchResult(response.data);
  }
}
