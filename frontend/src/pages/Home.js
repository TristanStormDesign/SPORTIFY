import React from 'react';
import './Home.css';
import videoSource from '../images/HeaderVideo.mp4';
import middleImage from '../images/middleImage.png';
import sportLogo1 from '../images/sportLogo1.png';
import sportLogo2 from '../images/sportLogo2.png';
import sportLogo3 from '../images/sportLogo3.png';
import sportLogo4 from '../images/sportLogo4.png';
import sportLogo5 from '../images/sportLogo5.png';
import sportLogo6 from '../images/sportLogo6.png';
import storeImage from '../images/storeImage.png';

const Home = () => {
    return (
        <div>
            <header className="header">
                <video autoPlay loop muted className="header-video">
                    <source src={videoSource} type="video/mp4" />
                </video>
                <img src={middleImage} alt="Middle" className="middle-image" />
            </header>
            <section className="logos-section">
                <div className="logo-block"><img src={sportLogo1} alt="Sport Logo 1" /></div>
                <div className="logo-block"><img src={sportLogo2} alt="Sport Logo 2" /></div>
                <div className="logo-block"><img src={sportLogo3} alt="Sport Logo 3" /></div>
                <div className="logo-block"><img src={sportLogo4} alt="Sport Logo 4" /></div>
                <div className="logo-block"><img src={sportLogo5} alt="Sport Logo 5" /></div>
                <div className="logo-block"><img src={sportLogo6} alt="Sport Logo 6" /></div>
            </section>
            <section className="about-section">
                <img src={storeImage} alt="Store" className="store-image" />
                <div className="about-text">
                    <h2>About Sportify</h2>
                    <p>Welcome to Sportify, your number one source for all things sports. We're dedicated to giving you the very best of sporting goods, with a focus on quality, customer service, and uniqueness. Founded in 2021, Sportify has come a long way from its beginnings in a home office. We hope you enjoy our products as much as we enjoy offering them to you.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
