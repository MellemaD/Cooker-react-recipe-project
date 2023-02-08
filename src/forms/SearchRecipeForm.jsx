import React, {useState} from 'react';
import styled from "styled-components";



// eslint-disable-next-line react/prop-types
function SearchRecipeForm ({setQueryHandler}) {

    const [searchFormState, setSearchFormState] = useState("")


    function handleSubmit(e) {
        e.preventDefault();
        setQueryHandler(searchFormState);

    }

    return (
        <form
            onSubmit={handleSubmit}>
            <InputStyle
                type="text"
                name='search'
                placeholder="Whatcha cooking?"
                value={searchFormState}
                onChange={(e) => setSearchFormState(e.target.value)}
            />

            <button
                type="submit">
                Search
            </button>
        </form>
    )
}




const InputStyle = styled.input`
    border: none;
    outline: none;
    background: #fff;
    height: 100%;
    padding: 0 10px;
    font-size: 20px;
    width: 350px;
`

export default SearchRecipeForm;




