import React from 'react';
import styled from "styled-components";


// eslint-disable-next-line react/prop-types
function SearchBar({submitHandler})  {



    return (
        <form>
                <ButtonStyle
                    type="button"
                    name='search'
                    placeholder="Whatcha cooking?"
                    onClick={submitHandler}
                >
                    Click here to get searching
                </ButtonStyle>
        </form>
    )
}

const ButtonStyle = styled.button`
    border: none;
    outline: none;
    background: #fff;
    height: 100%;
    padding: 0 10px;
    font-size: 20px;
    width: 350px;
  :hover{
    cursor: pointer;
    
  }
`

export default SearchBar;