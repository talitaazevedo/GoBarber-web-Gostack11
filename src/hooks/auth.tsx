import React, { createContext, useCallback, useState, useContext } from 'react';
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
  signOut(): void;
}

// Context API  -  é uma das coisas mais fantasticas do react.
// Context API  -  é uma váriavel que vai ficar acessível na aplicação.
//  precisa utilizar o contexto do react.
// primeiro passo importar o createContext  do React.
//  aqui podemos gravar o nome o token e etc.
// No caso dessa váriavel  criamos uma Interface,
// isso aqui é um hack que faz com que o contexto inicialize vazio ({} as AuthContext)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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
  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
// Essa função aqui exporta tudo
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used  within an AuthProvider');
  }
  return context;
}
