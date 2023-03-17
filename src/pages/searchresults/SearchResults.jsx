import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchRecipeForm from "../../forms/SearchRecipeForm";
import Cards from "../../containers/cards/Cards";
import FiltersForm from "../../forms/filterForm/FiltersForm";
import CreateURI from "../../helpers/CreateURI";

function SearchResults() {

// * Later
    // TODO: Using params, I want to update searchQuery through a functional search bar in the navbar too
    // TODO: Implement a way to set in order the results
    // TODO: Use Pagination (env) to guide user to next page


    // * 1. useStates
        // search query for taking the query from the search form
        // result data is for setting the results from API requests
        // error to toggle error and based on its state send an error page
        // searchTrigger to trigger API requests when user presses search. This avoids excessive requests with every change in filter
    const [searchQuery, setSearchQuery] = useState('');
    const [resultData, setResultData] = useState([]);
    const [error, toggleError] = useState(false);
    const [searchTrigger, toggleSearchTrigger] = useState(false);


    // * 4. Add the other states (sidebarForm) which get passed on to the ResultsidebarForm
    const [sidebarForm, setSidebarForm] = useState({
        diets: [],
        calorieRanges: [],
        calorieBounds: [],
        healths: [],
        cuisineTypes: [],
        mealTypes: [],

    })

    // * 5. Add state for the message of recipes found
    const [recipesFoundMessage, setRecipesFoundMessage] = useState('');



    // * 6. create a helper to create the URI? -> CreateURI.jsx





        // * 3.  useEffect in which we call fetchResults based on changes of (for now) searchQuery.
            //and click on 'search'
     useEffect(() => {

            // * 2. try/catch, await axios with api
            async function fetchResults(){
                toggleError(false);

                try{
                    // eslint-disable-next-line no-unused-vars
                    const result = await axios.get(
                        // process is not defined, need to disable eslint
                        // eslint-disable-next-line no-undef
                        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}${CreateURI(sidebarForm)}`)
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
                    case 10000:{
                        setRecipesFoundMessage('9999+ recipes found');
                        break;
                    }
                    default: {
                        break;
                    }

                }
            } catch(err){
                console.error(err);
                toggleError(true);
            }
        }

        if (searchQuery){
          void fetchResults();
        }
        }, [searchQuery, searchTrigger] )


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
                toggleSearchTrigger={toggleSearchTrigger}
                searchTrigger={searchTrigger}
            />


            {/*  The sidebar form:*/}
            <h4>SideBarForm</h4>
            <FiltersForm
                state={sidebarForm}
                setState={setSidebarForm}
                text={['Diet: ', 'Health:', 'Cuisine Types:', 'Meal Types:', 'Amount of Calories:' ]}
                profile={false}
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