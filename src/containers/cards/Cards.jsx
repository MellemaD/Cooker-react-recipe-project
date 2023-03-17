import './cards.css';

export default Cards;

import React, {useContext} from 'react';
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import {RiHeartAddLine} from "react-icons/ri";
import {FaHeartBroken} from "react-icons/fa";
// import {AuthContext} from "../../context/AuthContext";
import {GlobalContext} from "../../context/GlobalState";

{/* TODO: Check if user is logged in, if not, heart doesn't work */}

// eslint-disable-next-line react/prop-types
function Cards({data}) {



    // const [error, toggleError] = useState(false);
    // const {isAuth} = useContext(AuthContext);
    // const isAuth = useContext( AuthContext )
    const {addFavourite,
        deleteFavourite,
        isFavourite, favourites} = useContext(GlobalContext)

    const handleSetFavourite = (event, recipe) => {
        event.preventDefault();
        // if (isAuth){
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
        // } else {
        //     // ! Need timer on error message
        //     toggleError(true)
        // }
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
                                <button
                                    onClick={(event) => handleSetFavourite(event, item.recipe)}
                                    className='top-right'>
                                     <span>
                                        {/* TODO: Check if user is logged in, if not, heart doesn't work */}
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
                            {/*{error &&*/}
                            {/*    <span>You need to be logged in to add to favourites</span>*/}
                            {/*}*/}
                        </div>
                    )
                })}
            </div>
        </div>
    );

}
