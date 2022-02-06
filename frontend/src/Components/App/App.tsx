import React, { FC } from 'react';
import { Header, Layout } from '..';
import { Login } from '../../Views';
import { AppProvider } from './AppContext';


export const App: FC = () => {
  return (
    <AppProvider>
      <Layout>
        <Header />
        <Login />
      </Layout>
    </AppProvider>
  );
}

