import React from 'react';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CloseButton from '../components/CloseButton';
import AddButton from '../components/AddButton';


const LoginContainer = styled.div`
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Login = () => {
    const headerText = "Welcome to Workflow!";
    const footerText = "Copyright © 2020 Asteria Aerospace | All Rights Reserved.";
    return (
        <LoginContainer>
            <Header text={headerText} />
            <SigninForm />
            <Footer text={footerText} />
        </LoginContainer>
    )
};

export default Login;
