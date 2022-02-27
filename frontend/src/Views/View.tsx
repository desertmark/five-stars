import { Box } from "@mui/system";
import React, { FC } from "react";
import { BaseViewProps, BaseView } from ".";
export type ViewProps = BaseViewProps;
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  content: {
    width: 1280,
    display: "flex",
    flexDirection: "column",
    pb: 2
  },
};
export const View: FC<ViewProps> = ({ children }) => (
  <BaseView>
    <Box data-id="view" sx={styles.wrapper}>
      <Box sx={styles.content}>{children}</Box>
    </Box>
  </BaseView>
);
