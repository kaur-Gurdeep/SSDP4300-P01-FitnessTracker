import React, { useState, useEffect } from "react";
import styles from './layout.module.css'; 
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
import { Link } from "react-router-dom";


const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpened, setMenuOpened] = useState(false);

  // Dynamically update screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles['header']}>
      <img src={Logo} alt="fitness tracker logo" className={styles['logo']} />
      {menuOpened === false && isMobile ? (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: "var(--appColor)",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          onClick={() => setMenuOpened(true)}
        >
          <img
            src={Bars}
            alt="hamburger"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              maxHeight: "100%",
            }}
          />
        </div>
      ) : (
        <ul className={styles['header-menu']}>
          <li onClick={() => setMenuOpened(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link to="/contact">Contact</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link to='/workouts'>Workouts</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link to='/workout/create'>Create Workout</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
