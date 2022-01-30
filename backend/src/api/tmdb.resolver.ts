import { inject, injectable } from "inversify";
import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { TmdbDal } from "@dal/tmdb.dal";
import { TvShow, TvShowSearchResult } from "@models/tv-show.model";
import { Season } from "@models/season.model";
@injectable()
@Resolver(TvShow)
export class TmdbResolver {
  constructor(@inject(TmdbDal) tmbdb) {
    this.tmbdb = tmbdb;
  }
  private tmbdb: TmdbDal;

  @Authorized()
  @Query((returns) => TvShowSearchResult, { description: "Search a tv show" })
  async searchTvShow(
    @Arg("query") query: string,
    @Arg("page") page: number
  ): Promise<TvShowSearchResult> {
    try {
      return await this.tmbdb.searchTvShows(query, page);
    } catch (error) {
      console.error("Failed to search tv show", error);
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
      console.error("Failed to search tv show", error);
    }
  }
  
  @Authorized()
  @Query((returns) => Season, {
    description: "Gets the tv show`s season information",
  })
  async getSeason(
    @Arg("tvShowId") tvShowId: number,
    @Arg("seasonNumber") seasonNumber: number
  ): Promise<Season> {
    try {
      return await this.tmbdb.getSeason(tvShowId, seasonNumber);
    } catch (error) {
      console.error("Failed to search tv show", error);
    }
  }
}
