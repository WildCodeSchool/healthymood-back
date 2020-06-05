import React from 'react';
import ModalForm from '../components/ModalForm';
import IngredientsList from '../components/IngredientsList';

const Ingredients = () => {
  return (
    <>
      <ModalForm />
      <hr />
      <IngredientsList />
    </>
  );
};

export default Ingredients;
