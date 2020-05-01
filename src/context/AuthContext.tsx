import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface SignIngCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignIngCredentials): Promise<void>;
}

// Context API  -  é uma das coisas mais fantasticas do react.
// Context API  -  é uma váriavel que vai ficar acessível na aplicação.
//  precisa utilizar o contexto do react.
// primeiro passo importar o createContext  do React.
//  aqui podemos gravar o nome o token e etc.
// No caso dessa váriavel  criamos uma Interface,
// isso aqui é um hack que faz com que o contexto inicialize vazio ({} as AuthContext)
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  //
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    // console.log('signIn');
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    setData({ token, user });
    // console.log(response.data);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
