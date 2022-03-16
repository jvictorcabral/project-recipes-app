export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const getIngredient = (payload) => ({
  type: ADD_INGREDIENT,
  ingredient: payload,
});

export const removeIngredient = () => ({
  type: REMOVE_INGREDIENT,
});
