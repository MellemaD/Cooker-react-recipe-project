import React from "react";
import {Link, useParams} from "react-router-dom";
import "./error.css"

function error() {
    let params = useParams();
    let err;

    switch (params.type) {
    case 'unauthorized':
        err = "You need to be logged in to do this.";
        break;
    case 'maximum':
        err = "You have reached the maximum amount that you can save. If you want to save more recipes, make space by getting rid of others.";
        break;
    }


    return (
        <>
            <div className="message">
                <h1>{err} To go home, click <Link to="/">here.</Link></h1>
            </div>
        </>
    );
}

export default error;