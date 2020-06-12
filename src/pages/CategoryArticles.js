import React from 'react';

import FormArticleCategory from '../components/FormArticleCategory';
import ArticleCategoryList from '../components/ArticleCategoryList';

const CategoryArticles = () => {
  return (
    <>
      <h1>Catégories d'articles</h1>
      <FormArticleCategory />
      <ArticleCategoryList />
    </>
  );
};

export default CategoryArticles;
