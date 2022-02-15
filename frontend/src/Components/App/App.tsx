import React, { FC } from 'react';
import { Header, Layout } from '..';
import { Login } from '../../Views';
import { AppProvider } from './AppContext';
import { BrowserRouter } from "react-router-dom";
import { Routes } from '../../Views'

export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Header />
          <Routes />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

