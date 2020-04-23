import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';
import authStore from '../common/authstore';
import { Redirect } from 'react-router-dom';

const LoginContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Login = (props) => {
    const [redirectToReferrer, setRedirect] = useState(authStore.isAuthenticated);
    const { from } = props.location.state || { from: { pathname: '/' } };
    const onSubmit = async (loginData) => {
        try {
            const response = await authStore.authenticate(loginData);
            console.log('response', response);
            if(response.status === 'success') {
                setRedirect(true);
            }
        } catch (e) {
            console.log('login failed', e);
        }
    }

    useEffect(() => {
        authStore.checkExistingLogins();
        if(authStore.isAuthenticated) {
            setRedirect(true);
        }
    }, [redirectToReferrer]);

    if (redirectToReferrer) {
        return <Redirect to={from} />
    }
    return (
        <LoginContainer>
            <SigninForm onSubmit={onSubmit} />
        </LoginContainer>
    )
};

export default Login;
