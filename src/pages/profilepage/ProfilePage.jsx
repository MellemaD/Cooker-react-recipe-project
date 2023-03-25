import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalState";
import FiltersForm from "../../forms/filterForm/FiltersForm";
import './profilePage.css'
import {AuthContext} from "../../context/AuthContext";

// TODO future:
// Add possibility to add personal image to account
// Add more choices for user

//* 1. I don't need to do anything besides the form as adjustments have been made in FiltersForm






function ProfilePage() {
    const {personalSelection, setPersonalSelection, isPersonalSelectionEmpty} = useContext(GlobalContext)
    const {isAuth, user} = useContext(AuthContext)




    return (
        <div>
            { isAuth ?
            <div className='outer-container-profile'>


                <h1>Personalize Your Experience, <span>{user.username}</span></h1>
                <p>Any saved preferences here will affect your search results if this option is turned on.</p>

                <h2>Your Selection: </h2>
                {isPersonalSelectionEmpty && <p>You have not selected any diet or health wishes as standard. Feel free to do so down below.</p>
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
            </div> :
            <p>You should be logged in to make use of the profile page!</p>}
        </div>
    );
}

export default ProfilePage;