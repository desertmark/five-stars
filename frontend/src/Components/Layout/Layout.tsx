import React from "react";
import Box from "@mui/material/Box";
import { AppTheme } from "../../Config/Theming";
import { ApolloClientProvider } from "../../gql/apollo";

export const Layout: React.FC = ({ children }) => {
  return (
    <AppTheme>
      <ApolloClientProvider>
        <Box
          data-id="layout"
          sx={{
            backgroundColor: "#ccc",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </ApolloClientProvider>
    </AppTheme>
  );
};
