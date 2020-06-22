import React from 'react';
import ModalForm from '../components/ModalForm';
import FormIngredient from '../components/FormIngredient';

const Ingredients = () => {
  return (
    <>
      <ModalForm title='Ajouter un ingredient' component={FormIngredient} />
    </>
  );
};

export default Ingredients;
