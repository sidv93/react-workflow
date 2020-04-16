import React from 'react';
import styled from 'styled-components';

const HeaderComponent = styled.header`
    background: linear-gradient(to right, #c4c4c4 20%, #696969 80%);
    box-shadow: -1px 5px 5px 0px rgba(161,153,161,0.72);
    text-align: center;
    color: white;
    font-size: 2rem;
    padding: 20px;
    top: 0;
    left: 0;
    right: 0;
`;

const Header = ({text}) => {
    return (
        <HeaderComponent>
            <p>{text}</p>
        </HeaderComponent>
    )
};

export default Header;
