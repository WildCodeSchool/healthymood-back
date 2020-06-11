import React from 'react';
import ModalForm from '../components/ModalForm';
import FormArticleCategory from '../components/FormArticleCategory';

const CategoryArticles = () => {
  return (
    <>
      <h1>Catégories d'articles</h1>
      <ModalForm title="Ajouter des categories" btnTitle="Ajouter" component={<FormArticleCategory />} />
    </>
  );
};

export default CategoryArticles;
