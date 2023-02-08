import React from 'react';
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin} from "react-icons/bs";
import  './footer.css'

function Footer() {

    // TODO: Create a link to Github
    // TODO: Think of a link for 3rd li
    // TODO: Have Random recipes lead to a search request for random recipes
    // TODO: Personal note

    return (
        <footer className='footer'>
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Navigate To</h4>
                            <ul>
                                <li><a href='#'>Authentication</a></li>
                                <li><a href='#'>My favorites </a></li>
                                <li><a href='#'>??</a></li>
                                <li><a href='#'>Random recipes</a></li>
                            </ul>
                    </div>
                    <div className="footer-col">
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