import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalState";
import FiltersForm from "../../forms/filterForm/FiltersForm";


// const {user, isAuth} = useContext(AuthContext)
const username = "Rodriguez Gonzales"
const data = "Healths and diets"

// TODO soon:
// !! Need to check isAuth
// ! Use username


// TODO future:
// Add possibility to add personal image to account
// Add more choices for user

//* 1. I don't need to do anything besides the form as adjustments have been made in FiltersForm






function ProfilePage() {
    const {personalSelection, setPersonalSelection} = useContext(GlobalContext)


    return (
        <div>


            <h1>Personalize Your Experience, {username}</h1>
            <p className='small gray'>Be aware that selecting any of the below will result in any search with pS turned on only showcasing these meals.</p>

            <h2>Your Selection: </h2>
            {(personalSelection.diets.length > 0 || personalSelection.healths.length > 0)?
                 <p>{data}</p>
             :
                  <p>You have not selected any diet or health wishes as standard. Feel free to do so down below</p>
            }

            <FiltersForm
                state={personalSelection}
                setState={setPersonalSelection}
                text={['Do you follow any of these diets?',
                    'Are there any health issues/wishes?',
                    'Do you have a favourite type of Cuisine?',
                    'Are you planning on using this site only for specific meals?',
                    'Is bulking season around the corner, or are you planning for the beach?' ]}
                profile={true}
            />
        </div>
    );
}

export default ProfilePage;