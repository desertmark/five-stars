import React from 'react';
import Box from '@mui/material/Box';
import { AppTheme } from '../../Config/Theming';

export const Layout: React.FC = ({ children }) => {
    return (
        <AppTheme>
            <Box sx={{ backgroundColor: "#333", width: "100%", height: "100%", flexGrow: 1 }}>
                {children}
            </Box>
        </AppTheme>
    );
}