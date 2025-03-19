import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './layout.css';
import hero_image from '../../assets/hero-img.gif';
import heart from '../../assets/heart.png';
import { motion } from 'framer-motion';
import { reviews } from '../../constants/reviews';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const Home = () => {

    const [currentReview, setCurrentReview] = useState(0);

    //For REVIEWS SECTION
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000); // Change review after 5 seconds
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
  
    // Handle next review
    const nextReview = () => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    };
  
    // Handle previous review
    const prevReview = () => {
      setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

  // For Hero Section
  const transition = {type: "spring", duration: 3}
  const mobile = window.innerWidth<=768 ? true : false;
  return (
    <>
        <div className="hero">
            {/* LEFT SECTION */}
            <div className="left-h"> 
                <div className="ad">
                <motion.div
                    initial={{ left: mobile? '165px' : '238px' }}
                    whileInView={{ left: '8px' }}
                    transition={{ ...transition, type: "tween" }} 
                />
                    <span>Track your fitness journey with us</span>
                </div>
                
                <div className="hero-text">
                    <div>
                        <span className="stroke-text">Track </span>
                        <span>Progress</span>
                    </div>
                    <div>
                        <span>Reach Goals</span>
                    </div>
                    <div>
                        <span>
                        Create custom workouts, track calories burned, and monitor your daily progress all in one place.
                        </span>
                    </div>
                </div>
                <div className="figures">
                    <div>
                        <span>+100</span>
                        <span>total exercises</span>
                    </div>
                    <div>
                        <span>+800</span>
                        <span>members joined</span>
                    </div>
                    <div>
                        <span>Unlimited</span>
                        <span>workouts</span>
                    </div>
                </div>
                <div className="hero-buttons">
                    <Link to="/register" className="btn">Get Started</Link>
                    <Link to="/about" className="btn">Learn more</Link>
                </div>
            </div>
            {/* RIGHT SECTION */}
            <div className="right-h">
            <Link to="/register" className="btn">Register Now</Link>

                <motion.div
                    initial={{ right:"-1rem" }}
                    whileInView={{ right:"4rem" }}
                    transition={transition} 
                    className="heart">
                    <img src={heart} alt="heart" />
                    <span>Heart Rate</span>
                    <span>110 bpm</span>
                </motion.div>

                <img src={hero_image} alt="hero image" className="hero-image" />
            </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="reviews-section">     
        <button className="nav-button left" onClick={prevReview}>
            <FaArrowLeft />
        </button>
        <div className="reviews-container">
            <div className="review-card">
            <p>{reviews[currentReview].text}</p>
            <p className="reviewer-name">{reviews[currentReview].name}</p>
            <p className="review-rating">{reviews[currentReview].rating}</p>
            </div>
        </div>
        <button className="nav-button right" onClick={nextReview}>
            <FaArrowRight />
        </button>
        </div>
    </>
  );
};

export default Home;
