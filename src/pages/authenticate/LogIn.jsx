/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState, useContext} from 'react';
import {NavLink} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {AiFillHome} from "react-icons/ai";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './authenticate.css'

function LogIn() {

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
     // To empty out error message when user is changing user or password
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // * 3. Create handleSubmit which handles the submit event basic
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        try{

            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                username: user,
                password: pwd,
            });
            login(response.data.accessToken)

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
        <div className='outer-container'>
            {success ? (
                <section className='authenticate-section'>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <NavLink to='/'><i><AiFillHome/></i> Take Me Home!</NavLink>
                    </p>
                </section>
            ): (


            <section className='authenticate-section'>
                {errMsg &&
                <p ref={errRef}
                    aria-live='assertive'
                >
                    {errMsg}
                </p>}

                <h1>Good to see you again!</h1>

                <form className='authenticate-form' onSubmit={handleSubmit}>
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

                <p className='redirect'>
                    Need an account?
                <span><NavLink to='/register'><i> <BsFillPersonFill/> </i>Sign up here!</NavLink></span>
                </p>
            </section>
            )}
        </div>
    );
}

export default LogIn;