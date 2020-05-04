import React from 'react';
import { Switch, Route } from 'react-router-dom';

// ? Switch => Garante que apenas uma rota seja executada por momento
// ? Route => Rota da minha aplicação
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
