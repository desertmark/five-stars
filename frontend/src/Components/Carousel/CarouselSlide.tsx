import React, { FC } from 'react';
import './CarouselSlide.css';
import { Typography } from '@mui/material';

export interface CarouselSlideProps {
    url: string;
    height: string;
    overlay: boolean;
    title: string;
    description: string;
}

export const CarouselSlide: FC<CarouselSlideProps> = ({ url, height, overlay, title, description }) => {
    return <div className="carousel-slide" style={{ backgroundImage: `url(${url})`, height }}>
        {overlay &&
            <div className="carousel-slide__overlay">
                <div className="carousel-slide-overlay__content">
                    {title &&
                        <div className="carousel-slide__title">
                            <Typography variant="h4" color="white">{title}</Typography>
                        </div>
                    }
                    {description &&
                        <div className="carousel-slide__description">
                            <Typography variant="h6" color="white">{description}</Typography>
                        </div>
                    }
                </div>
            </div>
        }
    </div>
}