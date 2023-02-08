import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cards from "../containers/cards/Cards";

function Popular() {

    // * 1. Create useState for error and for data
    const [popular, setPopular] = useState([]);
    const [error, toggleError] = useState(false);


    // * 6. useEffect that immediately runs API request upon mounting
    useEffect(() => {
        void getPopular()
    },[]);

// * 2. Async function with a try and catch
    async function getPopular(){
        toggleError(false);

        try {

            // * 3. Add a check that gets localStorage
                // Local storage to avoid using to many API requests
            const check = localStorage.getItem("popular");

                // If check has a value, we turn that into an array
                // ((Local Storage only contains strings))
            if (check) {
                setPopular(JSON.parse(check).slice(0,6)); // - parse = array
            } else {

            // * 4. If localStorage is empty, API request follows
                // eslint-disable-next-line no-undef
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=popular&app_id=${process.env.REACT_APP_API_ID}app_key=${process.env.REACT_APP_API_KEY}&imageSize=REGULAR`);
                console.log(response.data);

                // ! add functionality to filter out recipes without image
                setPopular(response.data.hits.slice(0, 6));

            // * 5. Set localStorage as results, stringified
                localStorage.setItem('popular', JSON.stringify(response.data.hits));

            }


        }
        catch(err){
            console.error(err);
            toggleError(true);
        }
        console.log(popular.data);

    }





    return (
        <div>
            {/* error message*/}
            {error &&
                <span>
                Hottest picks has failed loading
            </span>}
            <h2>Hottest picks:</h2>
            <Cards data={popular}/>


        </div>
    );

}

export default Popular;