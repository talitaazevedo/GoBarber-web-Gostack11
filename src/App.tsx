import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    {/* AuthContext.Provider é onde se cria valor no contexto  */}
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
