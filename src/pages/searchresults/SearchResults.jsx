/*
Pagination
To obtain the next page, the API user should follow the “next” link from the “_links” section in the result JSON, which looks like this:

"_links" : {
    "next" : {
        "title" : "Next page",
            "href" : "https://api.edamam.com/api/food-database/v2/parser?..."
    }
}*/

import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchRecipeForm from "../../forms/SearchRecipeForm";
import Cards from "../../containers/cards/Cards";
import ResultsSidebarForm from "../../forms/resultsSidebarForm/ResultsSidebarForm";

function SearchResults() {

// ! Near
    // TODO: Add the other useStates to deps-useEffect
    // TODO: Create a helper function that will return the URI based on the state of the sideBar
    // TODO: Check whether the user is logged in and whether he's using personalSelections
// * Later
    // TODO: Using params, I want to update searchQuery through a functional search bar in the navbar too
    // TODO: Implement a way to set in order the results
    // TODO: Use Pagination (top) to guide user to next page


    // * 1. useStates
        // search query for taking the query from the search form
        // result data is for setting the results from API requests
        // error to toggle error and based on its state send an error page
    const [searchQuery, setSearchQuery] = useState('');
    const [resultData, setResultData] = useState([]);
    const [error, toggleError] = useState(false);


    // * 4. Add the other states (sidebarForm) which get passed on to the ResultsidebarForm
    const [sidebarForm, setSidebarForm] = useState({
        // * Connected to logged in and personalSelections:
        diets: [],
        // ! Locked if not logged in:
        personalSelections: true,
        calorieRanges: [],
        calorieBounds: [],
        // * Connected to logged in and personalSelections:
        healths: [],
        cuisineTypes: [],
        mealTypes: [],
        timeRanges: [],
        timeBounds: [],
    })

    // * 5. Add state for the message of recipes found
    const [recipesFoundMessage, setRecipesFoundMessage] = useState('');



    // * 6. create a helper to create the URI?
        // const [uri, setUri] = useState({});






    // * 3.  useEffect in which we call fetchResults based on changes of (for now) searchQuery.

    // ! add to that the added States
    useEffect(() => {

        // * 2. try/catch, await axios with api
        async function fetchResults(){
            toggleError(false);

            try{
                // eslint-disable-next-line no-unused-vars
                const result = await axios.get(
                    // process is not defined, need to disable eslint
                    // eslint-disable-next-line no-undef
                    `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`)
                    /*.then(result => {*/
                    setResultData(result.data.hits);


                // Create recipesFoundMessage to display to the user how many results were found
                 setRecipesFoundMessage(`Found ${result.data.count} Recipes`)
                switch(result.data.count) {
                    case 0: {
                        setRecipesFoundMessage('No recipes found');
                        break;
                    }
                    case 1: {
                        setRecipesFoundMessage( 'Only one recipe found');
                        break;
                    }
                    default: {
                        break;
                    }

                }

                    console.log(result);

                    console.log(resultData);


            } catch(err){
                console.error(err);
                toggleError(true);
            }
        }

        if (searchQuery){
          fetchResults();
        }
        }, [searchQuery])


    return (


        <div>

            <h3>Search Results</h3>

            {/* error message*/}
            {error &&
                <span>
                    Oops, the search was unsuccessful
            </span>}

            <SearchRecipeForm
                setQueryHandler={setSearchQuery}
            />


            {/*  The sidebar form:*/}
            <h4>SideBarForm</h4>
            <ResultsSidebarForm
                sidebarFormState={sidebarForm}
                setSidebarFormState={setSidebarForm}
            />

            <h4>Amount found</h4>
            <div>{recipesFoundMessage}</div>

            {resultData.length > 0 &&
                <Cards data={resultData} />

            }
        </div>
    );
}


export default SearchResults;