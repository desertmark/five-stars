import React from 'react';
import { Header, Layout } from '..';
import { AppTheme } from '../../Config/Theming';
import { Login } from '../../Views';

export function App() {
  return (
    <Layout>
      <Header />
      <Login />
    </Layout>
  );
}

