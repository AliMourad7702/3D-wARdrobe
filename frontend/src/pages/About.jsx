import React from 'react';
import aliImage from '../imgs/ali.jpg';
import mazenImage from '../imgs/Screenshot 2025-05-12 223239.png'
// import ahmadTarImage from '../imgs/ahmadT.jpg';
// import ahmadNourImage from '../imgs/ahmadN.jpg';
// import moodyImage from '../imgs/moody.jpg';

import './About.css';

const About = () => {
    return (
        <div className="container">
            <h1>About Us</h1>
            <p>Welcome to 3D-wARdrobe!</p>
            <p>We are a passionate team of tech enthusiasts who have come together to create a unique and immersive 3D wardrobe experience.</p>

            <h2>Our Mission</h2>
            <p>Our mission is to revolutionize the way people interact with and explore fashion. We believe that technology can bring clothing and style to life in new and exciting ways.</p>

            <h2>What We Offer</h2>
            <p>At 3D-wARdrobe, we offer a one-of-a-kind virtual wardrobe experience. You can browse, mix and match clothing items, and style our mannequin in real-time. Whether you're a fashionista looking for inspiration or just curious about how different outfits would look on you, we've got you covered.</p>

            <h2>Support & Feedback</h2>
            <p>Contact us on our email: <a href="mailto:3DwARdrobe.service@gmail.com">3DwARdrobe.service@gmail.com</a></p>
            <br />
            <h2>Meet the Team</h2>
            <div className="team-img-container">
                <div className='team-member'>
                    <img src={aliImage} alt="Team Member 1" />
                    <h3>Ali Mourad</h3>
                </div>

                <div className='team-member'>
                    <img src={mazenImage} alt="Team Member 2" />
                    <h3>Mazen Azzam</h3>
                </div>
            </div>
        </div>
    );
}

export default About;