import React from 'react';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginContainer = styled.div`
    /* height: 100%; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Login = () => {
    return (
        <LoginContainer>
            <SigninForm />
        </LoginContainer>
    )
};

export default Login;
