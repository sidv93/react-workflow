import React from 'react';
import styled from 'styled-components';
import Board from './pages/board';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import authStore from './common/authstore';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  header, footer {
    flex-shrink: 0;
  }
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
`;

function App() {
  const headerText = 'Welcome to Workflow!';
  const footerText = 'Copyright © 2020 Asteria Aerospace | All Rights Reserved.';
  return (
    <Router>
      <MainContainer>
        <Header text={headerText} />
        <ContentContainer>
        <Switch>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/board/:boardId' component={Board} />
          <Route path='/login' component={Login} />
          <Redirect path='/' to="/dashboard" />
        </Switch>
        </ContentContainer>
        <Footer text={footerText} />
      </MainContainer>
    </Router>
  );
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authStore.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} /> 
  )} />
)

export default App;
