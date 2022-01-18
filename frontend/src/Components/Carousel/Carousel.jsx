// https://www.npmjs.com/package/react-responsive-carousel
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import iictBuilding from '../../assets/images/iict_building.jpg'
import cat from '../../assets/images/cat.jpg'
import kid from '../../assets/images/kid.jpg'
import sparrow from '../../assets/images/sparrow.jpg'
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
      <div className='carouselItem'>
        <img src={iictBuilding} alt="carousel" />
        <div className="carouselInfo">
          <p className="title">
            Welcome to EEE Alumni Association
          </p>
          <p className='content'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
            Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
            repellat fugit enim mollitia!
          </p>
        </div>
      </div>
      <div className='carouselItem'>
        <img src={cat} alt="carousel" />
        <div className="carouselInfo">
          <p className="title">
            Welcome to EEE Alumni Association
          </p>
          <p className='content'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
            Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
            repellat fugit enim mollitia!
          </p>
        </div>
      </div>
      <div className='carouselItem'>
        <img src={kid} alt="carousel" />
        <div className="carouselInfo">
          <p className="title">
            Welcome to EEE Alumni Association
          </p>
          <p className='content'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
            Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
            repellat fugit enim mollitia!
          </p>
        </div>
      </div>
      <div className='carouselItem'>
        <img src={sparrow} alt="carousel" />
        <div className="carouselInfo">
          <p className="title">
            Welcome to EEE Alumni Association
          </p>
          <p className='content'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quis fugiat odit explicabo debitis reiciendis repudiandae, cum recusandae.
            Animi quia accusamus quo adipisci quisquam tempore modi consequuntur,
            repellat fugit enim mollitia!
          </p>
        </div>
      </div>
    </ReactCarousel>
  );
}

export default Carousel
