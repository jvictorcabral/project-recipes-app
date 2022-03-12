import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions';

const INITIAL_STATE = '';

const ingredient = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_INGREDIENT:
    return action.ingredient;
  case REMOVE_INGREDIENT:
    return '';
  default:
    return state;
  }
};

export default ingredient;
