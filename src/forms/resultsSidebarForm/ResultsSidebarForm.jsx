/* eslint-disable react/prop-types */
import React  from 'react';
import './resultsSidebarForm.css'




function ResultsSidebarForm({    sidebarFormState,
                                 setSidebarFormState
                             }) {


// ! maybe change the values to "&diet=... so that they're ready for URI"

    // #1 Create all the arrays of values to map over and display

    const diets = [
        { value: 'balanced', display: 'Balanced' },
        { value: 'high-fiber', display: 'High Fiber' },
        { value: 'high-protein', display: 'High Protein' },
        { value: 'low-carb', display: 'Low Carb' },
        { value: 'low-fat', display: 'Low Fat' },
        { value: 'low-sodium', display: 'Low Sodium' },
    ];


    const healths = [
        { value: 'alcohol-free', display: 'Alcohol-free' },
        { value: 'dairy-free', display: 'Dairy-free' },
        { value: 'egg-free', display: 'Egg-free' },
        { value: 'fish-free', display: 'Fish-free' },
        { value: 'gluten-free', display: 'Gluten-free' },
        { value: 'keto-friendly', display: 'Keto-friendly' },
        { value: 'kosher', display: 'Kosher' },
        { value: 'low-sugar', display: 'Low Sugar' },
        { value: 'paleo', display: 'Paleo' },
        { value: 'peanut-free', display: 'Peanut-free' },
        { value: 'pork-free', display: 'Pork-free' },
        { value: 'shellfish-free', display: 'Shellfish-free' },
        { value: 'vegan', display: 'Vegan' },
        { value: 'vegetarian', display: 'Vegetarian' },
    ];



    const cuisineTypes = [
        { value: 'american', display: 'American' },
        { value: 'asian', display: 'Asian' },
        { value: 'british', display: 'British' },
        { value: 'greek', display: 'Greek' },
        { value: 'mexican', display: 'Mexican' },
        { value: 'indian', display: 'Indian' },
        { value: 'mediterranean', display: 'Mediterranean' },

    ];

    const mealTypes = [
        { value: 'breakfast', display: 'Breakfast' },
        { value: 'brunch', display: 'Brunch' },
        { value: 'lunch/dinner', display: 'Lunch/Dinner' },
        { value: 'snack', display: 'Snack' },
    ];




   const cookingTimeRangesOptions = [
       { value: '<15',
           display: '< 15mins',
           bounds: { min: 0, max: 15 } },
       {
           value: '<30',
           display: '< 30mins',
           bounds: { min: 0, max: 30 },
       },
       {
           value: '30-60',
           display: '30 - 60mins',
           bounds: { min: 30, max: 60 },
       },
       {
           value: '60+',
           display: '> 1 hour',
           bounds: { min: 60 },
       },
   ];


   const calorieAmountRangesOptions = [

       // Calories under..?
       // Bulking friendly..?

       {
           value: '<400',
           display: '<400',
           bounds: { max: 400 },
       },
       {
           value: '400-600',
           display: '400 - 600',
           bounds: {min: 400, max: 600 },
       },
       {
           value: '600-800',
           display: '600 - 800',
           bounds: { min: 600, max: 800 },
       },
       {
           value: '800+',
           display: '800+',
           bounds: { min: 800 },
       },

   ];




    // * #2 Create handle functions to make changes to the states


    /*const handlePersonalSelectionChange = (checked) => {
        console.log(checked);
        ! TODO: Check if user logged in, use user's personal selection and set diet and healths
        setSidebarFormState((prevState) => {
            return { ...prevState, personalSelection: !prevState.personalSelection };
        });
    };*/




    //  With handle functions, when pushing into array it should add "&${display}=value"
        //  When unchecked, it should remove the value from the array


    const handleDietsSelect = (e, option) => {
        console.log(e.target.checked, option);
        if (e.target.checked) {
            setSidebarFormState((prevState) => {
                const diets = [...prevState.diets];
                diets.push(option);
                return { ...prevState, diets };
            });
        } else {
            setSidebarFormState((prevState) => {
                return {
                    ...prevState,
                    diets: prevState.diets.filter((diet) => option !== diet),
                };
            });
        }
        console.log(sidebarFormState);
    };

    const handleHealthsSelect = (e, option) => {
        console.log(e.target.checked, option);
        if (e.target.checked) {
            setSidebarFormState((prevState) => {
                const healths = [...prevState.healths];
                healths.push(option);
                return { ...prevState, healths };
            });
        } else {
            setSidebarFormState((prevState) => {
                return {
                    ...prevState,
                    healths: prevState.healths.filter(
                        (health) => option !== health
                    ),
                };
            });
        }
    };



    const handleCuisineTypeSelect = (e, option) => {
        console.log(e.target.checked, option);
        if (e.target.checked) {
            setSidebarFormState((prevState) => {
                const cuisineTypes = [...prevState.cuisineTypes];
                cuisineTypes.push(option);
                return { ...prevState, cuisineTypes };
            });
        } else {
            setSidebarFormState((prevState) => {
                return {
                    ...prevState,
                    cuisineTypes: prevState.cuisineTypes.filter((cuisineType) => option !== cuisineType),
                };
            });
        }
    };



    const handleMealTypeSelect = (e, option) => {
        console.log(e.target.checked, option);
        if (e.target.checked) {
            setSidebarFormState((prevState) => {
                const mealTypes = [...prevState.mealTypes];
                mealTypes.push(option);
                return { ...prevState, mealTypes };
            });
        } else {
            setSidebarFormState((prevState) => {
                return {
                    ...prevState,
                    mealTypes: prevState.mealTypes.filter((mealType) => option !== mealType),
                };
            });
        }
    };


    const handleCookingTimeRangesSelect = (e, option, bounds) => {
        console.log(e.target.checked, option, bounds);
        if (e.target.checked) {
            setSidebarFormState((prevState) => {
                const timeRanges = [...prevState.timeRanges];
                timeRanges.push(option);

                const timeBounds = [...prevState.timeBounds];
                timeBounds.push(bounds.min);
                timeBounds.push(bounds.max);

                const newFormState = {
                    ...prevState,
                    timeRanges,
                    timeBounds,
                };
                console.log(newFormState);
                return newFormState;
            });
        } else {
            setSidebarFormState((prevState) => {
                const newFormState = {
                    ...prevState,
                    timeRanges: prevState.timeRanges.filter(
                        (timeRange) => option !== timeRange
                    ),
                    timeBounds: prevState.timeBounds.filter(
                        (bound) => ![bounds.min, bounds.max].includes(bound)
                    ),
                };

                console.log(newFormState);
                return newFormState;
            });
        }
    };

const handleCalorieAmountRangesSelect = (e, option, bounds) => {
    console.log(e.target.checked, option, bounds);
    if (e.target.checked) {
        setSidebarFormState((prevState) => {
            const calorieRanges = [...prevState.calorieRanges];
            calorieRanges.push(option);

            const calorieBounds = [...prevState.calorieBounds];
            calorieBounds.push(bounds.min);
            calorieBounds.push(bounds.max);

            const newFormState = {
                ...prevState,
                calorieRanges,
                calorieBounds,
            };
            console.log(newFormState);
            return newFormState;
        });
    } else {
        setSidebarFormState((prevState) => {
            const newFormState = {
                ...prevState,
                calorieRanges: prevState.calorieRanges.filter(
                    (calorieRange) => option !== calorieRange
                ),
                calorieBounds: prevState.calorieBounds.filter(
                    (bound) => ![bounds.min, bounds.max].includes(bound)
                ),
            };

            console.log(newFormState);
            return newFormState;
        });
    }
};



    return (
// checked={sidebarFormState.personalSelections}
// onChange={handlePersonalSelectionChange}
        // ! Wrap each part in its own two divs
        <div>
            {/* Part 1: Personal Selection */}

            {/* Part 2: Diet */}

            <h3>
                    Diet:
                </h3>
                <ul>
                        {diets.map((option) => {
                            return (
                            <li key={option.value}>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handleDietsSelect(e, option.value)
                                        }
                                        checked={sidebarFormState.diets.includes(option.value)}
                                    />
                                    <span>
                                        {option.display}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>

            {/* Part 3: Health: */}
            <h3>
                Health:
            </h3>
            <ul>
                {healths.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleHealthsSelect(e, option.value)
                                    }
                                    checked={sidebarFormState.healths.includes(option.value)}
                                />
                                <span>
                                        {option.display}
                                    </span>
                            </label>
                        </li>
                    );
                })}
            </ul>

            {/* Part 4: Type of Cuisine: */}

            <h3>
                Cuisine Types:
            </h3>
            <ul>
                {cuisineTypes.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleCuisineTypeSelect(e, option.value)
                                    }
                                    checked={sidebarFormState.cuisineTypes.includes(option.value)}
                                />
                                <span>
                                        {option.display}
                                    </span>
                            </label>
                        </li>
                    );
                })}
            </ul>


            {/* Part 5: Type of Meal: */}

            <h3>
                Meal Types:
            </h3>
            <ul>
                {mealTypes.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleMealTypeSelect(e, option.value)
                                    }
                                    checked={sidebarFormState.mealTypes.includes(option.value)}
                                />
                                <span>
                                        {option.display}
                                    </span>
                            </label>
                        </li>
                    );
                })}
            </ul>



            {/* Part 6: Amount of Calories: */}
            <div>
                <h3>
                    Amount of Calories
                </h3>
                <ul>
                    {calorieAmountRangesOptions.map((option) => {
                        return (
                            <li key={option.value}>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handleCalorieAmountRangesSelect(e, option.value, option.bounds)
                                        }
                                        checked={sidebarFormState.calorieRanges.includes(
                                            option.value
                                        )}
                                    />
                                    <span>
                                         {option.display}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>



            {/* Part 7: Amount of time: */}
            <div>
                <h3>
                    Duration
                </h3>
                <ul>
                    {cookingTimeRangesOptions.map((option) => {
                        return (
                            <li key={option.value}>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handleCookingTimeRangesSelect(e, option.value, option.bounds)
                                        }
                                        checked={sidebarFormState.timeRanges.includes(
                                            option.value
                                        )}
                                    />
                                    <span>
                                         {option.display}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
</div>
)
    }






export default ResultsSidebarForm;

