import React, {createContext, useState} from "react";


//* 1. createContext
export const GlobalContext = createContext({});

//* 2. GlobalProvider function with:
export const GlobalProvider = (props) => {

    //* 3. local storage key and useState for favourites and personalSelection
    const localStorageFavourites = "favourites"
    const localStoragePersonalSelection = "personalSelection"

    const [favourites, setFavourites] = useState([]);     // #fave used at favourite page to render faves through cards
    const [personalSelection, setPersonalSelection] = useState({
        isActivated: false,
        diets: [],
        healths: [],
    });     // # personalSelection used at sidebarForm to adjust the array
    // Not used elsewhere, because at sidebarForm, the onclick for pS will set
    // the values of the filters in the useState and thereby set them to checked

    // Can user still select other values and thereby de-select them?
    // Can the values be locked to checked when pS is on?
    // If user deselects pS, then all values should be removed from form

    //* 4. Try and catch to getItem from local Storage and check if it exists
    try {
        const storedFavourites = JSON.parse(localStorage.getItem(localStorageFavourites))

        if(storedFavourites && Array.isArray(storedFavourites)){
            setFavourites(storedFavourites);
        }
    } catch (error){
        console.log(error)
        // Dont log errors, send message
    }

    try {
        const storedSelection = JSON.parse(localStorage.getItem(localStoragePersonalSelection))

        if(storedSelection && Array.isArray(storedSelection)){
            setPersonalSelection(storedSelection);
        }
    } catch (error){
        console.log(error)
        // Dont log errors, send message
    }


    //* 5. A function to add to favourites (a max number of 20)  #used at cards
    // Needs to set to localStorage
    const addFavourite = (recipe) => {
        if(favourites.length <20 && !isFavourite(recipe)){

            setFavourites(prev => [...prev, recipe]);
            localStorage.setItem(localStorageFavourites, JSON.stringify(favourites));
            return '';
        } else{
            return "Sorry, there are too many favorites"
        }
    }


    //* 6. A function to remove from favourites   #used at cards
    const deleteFavourite = (recipe) => {
        // Don't mutate state in setState. Using previous value (array) we filter out
        // that which doesn't equal to "to be deleted" and set this as the new array
        let toBeDeleted = recipe;
        setFavourites(prev => prev.filter(favourite => favourite !== toBeDeleted))
        // LocalStorage.setItem, because setting the new array will also get rid of the toBeDeleted.
        localStorage.setItem(localStorageFavourites, JSON.stringify(favourites))
    }


    //* 7. A function to check if it is favourite (to decide which heart should be displayed and which action it should activate)
    // # used at cards
    function isFavourite(recipe) {

        let found = false;
        for (let i = 0; i<favourites.length; i++) {
            if (favourites[i].ID === recipe.ID){
                found = true;
                break;
            }
        }
        return found;
    }


    //* 8. A function to add to personalSelection  #used at profile
    // Needs to set to localStorage
    const addToPersonalSelection = (diets, healths) => {
        if (diets){
            setPersonalSelection({
                ...personalSelection,
                diets: [...personalSelection.diets, diets]
        })
        } if (healths){
            setPersonalSelection({
                ...personalSelection,
                healths: [...personalSelection.healths, healths]
            })
        }
    }

    //* 9. A function to remove from personalSelection #used at profile
    const removeFromPersonalSelection = (diets, healths) => {
        if (diets){
            let toBeDeleted = diets
            for (let i = 0; i <toBeDeleted.length; i++) {
                setPersonalSelection({
                    ...personalSelection,
                    diets: [...personalSelection.diets.filter(diet => diet !== toBeDeleted[i])]
                })
            }
        }
        if (healths){
            let toBeDeleted = healths
            for (let i = 0; i <toBeDeleted.length; i++) {
                setPersonalSelection({
                    ...personalSelection,
                    healths: [...personalSelection.healths.filter(health => health !== toBeDeleted[i])]
                })
            }
        }
    }


    //* 10. contextData and return global context
    const contextData = {
        addFavourite,
        deleteFavourite,
        isFavourite,
        addToPersonalSelection,
        removeFromPersonalSelection,
        favourites,
        setFavourites,
        personalSelection,
        setPersonalSelection,
    };

    return (
        <GlobalContext.Provider
            value={contextData}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </GlobalContext.Provider>
    )
}


