import React, {useContext} from 'react';
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin} from "react-icons/bs";
import  './footer.css'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Footer() {

    const {logout, isAuth} = useContext(AuthContext)

    function handleLogout(){
        if (isAuth){
            logout();
        }
    }

    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Navigate To</h4>
                            <ul>
                                <li><NavLink to= {isAuth ? '/profile' : '/authenticate'}>{isAuth ? 'My Profile' : 'Log in/Sign up'}</NavLink></li>
                                <li><NavLink to={isAuth ? '/favorite' : '/authenticate'}>My Favorites</NavLink></li>
                                {isAuth &&
                                    <li><NavLink onClick={(event => {handleLogout(event)})}
                                                 to='/authenticate'>Log Out</NavLink></li>
                                }
                            </ul>
                    </div>
                    <div className="footer-col note">
                        <h4>A Personal Note</h4>
                        <p>Thank you for visiting and using my website. I hope you find many delicious meals to satiate your hunger</p>
                    </div>
                    <div className="footer-col">
                        <h4>Social Media</h4>
                            <div className='social-links'>
                                <li><a href='https://github.com/MellemaD/Cooker-react-recipe-project' target='_blank' rel="noreferrer"><i><BsGithub/></i></a></li>

                                {/*Following links don't actually work since it isn't an actual website:*/}
                                <li><a href='#'><i><BsFacebook/></i></a></li>
                                <li><a href='#'><i><BsLinkedin/></i></a></li>
                                <li><a href='#'><i><BsInstagram/></i></a></li>
                            </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;