import React, { FC } from "react";
import { View } from "./index";
import { useGetTrending } from "../gql/home.api";
import { Carousel, CarouselSlide } from '../Components'
import { Box } from "@mui/material";
export const Home: FC = () => {
    const { data } = useGetTrending();
    const trendings = data?.getTrending?.results as any[];
    return (
        <View>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Box sx={{ width: 1280 }}>
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
                </Box>
            </Box>

            <h1>{JSON.stringify(data?.getTrending?.results)}</h1>
        </View>
    );
};
