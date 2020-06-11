import React from 'react';
import RecipesCategoriesList from '../components/RecipesCategoriesList';
import ModalRecipesCategories from '../components/ModalRecipesCategories';

const CategoryRecipes = () => {
  return (
    <>
      <ModalRecipesCategories />
      <RecipesCategoriesList />
    </>
  );
};

export default CategoryRecipes;
