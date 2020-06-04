import React from 'react';
import FormIngredient from '../components/FormIngredient';
import IngredientsList from '../components/IngredientsList';

const Ingredients = () => {
  return (
    <>
      <h1>Tous les ingrédients</h1>
      <IngredientsList />
      <hr />
      <FormIngredient />
    </>
  );
};

export default Ingredients;
