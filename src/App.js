import React from 'react';
import styled from 'styled-components';
import Board from './pages/board';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
  const headerText = "Welcome to Workflow!";
  const footerText = "Copyright © 2020 Asteria Aerospace | All Rights Reserved.";
  return (
    <Router>
      <MainContainer>
        <Header text={headerText} />
        <ContentContainer>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/board/:boardName">
            <Board />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        </ContentContainer>
        <Footer text={footerText} />
      </MainContainer>
    </Router>
  );
}

export default App;
