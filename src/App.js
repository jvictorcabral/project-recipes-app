import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsIngredients from './pages/FoodsIngredients';
import DoneRecipes from './pages/DoneRecipes';
import Nacionalities from './pages/Nacionalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import InProgressRecipe from './pages/InProgressRecipe';
import ExploreRecipe from './pages/ExploreRecipe';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/foods/:id/in-progress" component={ InProgressRecipe } />
      <Route exact path="/drinks/:id/in-progress" component={ InProgressRecipe } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreRecipe } />
      <Route exact path="/explore/drinks" component={ ExploreRecipe } />
      <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
      <Route exact path="/explore/foods/nationalities" component={ Nacionalities } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
