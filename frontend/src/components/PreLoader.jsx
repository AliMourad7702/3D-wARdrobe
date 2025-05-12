import React from "react";
import './preLoader.css';
import { useState, useEffect, useRef } from "react";
import { preLoaderAnim } from "animations";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../Auth";

function Preloader() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [isAuth, setIsAuth] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const videoRef = useRef(null);


    useEffect(() => {
        setIsAuth(Auth.isAuth)
    }, [])

    useEffect(() => {
        setIsAuth(Auth.isAuth)
    }, [Auth.isAuth])

    useEffect(() => {

        setIsLoaded(true);

    }, []);

    const handleNavigation = (path) => {
        console.log("Navigating to:", path);

        if ((path === "/signup" || path === "/login") && !isAuth) {
            navigate(path);
            preLoaderAnim();
            setIsLoaded(false);
        }

        if (path === location.pathname) {
            navigate(path);
            preLoaderAnim();
            setIsLoaded(false);
        }

        if (path !== location.pathname) {
            navigate(path);
            preLoaderAnim();
            setIsLoaded(false);
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            preLoaderAnim();
        }
    }, [isLoaded])

    useEffect(() => {
        const video = videoRef.current;
        const handleTimeUpdate = () => {
            if (video.currentTime >= video.duration - 0.1) {
                video.currentTime = 0;
                video.play();
            }
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (

        <div className="preloader">
            <div className="background-video">
                <video ref={videoRef} autoPlay loop muted>
                    <source src="/videos/preloader video.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="texts-container">
                <h1>Experience the magic of virtual fashion</h1>

                <h4>
                    Unlock a world of possibilities with our amazing platform.<br />
                    Try on clothes on a 3D mannequin,<br />
                    customize body shape, skin color, and enter AR mode!
                </h4>

                <div className="preNav">
                    <button className='nav-links' onClick={() => handleNavigation("/home")}>Enter as Guest</button>
                    <button className='nav-links' onClick={() => handleNavigation("/signup")}>Sign Up / Log In</button>
                </div>
            </div>
            <br />

        </div>

    );
}

export default Preloader;