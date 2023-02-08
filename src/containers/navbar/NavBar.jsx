import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import './navBar.css'
import {ReactComponent as Logo} from '../../assets/LOGO-RECIPE-2.svg'
import {BsFillPersonFill} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";
import {FaBars, FaSearch, FaTimes} from "react-icons/fa";
import SearchBar from "../../components/SearchBar";

function NavBar() {

    // TODO: Create a function that checks whether the user is logged in or not
    // ! Check if user is logged in
    let loggedIn = false;

    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/results/');
    };


    return (
        <>
            <input className='hidden' type="checkbox" id='check'/>
            <nav>
                <NavLink to='/'><Logo className='icon'/></NavLink>
                <div className='search-box'>
                    <SearchBar submitHandler={submitHandler}/>
                    <span ><i><FaSearch onClick={submitHandler}/></i> </span>
                </div>
                <ul>
                    <li><NavLink to= {loggedIn ? '/profile' : '/authenticate'}><i> <BsFillPersonFill/> </i>{loggedIn ? 'My Profile' : 'Log in/Sign up'}</NavLink></li>
                    <li><NavLink to={loggedIn ? '/favorite' : '/authenticate'}><i><AiFillHeart/></i> Favorites</NavLink></li>
                    <li><NavLink to='/themes'>3</NavLink></li>
                </ul>
                <label htmlFor='check' className='bar'>
                    <span id='bars' ><i><FaBars/></i> </span>
                    <span id='times'><i><FaTimes/></i> </span>
                </label>
            </nav>
        </>
    );
}

export default NavBar;