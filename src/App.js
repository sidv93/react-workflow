import React from 'react';
import styled from 'styled-components';
import Board from './pages/board';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <MainContainer>
      <Header text={headerText} />
      <ContentContainer>
        <Dashboard />
      </ContentContainer>
      <Footer text={footerText} />
    </MainContainer>
  );
}

export default App;
