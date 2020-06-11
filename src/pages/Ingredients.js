import React from 'react';
import ModalForm from '../components/ModalForm';
import IngredientsList from '../components/IngredientsList';
import FormIngredient from '../components/FormIngredient';

const Ingredients = () => {
  return (
    <>
      <ModalForm title="Ajouter des Ingredients" btnTitle="Ajouter" component={<FormIngredient />} />

      <hr />
      <IngredientsList />
    </>
  );
};

export default Ingredients;
