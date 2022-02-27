import React, { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { RouteProps } from "react-router-dom";
export type BaseViewProps = { styles?: SxProps<Theme> } & RouteProps;

export const BaseView: FC<BaseViewProps> = ({ children, styles }) => (
  <Box
    data-id="base-view"
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      overflow: 'auto',
      ...styles,
    }}
  >
    {children}
  </Box>
);
