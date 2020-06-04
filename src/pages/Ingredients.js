import React from 'react';
import FormIngredient from '../components/FormIngredient';
import IngredientsList from '../components/IngredientsList';
import Add from '../components/Add';

const Ingredients = () => {
  return (
    <>
      <h1>Tous les ingrédients</h1>
      <Add />
      <IngredientsList />
      <hr />
      <FormIngredient />
    </>
  );
};

export default Ingredients;
