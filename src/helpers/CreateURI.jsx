
//
/*const [sidebarForm, setSidebarForm] = useState({
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
})*/


function CreateURI(sidebarForm) {


    let uri = '';

    function loopArray(array){
        let uriReturn = '';
        for(let i=0; i<array.length; i++){
            uriReturn = uriReturn + array[i];
        }
        return uriReturn;
    }

    if(sidebarForm.diets.length !== 0){
        uri = uri+(loopArray(sidebarForm.diets))

    }
    if(sidebarForm.healths.length !== 0){
        uri = uri+loopArray(sidebarForm.healths)
    }
    if(sidebarForm.cuisineTypes.length !== 0){
        uri = uri+loopArray(sidebarForm.cuisineTypes)
    }
    if(sidebarForm.mealTypes.length !== 0){
        uri = uri+ loopArray(sidebarForm.mealTypes)
    }
    if(sidebarForm.calorieBounds.length !== 0){
        sidebarForm.calorieBounds.sort();
        uri = uri+(uri + `&calories=${sidebarForm.calorieBounds[0]}-${sidebarForm.calorieBounds[sidebarForm.calorieBounds.length-1]}`)
        }

    return uri;
}

export default CreateURI;