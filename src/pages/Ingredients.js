import React, { useState } from 'react';
import IngredientsList from '../components/IngredientsList';
import IngredientContext from '../contexts/IngredientContext';

const Ingredients = () => {
  const [formData, setFormData] = useState({
    name: '',
    is_allergen: false,
  });

  return (
    <IngredientContext.Provider value={{formData, setFormData}}>
      <>
        <IngredientsList />
      </>
    </IngredientContext.Provider>
  );
};

export default Ingredients;
