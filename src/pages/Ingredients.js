import React from 'react';
// import FormIngredient from '../components/FormIngredient';
import ModalForm from '../components/ModalForm';
import IngredientsList from '../components/IngredientsList';

const Ingredients = () => {
  return (
    <>
      {/* <FormIngredient /> */}
      <ModalForm />
      <hr />
      <IngredientsList />
    </>
  );
};

export default Ingredients;
