import React, {createContext, useState, useEffect, useContext} from 'react';

import * as auth from '../services/auth';

import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object;
  sign(email: string, password: string, rememberMe: boolean): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

  // const [user, setUser] = useState({});
  // const [signed, setSigned] = useState(false);

  // useEffect(() => {
  //  async function loadStorageData() {
  //   const tokenStorage = localStorage.getItem('@HappyAuth:token');
  //   const userStorage = localStorage.getItem('@HappyAuth:user');

  //   if(tokenStorage && userStorage) {
  //     setUser(userStorage);
  //     setSigned(true);

  //     console.log(userStorage);

  //     console.log(user);
  //     console.log(signed);
  //   }
  //  }
  //  loadStorageData();
  // }, [])

  // const [signed, setSigned] = useState(false);
  // const [user, setUser] = useState({});

  function isSigned(): boolean {
    const tokenStorage = localStorage.getItem('@HappyAuth:token');
    const userStorage = localStorage.getItem('@HappyAuth:user');

    if(tokenStorage && userStorage) {
      return true;
    }
    return false;
  }

  function getUser(): object {
    const tokenStorage = localStorage.getItem('@HappyAuth:token');
    const userStorage = localStorage.getItem('@HappyAuth:user');

    if(tokenStorage && userStorage) {
      return JSON.parse(userStorage);
    }
    return {};
  }

  async function sign(email: string, password: string, rememberMe: boolean) {
    const { user, token } = await auth.login(email, password);

    if(rememberMe) {
      localStorage.setItem('@HappyAuth:user', JSON.stringify(user));
      localStorage.setItem('@HappyAuth:token', token);
    }
  }

  function signOut() {
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ signed: isSigned(), sign, user: getUser(), signOut }}>  
        {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
