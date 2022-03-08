import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ Login } />
      <Route exact path="/drinks/:id" component={ Login } />
      <Route exact path="/foods/:id/in-progress" component={ Login } />
      <Route exact path="/drinks/:id/in-progress" component={ Login } />
      <Route exact path="/explore" component={ Login } />
      <Route exact path="/explore/foods" component={ Login } />
      <Route exact path="/explore/drinks" component={ Login } />
      <Route exact path="/explore/foods/ingredients" component={ Login } />
      <Route exact path="/explore/drinks/ingredients" component={ Login } />
      <Route exact path="/explore/foods/nationalities" component={ Login } />
      <Route exact path="/profile" component={ Login } />
      <Route exact path="/done-recipes" component={ Login } />
      <Route exact path="/favorite-recipes" component={ Login } />
    </Switch>
  );
}

export default App;
