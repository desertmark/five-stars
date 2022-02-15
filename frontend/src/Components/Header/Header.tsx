import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppState } from '../App/AppContext';

export const Header: React.FC = () => {
    const { userInfo, isAuthenticated } = useAppState();
    return (
        <Box sx={{ flexGrow: 0 }} data-id="header">
            <AppBar position="static">
                <Toolbar>
                    {
                        isAuthenticated &&
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Five Stars
                    </Typography>
                    {isAuthenticated &&
                        <>
                            <Typography align='right' variant="h6" component="div" sx={{ flexGrow: 0 }}>
                                {userInfo?.name}
                            </Typography>
                            <Typography align='right' component="div" sx={{ flexGrow: 0, ml: 1 }}>
                                |
                            </Typography>
                            <Typography align='right' component="div" sx={{ flexGrow: 0, ml: 1 }}>
                                {userInfo?.email}
                            </Typography>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}