import './cards.css';

export default Cards;

// I have decided to use a link leading to the url/website of the actual recipe
// as part of the data, it doesn't actually show a recipe, only ingredients
// and nutrients

import React from 'react';
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {RiHeartAddLine} from "react-icons/ri";
import {FaHeartBroken} from "react-icons/fa";

// TODO: create functionality/useState to check if person is logged in and if recipe is favorite already
// TODO: Create onClick functionality that allows user to save recipes. (( What does he save? Recipe ID? The link in the object in an array and favorites maps these and requests these?))
//
{/* TODO: Check if user is logged in, if not, heart doesn't work */}
{/* TODO: Add onClick functionality that adds to favorite page */}
const isFavorite = false;

// eslint-disable-next-line react/prop-types
function Cards({data}) {
    return (
        <div>
            <div className='container'>
                {/* eslint-disable-next-line react/prop-types */}
                {data.map((item) => {
                    return (
                        <div className="card" key={item.recipe.calories}>
                            <a href={item.recipe.url} target='_blank' rel="noreferrer">
                                <img src={item.recipe.image} alt={item.recipe.label}/>
                                <div className='content'>

                                    <p>{Math.round(item.recipe.calories)} Calories</p>
                                    <ul>{item.recipe.ingredientLines.slice(0,5).map((ingredient) =>{
                                        return (
                                            <li key={ingredient}>{ingredient}</li>
                                        )
                                    })}
                                    </ul>
                                    <span>...</span>
                                </div>
                                <button onClick={''} className='top-right'>

                                     <span>
                                        {/* TODO: Check if user is logged in, if not, heart doesn't work */}
                                        {/* TODO: Add onClick functionality that adds to favorite page */}
                                        {isFavorite ? <AiFillHeart/> : <AiOutlineHeart/>}
                                    </span>

                                    <span>
                                        {/*hover: */}
                                        {isFavorite ? <FaHeartBroken/> : <RiHeartAddLine/> }
                                    </span>

                                </button>

                                <h2>{item.recipe.label}</h2>

                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}
