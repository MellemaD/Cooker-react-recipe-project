import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import React from 'react';

//* 1. createContext
export const AuthContext = createContext( {} );

//* 2. GlobalProvider function with:
// eslint-disable-next-line react/prop-types
function AuthContextProvider( { children } ) {

    //* 3. local storage key for JWT token, useState for authentication and useNavigate
    const storedTokenKey = 'token';

    const [ auth, setAuth ] = useState( {
        isAuth: false,
        user: null,
        status: "pending"
    } );
    const navigate = useNavigate()

    //* 4. useEffect in which we:
    useEffect( () => {
        // get JWT from storage
        const storedToken = localStorage.getItem( storedTokenKey )


        // Check if it has a token, if not we get user data
        if ( storedToken ) {
            const decodedToken = jwt_decode( storedToken )

            // calculation if token hasn't expired yet
            if ( Math.floor( Date.now() / 1000 ) < decodedToken.exp ) {
                console.log( "The user is still logged in" )
                void fetchUserData( storedToken, decodedToken.sub )
            } else  {
                // If so, remove token
                console.log( "The token has expired" )
                localStorage.removeItem( 'token' )
            }
        } else {
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            } )
        }
    }, [] )

    //* 5. A login function
    function login( jwt ) {
        console.log( "The user is logged in" )
        localStorage.setItem( 'token', jwt )
        const decodedToken = jwt_decode( jwt );

        void fetchUserData( jwt, decodedToken.sub, "/profile" )
    }

    //* 6. An async function that fetches the user data
    async function fetchUserData( jwt, id, redirect ) {
        try {
            const response = await axios.get( `http://localhost:3000/600/users/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ jwt }`,
                }
            } )
            setAuth( {
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                    username: response.data.username
                },
                status: "done"
            } )
            if ( redirect ) {
                navigate( redirect )
            }
            console.log( response )
        } catch ( e ) {
            console.error( e )
            setAuth( {
                ...auth,
                status: "done"
            } )
        }
    }


    //* 7. A logout function
    function logout() {
        console.log( "The user is logged out" )
        localStorage.removeItem( 'token' )
        setAuth( {
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        } )
        navigate( "/login" )
    }


    //* 8. contextData and return global context
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={ contextData }>
            { auth.status === "done" ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
