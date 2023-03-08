/* eslint-disable react/prop-types */
import React  from 'react';
import './resultsSidebarForm.css'




function ResultsSidebarForm({    sidebarFormState,
                                 setSidebarFormState
                             }) {



    // * 1. Create all the arrays of values to map over and display

    const diets = [
        { value: '&diet=balanced', display: 'Balanced' },
        { value: '&diet=high-fiber', display: 'High Fiber' },
        { value: '&diet=high-protein', display: 'High Protein' },
        { value: '&diet=low-carb', display: 'Low Carb' },
        { value: '&diet=low-fat', display: 'Low Fat' },
        { value: '&diet=low-sodium', display: 'Low Sodium' },
    ];


    const healths = [
        { value: '&health=alcohol-free', display: 'Alcohol-free' },
        { value: '&health=dairy-free', display: 'Dairy-free' },
        { value: '&health=egg-free', display: 'Egg-free' },
        { value: '&health=fish-free', display: 'Fish-free' },
        { value: '&health=gluten-free', display: 'Gluten-free' },
        { value: '&health=keto-friendly', display: 'Keto-friendly' },
        { value: '&health=kosher', display: 'Kosher' },
        { value: '&health=low-sugar', display: 'Low Sugar' },
        { value: '&health=paleo', display: 'Paleo' },
        { value: '&health=peanut-free', display: 'Peanut-free' },
        { value: '&health=pork-free', display: 'Pork-free' },
        { value: '&health=shellfish-free', display: 'Shellfish-free' },
        { value: '&health=vegan', display: 'Vegan' },
        { value: '&health=vegetarian', display: 'Vegetarian' },
    ];



    const cuisineTypes = [
        { value: '&cuisineType=american', display: 'American' },
        { value: '&cuisineType=asian', display: 'Asian' },
        { value: '&cuisineType=british', display: 'British' },
        { value: '&cuisineType=greek', display: 'Greek' },
        { value: '&cuisineType=mexican', display: 'Mexican' },
        { value: '&cuisineType=indian', display: 'Indian' },
        { value: '&cuisineType=mediterranean', display: 'Mediterranean' },

    ];

    const mealTypes = [
        { value: '&mealType=breakfast', display: 'Breakfast' },
        { value: '&mealType=brunch', display: 'Brunch' },
        { value: '&mealType=lunch/dinner', display: 'Lunch/Dinner' },
        { value: '&mealType=snack', display: 'Snack' },
    ];



   const calorieAmountRangesOptions = [


       {
           value: '<400',
           display: '<400',
           bounds: { min: 0, max: 400 },
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
           bounds: { min: 800, max: 5000 },
       },

   ];




    // * 2. Create handle functions to make changes to the states

        // * 3. Add to these handles the change of URI


    /*const handlePersonalSelectionChange = (checked) => {
        console.log(checked);
        ! TODO: Check if user logged in, use user's personal selection and set diet and healths
        setSidebarFormState((prevState) => {
            return { ...prevState, personalSelection: !prevState.personalSelection };
        });
    };*/




        //  When unchecked, it should remove the value from the array
    const handleDietsSelect = (e, option) => {
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
    };

    const handleHealthsSelect = (e, option) => {
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


const handleCalorieAmountRangesSelect = (e, option, bounds) => {
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
            console.log(calorieRanges);
            console.log(calorieBounds);
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
    <div>
        <div>
            {/* Part 1: Personal Selection */}
        </div>

            {/* Part 2: Diet */}
        <div>
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
        </div>

            {/* Part 3: Health: */}
        <div>
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
        </div>

            {/* Part 4: Type of Cuisine: */}
        <div>
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
        </div>


            {/* Part 5: Type of Meal: */}
        <div>
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
        </div>



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

</div>
)
    }






export default ResultsSidebarForm;

