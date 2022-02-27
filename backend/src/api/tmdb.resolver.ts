import { inject, injectable } from "inversify";
import { Arg, Authorized, Int, Query, Resolver } from "type-graphql";
import { TmdbDal } from "@dal/tmdb.dal";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import { Season } from "@models/season.model";
import { ResponseError } from "@models/error.model";
@injectable()
@Resolver(TvShow)
export class TmdbResolver {
  constructor(@inject(TmdbDal) tmbdb) {
    this.tmbdb = tmbdb;
  }
  private tmbdb: TmdbDal;

  @Query((returns) => TvShowSearchResult, { description: "Search a tv show" })
  async searchTvShow(
    @Arg("query") query: string,
    @Arg("page", (type) => Int) page: number
  ): Promise<TvShowSearchResult> {
    try {
      return await this.tmbdb.searchTvShows(query, page);
    } catch (error) {
      const responseError = ResponseError.toResponseError(error);
      console.error("Failed to search tv show", responseError);
      throw responseError;
    }
  }

  @Authorized()
  @Query((returns) => TvShow, {
    description: "Gets a tv show with the given Id",
  })
  async getTvShowById(@Arg("tvShowId") tvShowId: number): Promise<TvShow> {
    try {
      return await this.tmbdb.getTvShowById(tvShowId);
    } catch (error) {
      const responseError = ResponseError.toResponseError(error);
      console.error("Failed to search tv show", responseError);
      throw responseError;
    }
  }

  @Authorized()
  @Query((returns) => Season, {
    description: "Gets the tv show`s season information",
  })
  async getSeason(
    @Arg("tvShowId") tvShowId: number,
    @Arg("seasonNumber", (type) => Int) seasonNumber: number
  ): Promise<Season> {
    try {
      return await this.tmbdb.getSeason(tvShowId, seasonNumber);
    } catch (error) {
      const responseError = ResponseError.toResponseError(error);
      console.error("Failed to search tv show", responseError);
      throw responseError;
    }
  }

  @Query((returns) => TvShowSearchResult, {
    description: "Gets the daily trending tv shows",
  })
  async getTrending(): Promise<TvShowSearchResult> {
    try {
      const results = await this.tmbdb.getTrending();
      return results;
    } catch (error) {
      const responseError = ResponseError.toResponseError(error);
      console.error("Failed to search trending tv shows", responseError);
      throw responseError;
    }
  }
}
