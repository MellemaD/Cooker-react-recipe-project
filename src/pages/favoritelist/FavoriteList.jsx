import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalState";
import Cards from "../../containers/cards/Cards";
import hungryImg from '../../assets/hungry.png'

//* 1. If user is not logged in, it needs to display "You should be logged in to make use of favourites"
    // Even though user can't navigate here without being logged in, he could by typing it in the browser
//* 2. If user does not have a favouriteList, it needs to display an image with text
    // It needs to check if user has a list of length 1 or more
//* 3. If user has a list, it needs to be displayed through grids
    // It needs to check length of list and display by calling cards

function FavoriteList() {
    const {favourites} = useContext(GlobalContext)



    return (
        <>

            <h3>Saved Recipes ({favourites.length})</h3>
            <div>

                {favourites.length > 0 ?
                <Cards data={favourites}/> :
                    <div>
                        <img src={hungryImg} alt='Empty Favourite list image'/>
                        <p>My Stomachs Growling</p>
                        <p>Add some recipes</p>
                    </div>
                }

            </div>
        </>
    );
}

export default FavoriteList;