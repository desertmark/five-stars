import React from 'react';
import './Carousel.css';
export interface CarouselState {
    carouselWidth: number,
    resizeObserver: ResizeObserver | null,
    activeSlideIndex: number | null,
    intervalId: number | null,
    playId: NodeJS.Timer | null,
}
export interface CarouselProps {
    children?: React.ReactNode[];
    interval?: number;
    width?: string;
}
export class Carousel extends React.Component<CarouselProps, CarouselState> {
    private carouselRef;
    constructor(props: CarouselProps) {
        super(props);
        this.state = {
            carouselWidth: 'auto' as any,
            resizeObserver: null,
            activeSlideIndex: null,
            intervalId: null,
            playId: null,
        }
        this.carouselRef = React.createRef<HTMLDivElement>();
        this.isActive = this.isActive.bind(this);
        this.getItemClass = this.getItemClass.bind(this);
        this.subscribeToResize = this.subscribeToResize.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);
        this.play = this.play.bind(this);
    }

    isLastSlide() {
        return this.state.activeSlideIndex === this.props.children?.length as number - 1;
    }

    isActive(index: number | null) {
        return index === this.state.activeSlideIndex;
    }

    getItemClass(index: number) {
        return 'carousel-dots-container__dot' + (this.isActive(index) ? ' carousel-dots-container__dot--active' : '')
    }

    goToSlide(index: number) {
        this.setState({ activeSlideIndex: index });
        const left = index * this.state.carouselWidth;
        this.carouselRef.current?.scrollTo({ left, behavior: 'smooth' });
    }

    subscribeToResize() {
        const obs = new ResizeObserver(() => {
            const width = this.carouselRef?.current?.clientWidth;
            this.setState({ carouselWidth: width as number });
        });
        obs.observe(this.carouselRef.current as HTMLDivElement);
        this.setState({ resizeObserver: obs });
    }

    goToNextSlide() {
        if (this.isLastSlide()) {
            this.goToSlide(0);
        } else {
            this.goToSlide(this.state.activeSlideIndex as number + 1);
        }
    }

    play() {
        const interval = this.props.interval || 300000;
        return setInterval(() => this.goToNextSlide(), interval);
    }

    stop() {
        clearInterval(this.state.playId as NodeJS.Timer);
    }

    componentDidMount() {
        this.subscribeToResize();
    }

    componentDidUpdate(prevProps: any, props: any) {
        if (props.width !== 'auto' && !this.state.playId) {
            this.setState({ playId: this.play() });
        }
    }

    componentWillUnmount() {
        this.state.resizeObserver?.disconnect();
        this.stop();
    }

    render() {
        return (
            <div className="carousel">
                <div className="carousel__wrapper" ref={this.carouselRef}>
                    <div className="carousel__slides-container">
                        {this.props.children?.map((child, index) =>
                            <div key={index} style={{ width: this.state.carouselWidth + 'px' }} className="carousel-slides-container__slide">
                                {child}
                            </div>
                        )}
                    </div>
                </div>
                <div className="carousel_dots-container">
                    {this.props.children?.map((child, index) => {
                        return <div key={index} className={this.getItemClass(index)} onClick={() => this.goToSlide(index)}></div>
                    })}
                </div>
            </div>
        );
    }
}
