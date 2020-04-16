import React from 'react';
import styled from 'styled-components';

const FooterComponent = styled.footer`
    background-color: #383838;
    text-align: center;
    padding: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
`;

const Footer = ({text}) => {
    return (
        <FooterComponent>
            <p>{text}</p>
        </FooterComponent>
    )
}

export default Footer;
