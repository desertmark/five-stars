import React, { FC } from 'react';
import { View } from './index';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export const Login: FC = () => {
    return (
        <View>
            <Card sx={{ minWidth: 275, maxWidth: "50%" }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Login
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button>Learn More</Button>
                </CardActions>
            </Card>
        </View>
    );
}