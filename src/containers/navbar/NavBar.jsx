import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import './navBar.css'
import {ReactComponent as Logo} from '../../assets/LOGO-RECIPE-2.svg'
import {BsFillPersonFill} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";
import {FaBars, FaSearch, FaTimes} from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {


    const {isAuth, logout} = useContext(AuthContext)

    const navigate = useNavigate();

    function handleLogout(){
        if (isAuth){
            logout();
        }
    }

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
                    <li><NavLink to= {isAuth ? '/profile' : '/authenticate'}><i> <BsFillPersonFill/> </i>{isAuth ? 'My Profile' : 'Log in/Sign up'}</NavLink></li>
                    <li><NavLink to={isAuth ? '/favorite' : '/error/unauthorized'}><i><AiFillHeart/></i> Favorites</NavLink></li>
                    {isAuth &&
                        <li><NavLink
                            onClick={(event => {handleLogout(event)})}
                            to='/authenticate'>Log Out</NavLink>
                        </li>
                    }
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