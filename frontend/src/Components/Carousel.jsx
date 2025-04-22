import React from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.css"; // CSS Module import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
    <div className={styles.arrow + " " + styles.next} onClick={onClick}>
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path
                d="M8 4l8 8-8 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div className={styles.arrow + " " + styles.prev} onClick={onClick}>
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path
                d="M16 4l-8 8 8 8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    </div>
);

const Carousel = ({ photos }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: styles.sliderContainer,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={styles.carouselWrapper}>
            <Slider {...settings}>
                {photos.map((img, i) => (
                    <div key={i} className={styles.slide}>
                        <img
                            src={img}
                            alt={`Slide ${i}`}
                            className={styles.slideImage}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
