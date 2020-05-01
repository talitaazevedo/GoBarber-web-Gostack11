import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignIngCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
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
  const signIn = useCallback(async ({ email, password }) => {
    console.log('signIn');
    const response = await api.post('sessions', {
      email,
      password,
    });
    console.log(response.data);
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'talita', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
