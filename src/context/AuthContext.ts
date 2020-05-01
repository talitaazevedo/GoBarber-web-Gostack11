import { createContext } from 'react';

interface AuthContextData {
  name: string;
}

// Context API  -  é uma das coisas mais fantasticas do react.
// Context API  -  é uma váriavel que vai ficar acessível na aplicação.
//  precisa utilizar o contexto do react.
// primeiro passo importar o createContext  do React.
//  aqui podemos gravar o nome o token e etc.
// No caso dessa váriavel  criamos uma Interface,
// isso aqui é um hack que faz com que o contexto inicialize vazio ({} as AuthContext)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
