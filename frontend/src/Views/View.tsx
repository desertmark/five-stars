import React, { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";

export const View: FC<{ styles?: SxProps<Theme> }> = ({ children, styles }) => (
  <Box
    data-id="view"
    sx={{
        display: "flex",
        flexDirection: "column",
        height:"100%",
      ...styles,
    }}
  >
    {children}
  </Box>
);
