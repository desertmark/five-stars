import React, { FC } from "react";
import { View } from "./index";
import { useGetTrending } from "../gql/home.api";
import { Carousel, CarouselSlide } from '../Components'
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { LiveTv } from '@mui/icons-material';

const styles = {
    contentWrapper: {
        display: 'flex', justifyContent: 'center',
    },
    content: {
        width: 1280
    }
};
export const Home: FC = () => {
    const { data } = useGetTrending();
    const trendings = data?.getTrending?.results as any[];
    return (
        <View>
            <Box sx={styles.contentWrapper}>
                <Box sx={styles.content}>
                    <Carousel>
                        {
                            trendings?.map(trending => <CarouselSlide
                                key={trending.name + Math.random()}
                                height='720px'
                                url={`http://image.tmdb.org/t/p/w1280/${trending.backdrop_path}`}
                                overlay={true}
                                title={trending.name || trending.title}
                                description={trending.overview}
                            />)
                        }
                    </Carousel>
                    <Box mt={2}>

                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex' }}>
                                    <LiveTv color="primary" fontSize="large" />
                                    <Typography color="primary" fontSize={27} component="div" ml={2}>
                                        Search for a TV Show
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <TextField fullWidth placeholder="Search for a TV Show" variant="outlined" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>



        </View>
    );
};
