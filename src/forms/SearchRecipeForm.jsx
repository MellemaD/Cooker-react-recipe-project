import React, {useState} from 'react';
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";



// eslint-disable-next-line react/prop-types
function SearchRecipeForm ({setQueryHandler, toggleSearchTrigger, searchTrigger}) {

    const [searchFormState, setSearchFormState] = useState("")


    function handleSubmit(e) {
        e.preventDefault();
        setQueryHandler(searchFormState);
        toggleSearchTrigger(!searchTrigger);
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

            <ButtonStyle
                type="submit">
                <i><FaSearch/></i>
            </ButtonStyle>
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
const ButtonStyle = styled.button`
    height: 23px;
    border: none;
    padding: 0 2px;
    margin: 2px 0;
    font-size: 1.1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    color: #0a5071;
    background-color: #fff;



  :hover{
    cursor: pointer;
    color: #fff;
    background: #888888;
    transition: 0.5s;



  }
`

export default SearchRecipeForm;




