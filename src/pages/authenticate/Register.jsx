import React, {useEffect, useRef, useState} from 'react';
import {FaCheck, FaInfoCircle, FaTimes} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import axios from "axios";
import './authenticate.css'
import {BsFillPersonFill} from "react-icons/bs";

const USER_REGEX = /^[A-z][A-z0-9-_]{5,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;

const Register = () => {


    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() =>{
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit button is only thing enforcing REGEX, can be hacked
        // To be cautious:
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/auth/signup`,
                    {'username': user,
                        'email': email,
                        'password': pwd,
                    role: ['user']});

            console.log(response)
            setSuccess(true);

        } catch(err){
            if(!err?.response){
                setErrMsg('No Server Response');
            } else if(err.response?.status === 400){
                setErrMsg('Email or username already in use. Try a different one or login instead.')
            } else{
                setErrMsg('Registration failed');
            }
        }
    }

    return (
        <div className='outer-container'>
            {success ?
                (<section className='authenticate-section'>
                    <h1>Success!</h1>
                    <p>
                        <NavLink to='/authenticate'><i><BsFillPersonFill/></i> Sign in now!</NavLink>                    </p>
                </section>
                ) :
                (
            <section className='authenticate-section'>
                {errMsg &&
                    <p
                       ref={errRef}
                       className='err-msg'>
                        {errMsg}
                    </p>
                }
                <h1>Create an account</h1>
                <form className='authenticate-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        Username:
                        <span>
                            {validName && userFocus &&
                            <FaCheck className='valid'/>
                            }
                        </span>
                        <span>
                            {!validName && user &&
                            <FaTimes className='invalid' />
                            }
                        </span>
                    </label>
                    <input
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        // aria will help with screen reader
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    {userFocus && user && !validName &&
                        <p id='uidnote' className='instructions'>
                            <FaInfoCircle/>
                            6 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, underscores and hyphens allowed
                        </p>
                    }
                    <label htmlFor='email'>
                        Email:
                        <span>
                        {validEmail && email &&
                            <FaCheck className='valid'/>
                        }
                    </span>
                        <span>
                        {!validEmail && email &&
                            <FaTimes className='invalid'/>
                        }
                    </span>
                    </label>

                    <input
                        type='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? 'false' : 'true'}
                        aria-describedby='eidnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    {emailFocus  && !validEmail &&
                        <p id='eidnote' className='instructions'>
                            <FaInfoCircle/>
                            Must be a valid email.
                        </p>
                    }

                    <label htmlFor='password'>
                        Password:
                        <span>
                            {validPwd && pwdFocus &&
                                <FaCheck className='valid' />
                            }
                        </span>
                        <span>
                            {!validPwd && pwd &&
                                <FaTimes className='invalid'/>
                            }
                        </span>
                    </label>
                    <input
                        type="password"
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        // aria will help with screen reader
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    {pwdFocus  && !validPwd &&
                        <p id='pwdnote' className='instructions'>
                            <FaInfoCircle/>
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special character <br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    }

                    <label htmlFor='confirmPwd'>
                        Confirm Password:

                        {validMatch && matchPwd && pwdFocus &&
                            <span><FaCheck className='valid' /></span>
                        }
                        {!validMatch && matchPwd &&
                            <span><FaTimes className='invalid' /></span>
                        }

                        <input
                            type='password'
                            id='confirmPwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        { matchFocus && !validMatch &&
                            <p id='confirmnote' className='instructions'>
                                Must match the first password input field.
                            </p>
                        }
                    </label>
                    <button disabled={!validName || !validPwd || !validMatch}>
                        {/*Since it's the only button in the form, it is automatically submit, also doesn't need onClick*/}
                        Sign up!
                    </button>
                </form>
                <p className='redirect'>
                    Already have an account? <br />
                    <span>
                        <li><NavLink to= '/authenticate'>Log in here!</NavLink></li>
                    </span>
                </p>

            </section>)}
        </div>
    );
}

export default Register;