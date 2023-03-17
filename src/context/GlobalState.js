import React, {createContext, useEffect, useState} from "react";


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
        calorieRanges: [],
        calorieBounds: [],
        cuisineTypes: [],
        mealTypes: [],
    }) // #pS used at profile to set and at results to set to filtersForm

    //* 4. Try and catch inside useEffect to getItem from local Storage and check if it exists
    useEffect( () => {
        try {
            const storedFavourites = JSON.parse(localStorage.getItem(localStorageFavourites))

            if(storedFavourites && Array.isArray(storedFavourites)){
                setFavourites(storedFavourites);
            }
        } catch (error){
            console.log(error)
            // Dont log errors, send message
        }

    }, [] )

    useEffect( () => {
        try {
            const storedSelection = JSON.parse(localStorage.getItem(localStoragePersonalSelection))

            if(storedSelection){
                setPersonalSelection(storedSelection);
            }
        } catch (error){
            console.log(error)
            // Dont log errors, send message
        }
    }, [] )



    //* 5. A function to add to favourites (a max number of 20)  #used at cards
    //  Needs to set to localStorage
        const addFavourite = (recipe, ID, label, ingredientLines, calories, image, link) => {
        console.log(ID, label)
        console.log(favourites.length)
        if(favourites.length <20 && !isFavourite(ID)){
            // Added "recipe:" to make mapping at Cards easier
            const addRecipe =
                {
                    recipe: {
                        ID: ID,
                        label: label,
                        ingredientLines: ingredientLines,
                        calories: calories,
                        image: image,
                        link: link,
                    }
                }
            // Setting item to localStorage right after setFavourites will still use the previous value of favourites.
            // Therefore, I need to create a new const holding the value and use that to set.
            setFavourites(prev => {
                    const newFavourites = [
                        ...prev,
                        addRecipe
                    ];
                    localStorage.setItem(localStorageFavourites, JSON.stringify(newFavourites));
                    return newFavourites
                })
        } else{
            return "Sorry, there are too many favorites"
        }

    }


    //* 6. A function to remove from favourites   #used at cards
    // eslint-disable-next-line no-unused-vars
    const deleteFavourite = (recipe) => {
        // Don't mutate state in setState. Using previous value (array) we filter out
        // that which doesn't equal to "to be deleted" and set this as the new array
        let toBeDeleted = recipe;
        setFavourites(prev => {
            const newFavourites = prev.filter(x => x.recipe.label !== toBeDeleted.label);
            console.log(newFavourites)
            // LocalStorage.setItem, because setting the new array will also get rid of the toBeDeleted.
            localStorage.setItem(localStorageFavourites, JSON.stringify(newFavourites)) ;
            return newFavourites
        })
    }


    //* 7. A function to check if it is favourite (to decide which heart should be displayed and which action it should activate)
    // # used at cards
    // eslint-disable-next-line no-unused-vars
    function isFavourite(label) {
        if(label){
            const myFavourite = favourites.find((x) => x.recipe.ID === label)
            return !!myFavourite;
        }
    }


    //* 8. A function to add to personalSelection  #used at /profile/ filtersForm
        //Changed 'addTo' and 'deleteFrom' to 'save'. I can use another component for these, only need to save to localStorage
    const savePersonalSelection = (newPersonalSelection) => {
        localStorage.setItem(localStoragePersonalSelection, JSON.stringify(newPersonalSelection));
    }

    //* 9. A function to check if personalSelection is empty (less code at required spots)
    function isPersonalSelectionEmpty(personalSelection){
        return personalSelection.diets.length === 0 &&
            personalSelection.healths.length === 0 &&
            personalSelection.calorieBounds.length === 0 &&
            personalSelection.cuisineTypes.length === 0 &&
            personalSelection.mealTypes.length === 0;
    }



    //* 10. contextData and return global context
    const contextData = {
        addFavourite,
        deleteFavourite,
        isFavourite,
        savePersonalSelection,
        isPersonalSelectionEmpty,
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


