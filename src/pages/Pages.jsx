import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";


import Homepage from "./homepage/Homepage";
import ProfilePage from "./profilepage/ProfilePage";
import SearchResults from "./searchresults/SearchResults";
import FavoriteList from "./favoritelist/FavoriteList";
import Authenticate from "./authenticate/Authenticate";
import Register from "./register/Register";

function Pages() {
    const location = useLocation();
    return (
        <>

            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Homepage/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/authenticate" element={<Authenticate/>} />
                <Route path="/favorite" element={<FavoriteList/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/results/" element={<SearchResults/>} />
            </Routes>
        </>
    );
}

export default Pages;