/* eslint-disable react/prop-types */
import React  from 'react';
import './filtersForm.css'
import {calorieAmountRangesOptions, cuisineTypes, diets, healths, mealTypes} from "../formValues";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalState";
import {AuthContext} from "../../context/AuthContext";
import ReactSwitch from "react-switch";



function FiltersForm({    state,
                                setState, text, profile
                             }) {

    const {personalSelection, setPersonalSelection, savePersonalSelection, isPersonalSelectionEmpty} = useContext(GlobalContext)
    const {isAuth} = useContext(AuthContext);


    // * 1. Create all the arrays of values to map over and display
        // Moved to own file (formValues) for less repetition and less used lines


    // * 2. Create handle functions to make changes to the states

       // ! TODO: Check if user is logged in

    //  TODO: Check if theory below checks out or can be solved

    const handlePersonalSelection = (checked) => {
        setPersonalSelection((prevState) => {
            const newState = {
                ...prevState,
                isActivated: checked,
            }
            savePersonalSelection(newState);
            return newState;
        });

           for(let i = 0; i < personalSelection.calorieRanges.length; i++) {
                let bounds;
                switch (personalSelection.calorieRanges[i]) {
                    case '<400':
                        bounds = {min: 0, max: 400};
                        break;
                    case '400-600':
                        bounds = {min: 400, max: 600};
                        break;
                    case '600-800':
                        bounds = {min: 600, max: 800};
                        break;
                    case '800+':
                        bounds = {min: 800, max: 5000};
                        break;
                }
                handleCalorieAmountRangesSelect(checked, personalSelection.calorieRanges[i], bounds);
            }

            for (let i = 0; i < personalSelection.cuisineTypes.length; i++) {
                handleCuisineTypeSelect(checked, personalSelection.cuisineTypes[i]);
            }
            for (let i = 0; i < personalSelection.mealTypes.length; i++) {
                handleMealTypeSelect(checked, personalSelection.mealTypes[i]);
            }
            for (let i = 0; i < personalSelection.diets.length; i++) {
                handleDietsSelect(checked, personalSelection.diets[i]);
            }
            for (let i = 0; i < personalSelection.healths.length; i++) {
                handleHealthsSelect(checked, personalSelection.healths[i]);
            }

    }

        //  When unchecked, it should remove the value from the array
    const handleDietsSelect = (check, option) => {
        // based on state, so depending on if at profile or result, it would work
        if (check) {
            setState((prevState) => {
                const diets = [...prevState.diets];
                diets.push(option);
                if (profile){
                    savePersonalSelection({...prevState, diets})
                }
                return { ...prevState, diets };
            });
        } else{
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    diets: prevState.diets.filter((diet) => option !== diet),
                };
                if (profile){
                    savePersonalSelection(newState);
                } return newState;
            });

        }
    };

    const handleHealthsSelect = (check, option) => {
        if (check) {
            setState((prevState) => {
                const healths = [...prevState.healths];
                healths.push(option);
                if (profile){
                    savePersonalSelection({...prevState, healths});
                }
                return { ...prevState, healths };
            });
        } else {
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    healths: prevState.healths.filter(
                        (health) => option !== health
                    ),
                };
                if (profile){
                    savePersonalSelection(newState);
                }
                return newState;
            });
        }
    };

    const handleCuisineTypeSelect = (check, option) => {
        if (check) {
            setState((prevState) => {
                const cuisineTypes = [...prevState.cuisineTypes];
                cuisineTypes.push(option);
                if (profile){
                    savePersonalSelection({...prevState, cuisineTypes});
                }
                return { ...prevState, cuisineTypes };
            });
        } else {
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    cuisineTypes: prevState.cuisineTypes.filter((cuisineType) => option !== cuisineType),
                };
                if (profile){
                    savePersonalSelection(newState);
                }
                return newState;

            });
        }
    };

    const handleMealTypeSelect = (check, option) => {
        if (check) {
            setState((prevState) => {
                const mealTypes = [...prevState.mealTypes];
                mealTypes.push(option);

                if (profile){
                    savePersonalSelection({...prevState, mealTypes});
                }
                return { ...prevState, mealTypes };
            });
        } else {
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    mealTypes: prevState.mealTypes.filter((mealType) => option !== mealType),
                };
                if (profile){
                    savePersonalSelection(newState);
                }
                return newState;
            });
        }
    };

    const handleCalorieAmountRangesSelect = (check, option, bounds) => {
    if (check) {
        setState((prevState) => {
            const calorieRanges = [...prevState.calorieRanges];
            calorieRanges.push(option);

            const calorieBounds = [...prevState.calorieBounds];
            calorieBounds.push(bounds.min);
            calorieBounds.push(bounds.max);

            const newState = {
                ...prevState,
                calorieRanges,
                calorieBounds,
            };
            if (profile){
                savePersonalSelection(newState);
            }
            return newState;
        });
    } else {
        setState((prevState) => {
            const newState = {
                ...prevState,
                calorieRanges: prevState.calorieRanges.filter(
                    (calorieRange) => option !== calorieRange
                ),
                calorieBounds: prevState.calorieBounds.filter(
                    (bound) => ![bounds.min, bounds.max].includes(bound)
                ),
            };
            if (profile){
                savePersonalSelection(newState);
            }
            return newState;
        });
    }
}


    return (
    <div>

            {/* Part 1: Personal Selection */}
        {// if this is profile, it won't need the option for Personal Selection
            !profile &&
            <div>
                <label>
                    <span>Use Your Personal Selection:</span>
                    <ReactSwitch
                        checked={personalSelection.isActivated}
                        onChange={(checked) => handlePersonalSelection(checked)}
                        disabled={isAuth}
                    />
                </label>

                {/* TODO: */}

                {(isAuth && isPersonalSelectionEmpty) &&  <span>
                    You do not have a personal selection yet. Go to your profile to create one!
                </span>}
                {!isAuth && <span className='hide until hover?'>
                    You cannot make use of a personal selection without an account.
                    Try to log in or register if you do not have an account yet
                </span>}

            </div>
        }

            {/* Part 2: Diet */}
        <div>
            <h3>
                {/* as the text differs from profile page, this will give the correct text */}
                {text[0]}
                </h3>
                <ul>
                        {diets.map((option) => {
                            return (
                            <li key={option.value}>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handleDietsSelect(e.target.checked, option.value)
                                        }
                                        // If this isn't on the profile, it will check if the state (of sidebarForm) has this
                                        // value. It will also check if personalSelection has this value, if it is activated

                                        // if this is at the profile page, it only needs to check the given state (personalSelection)
                                        checked={
                                        !profile ?
                                        (state.diets.includes(option.value)) || (personalSelection.isActivated === true &&
                                        personalSelection.diets.includes(option.value)) :
                                        state.diets.includes(option.value)
                                    }
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
                {text[1]}
            </h3>
            <ul>
                {healths.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleHealthsSelect(e.target.checked, option.value)
                                    }
                                    checked={
                                        !profile ?
                                            (state.healths.includes(option.value)) || (personalSelection.isActivated === true &&
                                                personalSelection.healths.includes(option.value)) :
                                            state.healths.includes(option.value)
                                    }
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
                {text[2]}
            </h3>
            <ul>
                {cuisineTypes.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleCuisineTypeSelect(e.target.checked, option.value)
                                    }
                                    checked={
                                        !profile ?
                                            (state.cuisineTypes.includes(option.value)) || (personalSelection.isActivated === true &&
                                                personalSelection.cuisineTypes.includes(option.value)) :
                                            state.cuisineTypes.includes(option.value)
                                    }
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
                {text[3]}
            </h3>
            <ul>
                {mealTypes.map((option) => {
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        handleMealTypeSelect(e.target.checked, option.value)
                                    }
                                    checked={
                                        !profile ?
                                            (state.mealTypes.includes(option.value)) || (personalSelection.isActivated === true &&
                                                personalSelection.mealTypes.includes(option.value)) :
                                            state.mealTypes.includes(option.value)
                                    }
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
                    {text[4]}
                </h3>
                <ul>
                    {calorieAmountRangesOptions.map((option) => {
                        return (
                            <li key={option.value}>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handleCalorieAmountRangesSelect(e.target.checked, option.value, option.bounds)
                                        }
                                        checked={
                                            !profile ?
                                                (state.calorieRanges.includes(option.value)) || (personalSelection.isActivated === true &&
                                                    personalSelection.calorieRanges.includes(option.value)) :
                                                state.calorieRanges.includes(option.value)
                                        }
                                    />
                                    <span>
                                         {!profile ? option.display : option.displayWord}
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


export default FiltersForm;