import React from 'react';
import styled from 'styled-components';

const CloseButtonContainer = styled.div`
    position: fixed;
    top: 170px;
    right: 30px;
    cursor: pointer;
`;

const CloseButtonComponent = styled.div`
    background-color: #868686;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
    font-size: 2.2rem;
    color: white;
    text-align: center;
`;

const CloseButton = () => {
    return (
        <CloseButtonContainer>
            <CloseButtonComponent>x</CloseButtonComponent>
        </CloseButtonContainer>
    )
}

export default CloseButton;
