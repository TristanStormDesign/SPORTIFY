import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import headerImage from '../images/HeaderImage.png';
import nikeText from '../images/NikeText.png';
import underArmorText from '../images/UnderArmorText.png';
import adidasText from '../images/AdidasText.png';
import pumaText from '../images/PumaText.png';

const Home = () => {
  const slides = [
    { textImage: nikeText },
    { textImage: underArmorText },
    { textImage: adidasText },
    { textImage: pumaText },
  ];

  return (
    <div>
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
        <Carousel
          className="product-carousel"
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          autoPlay
          interval={5000}
          infiniteLoop
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item">
              <div className="carousel-content">
                <div className="text-section">
                  <img src={slide.textImage} alt="Text" className="text-image" />
                  <Link to="/products" className="view-product-button">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </header>
      <section className="blank-section"></section>
    </div>
  );
};

export default Home;
