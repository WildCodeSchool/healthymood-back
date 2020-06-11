import React from 'react';
import ModalForm from '../components/ModalForm';
import IngredientsList from '../components/IngredientsList';
import FormIngredient from '../components/FormIngredient';

const Ingredients = (props) => {
  return (
    <>
      <ModalForm title='Ajouter un ingredient' component={FormIngredient} />
      <hr />
      <IngredientsList />
    </>
  );
};

export default Ingredients;
