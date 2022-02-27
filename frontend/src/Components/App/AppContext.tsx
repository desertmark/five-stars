import React, { FC, createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import { LoginResponse } from '../../gql/login.api';
const ACCESS_TOKEN_LS_KEY = 'access_token';

export interface AppState {
    userInfo: any;
    isAuthenticated: boolean;
    setUserInfo: (loginResponse: LoginResponse) => void;
}

const AppContext = createContext<AppState>({} as AppState);
export const useAppState = () => {
    return useContext(AppContext);
}

export const AppProvider: FC = ({ children }) => {
    const [userInfo, _setUserInfo] = useState<any>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const access_token = localStorage.getItem(ACCESS_TOKEN_LS_KEY);
        if (access_token) {
            setUserInfo({access_token} as LoginResponse);
        }
    }, [])

    const setUserInfo = ({ access_token }: LoginResponse) => {
        const userInfo = jwt.decode(access_token);

        _setUserInfo(userInfo);
        setIsAuthenticated(true);
        localStorage.setItem(ACCESS_TOKEN_LS_KEY, access_token);
    }

    return (
        <AppContext.Provider value={{ userInfo, isAuthenticated, setUserInfo, }}>
            {children}
        </AppContext.Provider>
    );
}

