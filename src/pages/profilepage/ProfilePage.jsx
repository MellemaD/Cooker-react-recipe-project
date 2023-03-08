import React from 'react';




/*
At profile:
        1. user will select for example 'balanced' and 'High Fiber'
        2. When user does this, the value of this (?? &diet= ??) needs to be saved to
    the array of diets here and in localStorage

    Then in sidebarForm:
    1. It needs to be checked whether personalSelection.isActivated is true
    2. If yes, then it needs to check diets/healths if it has anything and if yes:
        2B. Take these values and add them to the sidebarForm
        2C. Make sure these options are now checked on display as well
    3. If not, then an action (button) needs to trigger to set activated true

    This means here I need:

    A function that checks whether personalSelection.isActivated is true
        I don't ^^ because I can just use value of ^^
        BUT I do need a function that sets to false/true
    A function that adds to diets and healths
    A function that removes from diets and healths

*/

/*
At sidebarform just have as onclick to the personalSelection a loop that
loops through each array (of its length) and with each array sends its value
to the corresponding handle*/



//* 10. ? A function to check if the user has selected a personalSelection? message? Maybe can do at profile or wherever:
// "if .. array empty then "You should try creating a personalSelection"
// Would just be at search?
// if personalSelection.diets.length > 0 || personalSelection.healths.length > 0 then{
// action of the switch? } else { "You haven't select any diet or health wishes as standard. Feel free to do so at your profile" }



function ProfilePage() {
    return (
        <div>
            <h1>Profile</h1>


        </div>
    );
}

export default ProfilePage;