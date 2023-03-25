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
        uri = uri+( `&calories=${sidebarForm.calorieBounds[0]}-${sidebarForm.calorieBounds[sidebarForm.calorieBounds.length-1]}`)
        console.log(sidebarForm.calorieBounds)
        }
    console.log(uri)

    return uri;
}


export default CreateURI;