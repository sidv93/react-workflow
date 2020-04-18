import React from 'react';
import styled from 'styled-components';

const AddButtonContainer = styled.div`
    position: fixed;
    bottom: 80px;
    right: 30px;
    cursor: pointer;
`;

const AddButtonComponent = styled.div`
    background-color: #868686;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
    font-size: 2.4rem;
    color: white;
    text-align: center;
` ;

const AddButton = ({onClick}) => {
    return (
        <AddButtonContainer onClick={onClick}>
            <AddButtonComponent>+</AddButtonComponent>
        </AddButtonContainer>
    )
};

export default AddButton;
