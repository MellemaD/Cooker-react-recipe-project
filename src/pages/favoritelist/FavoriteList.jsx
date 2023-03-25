import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalState";
import Cards from "../../containers/cards/Cards";
import hungryImg from '../../assets/hungry.png'
import './favoriteList.css'
import {AuthContext} from "../../context/AuthContext";

//* 1. If user is not logged in, it needs to display "You should be logged in to make use of favourites"
//* 2. If user does not have a favouriteList, it needs to display an image with text
//* 3. If user has a list, it needs to be displayed through grids

function FavoriteList() {
    const {favourites} = useContext(GlobalContext)
    const {isAuth} = useContext(AuthContext)



    return (
        <div>
            {isAuth ?
                <div className={favourites.length === 0 ? 'outer-container-empty' : 'outer-container-saved'}>

                    <h2>Saved Recipes ({favourites.length})</h2>
                    <div className={favourites.length === 0 ? 'container' : ''}>

                        {favourites.length > 0 ?
                            <Cards data={favourites}/> :
                            <div className={favourites.length === 0 ? 'fave' : ''}>
                                <img src={hungryImg} alt='Empty Favourite list image'/>
                                <p className={favourites.length === 0 ? 'position' : ''}>My Stomachs Growling
                                    <br/> Add some recipes</p>
                            </div>
                        }

                    </div>
                </div> :
                <p>
                    You should be logged in to make use of favourites!
                </p>
            }
        </div>
    );
}

export default FavoriteList;