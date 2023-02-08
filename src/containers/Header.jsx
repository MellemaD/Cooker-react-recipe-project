import React from 'react';
import NavBar from "./navbar/NavBar";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import headerImg from '../assets/pexels-klaus-nielsen-6287486.jpg'

function Header() {
    // Header use useLocation to determine whether the user is on the homepage or not
    // If he is, then it will render an image on the home page

    const location = useLocation();


    return (


        <header>
            <NavBar>
            </NavBar>
            {location["pathname"] === '/' &&

                <section>
                        <Img src={headerImg} alt='Main image'/>

                </section>
            }
        </header>
    );
}


// No styled components here, only in components
const Img = styled.img`
  width: 100%;
  height: 750px;
 
`


export default Header;