import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";


import Homepage from "./homepage/Homepage";
import ProfilePage from "./profilepage/ProfilePage";
import SearchResults from "./searchresults/SearchResults";
import FavoriteList from "./favoritelist/FavoriteList";
import LogIn from "./authenticate/LogIn";
import Register from "./authenticate/Register";
import Error from "./error/Error";

function Pages() {
    const location = useLocation();
    return (
        <>

            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Homepage/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/authenticate" element={<LogIn/>} />
                <Route path="/favorite" element={<FavoriteList/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/results/" element={<SearchResults/>} />
                <Route path="/error/:type" element={<Error/>} />
            </Routes>
        </>
    );
}

export default Pages;