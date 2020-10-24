import React, {createContext, useState, useEffect, useContext, ReactElement} from 'react';

import * as auth from '../services/auth';

import api from '../services/api';

import history from '../routes/history'

interface AuthContextData {
  signed: boolean;
  user: object;
  sign(email: string, password: string, rememberMe: boolean): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }): ReactElement => {

  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function loadStorageData() {

      const tokenLocalStorage = localStorage.getItem('@HappyAuth:token');
      const userLocalStorage = localStorage.getItem('@HappyAuth:user');

      const tokenSessionStorage = sessionStorage.getItem('@HappyAuth:token');
      const userSessionStorage = sessionStorage.getItem('@HappyAuth:user');

      if(tokenLocalStorage && userLocalStorage) {
        await api.post('authenticate-token', { token: tokenLocalStorage });
        api.defaults.headers.Authorization = tokenLocalStorage;
        setUser(userLocalStorage);
        setSigned(true);
      } else if (tokenSessionStorage && userSessionStorage) {
        await api.post('authenticate-token', { token: tokenSessionStorage });
        api.defaults.headers.Authorization = tokenSessionStorage;
        setUser(userSessionStorage);
        setSigned(true);
      }
   }
   loadStorageData();
  })

  async function sign(email: string, password: string, rememberMe: boolean) {

    const { user, token } = await auth.login(email, password);

    if(rememberMe) {
      localStorage.setItem('@HappyAuth:user', JSON.stringify(user));
      localStorage.setItem('@HappyAuth:token', token);
    } else {
      sessionStorage.setItem('@HappyAuth:user', JSON.stringify(user));
      sessionStorage.setItem('@HappyAuth:token', token);
    }
    setSigned(true);
    history.push('/dashboard');
  }

  function signOut() {
    localStorage.clear();
    sessionStorage.clear();
    api.defaults.headers.Authorization = '';
    setSigned(false);
    setUser({});
    history.push('/login');
  }

  return (
    <AuthContext.Provider value={{ signed, sign, user, signOut }}>  
        {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
