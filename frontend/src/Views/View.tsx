import React, { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { RouteProps } from 'react-router-dom';
export type ViewProps = { styles?: SxProps<Theme> } & RouteProps;

export const View: FC<ViewProps> = ({ children, styles }) => (
  <Box
    data-id="view"
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      ...styles,
    }}
  >
    {children}
  </Box>
);