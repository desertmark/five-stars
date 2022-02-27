import React, { FC, useState } from "react";
import { BaseView, View } from "./index";
import { ITvShow, useGetTrending, useSearch } from "../gql/home.api";
import { Carousel, CarouselSlide, TvShow } from "../Components";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { LiveTv } from "@mui/icons-material";
import { useConfig } from "../gql/config.api";

export const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<any>();
  const { data: configData } = useConfig();
  const { data: trendingData } = useGetTrending();
  const { refetch: searchTvShows } = useSearch({ skip: true });

  const trendings = trendingData?.getTrending?.results as any[];
  const config = configData.getConfig;

  const handleSearch = async (event: any) => {
    const value = event?.target?.value;
    const { data } = await searchTvShows({
      query: value,
      page: 1,
    });
    setSearchResults(data?.searchTvShow?.results);
  };

  return (
    <View>
      <Carousel>
        {trendings?.map((trending) => (
          <CarouselSlide
            key={trending.name + Math.random()}
            height="720px"
            url={`${config.imageBaseUrl}${trending.backdrop_path}`}
            overlay={true}
            title={trending.name || trending.title}
            description={trending.overview}
          />
        ))}
      </Carousel>
      <Card
        sx={{ mt: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <LiveTv color="primary" fontSize="large" />
            <Typography color="primary" fontSize={27} component="div" ml={2}>
              Search for a TV Show
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              onChange={handleSearch}
              fullWidth
              placeholder="Search for a TV Show"
              variant="outlined"
            />
          </Box>
          <Box>
            {searchResults?.map((sr: ITvShow) => (
              <TvShow tvShow={sr} key={sr.id} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </View>
  );
};
