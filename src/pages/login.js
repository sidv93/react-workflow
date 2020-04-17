import React from 'react';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';
import { useHistory } from 'react-router-dom';

const LoginContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Login = () => {
    const history = useHistory();
    const onSubmit = async (loginData) => {
        console.log('in submit', loginData);
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(loginData)
        });        
        const response = await res.json();
        console.log(response);
        if(response.status === 'success') {
            return history.push('/dashboard');
        }
        console.log('login failed');
    }
    return (
        <LoginContainer>
            <SigninForm onSubmit={onSubmit} />
        </LoginContainer>
    )
};

export default Login;
