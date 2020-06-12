import React from 'react';
import IngredientsList from '../components/IngredientsList';
import FormIngredient from '../components/FormIngredient';

const Ingredients = (props) => {
  return (
    <>
      <FormIngredient />

      <hr />
      <IngredientsList />
    </>
  );
};

export default Ingredients;
