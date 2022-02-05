import React, { FC } from 'react';
import { Box } from '@mui/material';

export const View: FC = ({ children }) =>
    <Box data-id="view" sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
        {children}
    </Box>
