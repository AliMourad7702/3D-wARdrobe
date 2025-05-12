import cart from '../imgs/cart.svg';
import wardrobe from '../imgs/wardrobe.svg';
import logo from '../imgs/logo.png';
import Auth from '../Auth';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        setIsAuth(Auth.isAuth)
    }, [])

    useEffect(() => {
        setIsAuth(Auth.isAuth)
    }, [Auth.isAuth])


    const handleNavigation = (path) => {
        if ((path === "/signup" || path === "/login") && isAuth) {
            navigate("/home");
            return;
        }
        if (path === "/about") {
            navigate("/about");
            return;
        }

        if (path === "/premiumInfo") {
            navigate("/premiumInfo");
            return;
        }

        if (path !== location.pathname) {
            navigate(path);
        }
    }

    const handleLogout = () => {
        Auth.deAuthenticate();
        setIsAuth(false);
        window.location.reload();
    }

    return (
        <>

            <div className="nav">
                <button className='nav-logo' onClick={() => handleNavigation("/home")} > <img className='logo' src={logo} /></button>
                <div className="nav-right">
                    <button className='nav-links' onClick={() => handleNavigation("/home")}>Home</button>
                    <button className='nav-links' onClick={() => handleNavigation("/about")}>About</button>
                    <button className='nav-links' onClick={() => handleNavigation("/premiumInfo")}>Go Premium</button>
                    <button className='nav-links' onClick={() => handleNavigation("/signup")} style={{ display: isAuth ? "none" : "block" }}>Sign up</button>
                    <button className='nav-links' onClick={() => handleNavigation("/login")} style={{ display: isAuth ? "none" : "block" }}>Login</button>
                    <button className='nav-links logout' onClick={handleLogout} style={{ display: isAuth ? "block" : "none" }}>Logout</button>
                </div>
            </div>
        </>


    )

}
export default NavBar;