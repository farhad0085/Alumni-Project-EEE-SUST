// https://www.npmjs.com/package/react-responsive-carousel
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import beachImage from '../../assets/images/beach.jpg'
import deskImage from '../../assets/images/desk.jpg'
import './styles.css'


const Carousel = () => {
  return (
    <ReactCarousel
      useKeyboardArrows={true}
      showStatus={false}
      autoPlay
      interval={4000}
      infiniteLoop
    >
      <div>
        <img src={beachImage} alt="carousel" />
        <p className="carouselInfo">
          Welcome to EEE Alumni Association
        </p>
      </div>
      <div>
        <img src={deskImage} alt="carousel" />
        <p className="title">Legend 2</p>
      </div>
      <div>
        <img src={beachImage} alt="carousel" />
        <p className="title">Legend 3</p>
      </div>
    </ReactCarousel>
  );
}

export default Carousel
