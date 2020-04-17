import React, { useState } from 'react';
import styled from 'styled-components';

const InputComponent = styled.input`
    width: 100%;
    padding: 10px 5px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-sizing: border-box;
`;

const RememberMe = () => {
    return (
        <div style={{fontSize: '1rem', margin: '5px 0', color: '#777777'}}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
        </div>
    )
};

const SubmitComponent = styled.input`
    background-color: #7d7d7d;
    color: #ffffff;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    font-size: 1.2rem;
    padding: 6px 0;
`;

const SigninFormContainer = styled.div`
    width: 350px;
`;

const SigninForm = ({onSubmit}) => {
    const [loginData, setLoginData] = useState({username: '', password: ''});
    const handleChange = (event) => {
        setLoginData({...loginData, [event.target.name]: event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(loginData);
    }
    return (
        <SigninFormContainer>
            <form onSubmit={handleSubmit}>
                <h3 style={{fontSize: '2.4rem'}}>Please sign in</h3>
                <InputComponent type="text" value={loginData.username} name="username" onChange={handleChange} placeholder="Username"/>
                <InputComponent type="password" value={loginData.password} name="password" onChange={handleChange} placeholder="Password"/>
                <RememberMe />
                <SubmitComponent type="submit" value="Sign in" />
            </form>
        </SigninFormContainer>
        
    )
}

export default SigninForm;
