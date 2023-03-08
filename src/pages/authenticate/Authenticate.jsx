/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState, useContext} from 'react';
import {NavLink} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {AiFillHome} from "react-icons/ai";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


const LOGIN_URL = '/api/auth/signin';
const BASE_URL = 'https://frontend-educational-backend.herokuapp.com';

function Authenticate() {

    //* 4. Create useContext + AuthContext to be able to use the login function

    const { login } = useContext( AuthContext )

    //* 1. Create useStates and useRef
        // To set focus. Also helps with screen reader
    const userRef = useRef();
    const errRef = useRef();

        // input related useStates
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
        // For the error message
    const [errMsg, setErrMsg] = useState('');
        // To see if user is successfully authenticated
    const [success, setSuccess] = useState(false);

    // * 2. Create useEffects
        // To set focus upon mounting, so deps will be an empty array

        // To empty out error message when user is changing user or password
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // * 3. Create handleSubmit which handles the submit event basic
    const handleSubmit = async (e) => {
        e.preventDefault();


        try{

            const response = await axios.post(`${BASE_URL + LOGIN_URL}`, {
                "username": user,
                "password" : pwd,
            });
            console.log(JSON.stringify(response));

        setUser('');
        setPwd('');
        setSuccess(true);


        } catch (err){
            console.log(err);
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if(err?.response.status === 400){
                setErrMsg('Missing Username or Password')
            } else if(err?.response.status === 401){
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <navLink to='/'><i><AiFillHome/></i>Home</navLink>
                    </p>
                </section>
            ): (


            <section>
                {errMsg &&
                <p ref={errRef}
                    aria-live='assertive'
                >
                    {errMsg}
                </p>}
                <h1>Sign in</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required

                        // Don't need aria-invalid/describedby here because user should know its information
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Log in</button>
                </form>

                <p>
                    Need an account?
                <span><NavLink to='/register'><i> <BsFillPersonFill/> </i>Sign up here!</NavLink></span>
                </p>
            </section>
            )}
        </>
    );
}

export default Authenticate;