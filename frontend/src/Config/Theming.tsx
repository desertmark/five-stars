import React, { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';
const theme = createTheme({
    palette: {
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#0D47A1',
        },
        info: pink,
    },
});

export const AppTheme: FC = ({ children }) =>
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>