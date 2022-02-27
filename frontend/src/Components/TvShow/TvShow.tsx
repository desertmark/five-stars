import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import "./TvShow.css";

import "./CircularProgress.css";
import { CircularProgress as MuiCircularProgress } from "@mui/material";
import { ITvShow } from "../../gql/home.api";
import { useConfig } from "../../gql/config.api";

export const TvShow: FC<any> = ({
  tvShow: { poster_path, vote_average, id, name, overview },
}: {
  tvShow: ITvShow;
}) => {
  const { data } = useConfig();
  const config = data.getConfig;
  return (
    <div className="media">
      <div
        className="media__poster"
        style={{ backgroundImage: `url(${config.imageBaseUrl}${poster_path})` }}
      >
        <div className="media-poster__rating">
          <CircularProgress
            thickness={5}
            color="info.main"
            variant="determinate"
            value={vote_average * 10}
          >
            <div className="media-poster__rating">
              <Typography color="secondary.light">{vote_average}</Typography>
            </div>
          </CircularProgress>
        </div>
      </div>
      <Box mt={1} mb={1}>
        <Typography>{name}</Typography>
        <Typography color="primary.dark">{"01/01/2000"}</Typography>
      </Box>
    </div>
  );
};

const CircularProgress: FC<any> = ({ children, color, ...props }) => {
  return (
    <Box className="circular-progress" color={color}>
      <MuiCircularProgress {...props} color="inherit" />
      <div className="circular-progress__content">{children}</div>
    </Box>
  );
};
