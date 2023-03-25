 export const diets = [
        { value: '&diet=balanced', display: 'Balanced' },
        { value: '&diet=high-fiber', display: 'High Fiber' },
        { value: '&diet=high-protein', display: 'High Protein' },
        { value: '&diet=low-carb', display: 'Low Carb' },
        { value: '&diet=low-fat', display: 'Low Fat' },
        { value: '&diet=low-sodium', display: 'Low Sodium' },
    ];


    export const healths = [
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



    export const cuisineTypes = [
        { value: '&cuisineType=American', display: 'American' },
        { value: '&cuisineType=Asian', display: 'Asian' },
        { value: '&cuisineType=British', display: 'British' },
        { value: '&cuisineType=Mexican', display: 'Mexican' },
        { value: '&cuisineType=Indian', display: 'Indian' },
        { value: '&cuisineType=Mediterranean', display: 'Mediterranean' },

    ];

    export const mealTypes = [
        { value: '&mealType=Breakfast', display: 'Breakfast' },
        { value: '&mealType=Lunch', display: 'Lunch' },
        { value: '&mealType=Dinner', display: 'Dinner' },
        { value: '&mealType=Snack', display: 'Snack' },
    ];



    export const calorieAmountRangesOptions = [


        {
            value: '<400',
            display: '<400',
            displayWord: 'Light Snack Time!',
            bounds: { min: 0, max: 400 },
        },
        {
            value: '400-600',
            display: '400 - 600',
            displayWord: 'Get Lean',
            bounds: {min: 400, max: 600 },
        },
        {
            value: '600-800',
            display: '600 - 800',
            displayWord: 'Moderate Meal',
            bounds: { min: 600, max: 800 },
        },
        {
            value: '800+',
            display: '800+',
            displayWord: 'Bulk It Up!',
            bounds: { min: 800, max: 9000 },
        },

    ];


