import { inject, injectable } from "inversify";
import { Arg, Query, Resolver } from "type-graphql";
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

  @Query((returns) => TvShowSearchResult)
  async searchTv(
    @Arg("query") query: string,
    @Arg("page") page: number
  ): Promise<TvShowSearchResult> {
    try {
      return await this.tmbdb.searchTv(query, page);
    } catch (error) {
      console.error("Failed to search tv show", error);
    }
  }

  @Query((returns) => TvShow)
  async getTvById(@Arg("tvShowId") tvShowId: number): Promise<TvShow> {
    try {
      return await this.tmbdb.getTvById(tvShowId);
    } catch (error) {
      console.error("Failed to search tv show", error);
    }
  }

  @Query((returns) => Season)
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
