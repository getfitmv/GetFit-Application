import React from "react";
import Slider from "react-slick";
import MyButton from "../utils/button";

const HomeSlider = props => {
  const slides = [
    {
      img: "/images/Slide-1.jpg",
      lineOne: "Get Fit",
      lineTwo: "your online trainer",
      linkTitle: "Shop now"
    },
    {
      img: "/images/Slide-2.jpg",
      lineOne: "Get Fit",
      lineTwo: "your goals will be achived"
    },
    {
      img: "/images/Slide-3.jpg",
      lineOne: "Get Fit",
      lineTwo: "no obe is better than us"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="featured_image"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`
              }}
            >
              <div className="featured_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag low_title">{item.lineTwo}</div>
                <div />
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
