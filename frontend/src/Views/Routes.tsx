import React, { FC } from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { Login, Home } from './';

export const Routes: FC = () => <ReactRouterRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
</ReactRouterRoutes>