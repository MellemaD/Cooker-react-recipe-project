import './cards.css';

export default Cards;

import React, {useContext} from 'react';
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {RiHeartAddLine} from "react-icons/ri";
import {FaHeartBroken} from "react-icons/fa";
import {GlobalContext} from "../../context/GlobalState";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";



// eslint-disable-next-line react/prop-types
function Cards({data}) {



    const {isAuth} = useContext(AuthContext)
    const {addFavourite,
        deleteFavourite,
        isFavourite, favourites} = useContext(GlobalContext)

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/authenticate')
    }

    const handleSetFavourite = (event, recipe) => {
        event.preventDefault();
            if(!isFavourite(recipe.label)){
                addFavourite(recipe.label,
                    recipe.label,
                    recipe.label,
                    recipe.ingredientLines,
                    recipe.calories,
                    recipe.image,
                    recipe.url
            )
                return ''
            } else if(isFavourite(recipe.label)){
                deleteFavourite(recipe)
                console.log(favourites);
                return ''
            }
    }

    return (
        <div>
            <div className='container'>
                {/* eslint-disable-next-line react/prop-types */}
                {data.map((item) => {
                    return (
                        <div className="card" key={item.recipe.url}>
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
                            </a>
                            <div>
                                <button
                                    onClick={(event) =>
                                    {isAuth ? handleSetFavourite(event, item.recipe):
                                    handleNavigate()}}
                                    className='heart'>
                                     <span>
                                        {isFavourite(item.recipe.label) ? <AiFillHeart/> : <AiOutlineHeart/>}
                                    </span>

                                    <span>
                                        {/*hover: */}
                                        {isFavourite(item.recipe.label) ? <FaHeartBroken/> : <RiHeartAddLine/> }
                                    </span>

                                </button>
                                <a href={item.recipe.url} target='_blank' rel="noreferrer">

                                <h2>{item.recipe.label}</h2>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}
