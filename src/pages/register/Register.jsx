import React, {useEffect, useRef, useState} from 'react';
import {FaCheck, FaInfoCircle, FaTimes} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{5,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
// ! const REGISTER_URL = '/register';
// const baseUrl = 'https://frontend-educational-backend.herokuapp.com'

const Register = () => {

    // value={user} Could use value attribue here to input elements
    // Handy for clearing inputs upon submitting
    // Not necessary here, deffo with login

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
            console.log(user, pwd)
            const response = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/auth/signup`,
                    {'username': user,
                        'email': email,
                        'password': pwd,
                    role: ['user']});

            console.log(response)
            setSuccess(true);
            // ! Clear input fields (?)

        } catch(err){
            console.error(err)
            if(!err?.response){
                setErrMsg('No Server Response');
            } else if(err.response?.status === 400){
                setErrMsg('email or username in use...')
            } else{
                setErrMsg('Registration failed');
            }
        }
    }

    return (
        <>
            {success ?
                (<section>
                    <h1>Success!</h1>
                    <p>
                        <span>Link to wherever </span>
                    </p>
                </section>
                ) :
                (
            <section>
                {errMsg &&
                    <p
                       ref={errRef}
                       className='err-msg'
                       aria-live='assertive' /* helps with screenreader */ >
                        {errMsg}
                    </p>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        Username:
                        <span>
                            {validName && userFocus &&
                            <FaCheck/>
                            }
                        </span>
                        <span>
                            {!validName && user &&
                            <FaTimes/>
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
                        <p id='uidnote'>
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
                            <FaCheck/>
                        }
                    </span>
                        <span>
                        {!validEmail && email &&
                            <FaTimes/>
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
                        <p id='eidnote'>
                            <FaInfoCircle/>
                            Must be a valid email.
                        </p>
                    }




                    <label htmlFor='password'>
                        Password:
                        <span>
                            {validPwd && pwdFocus &&
                                <FaCheck/>
                            }
                        </span>
                        <span>
                            {!validPwd && pwd &&
                                <FaTimes/>
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
                        <p id='pwdnote'>
                            <FaInfoCircle/>
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number and a special character <br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    }

                    <label htmlFor='confirmPwd'>
                        Confirm Password:

                        {validMatch && matchPwd && pwdFocus &&
                            <span><FaCheck/></span>
                        }
                        {!validMatch && matchPwd &&
                            <span><FaTimes/></span>
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
                            <p id='confirmnote'>
                                Must match the first password input field.
                            </p>
                        }
                    </label>
                    <button disabled={!validName || !validPwd || !validMatch}>
                        {/*Since it's the only button in the form, it is automatically submit, also doesn't need onClick*/}
                        Sign up!
                    </button>
                </form>
                <p>
                    Already have an account? <br />
                    <span>
                        <li><NavLink to= '/authenticate'>Log in here!</NavLink></li>
                    </span>
                </p>

            </section>)}
        </>
    );
}

export default Register;