import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function CategoryArticles () {
  const initialForm = ({
    name: ''
  });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: categoryArticlesToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/article_categories');

  const DeleteCategoryArticles = async (categoryArticles) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette catégorie d\'article?')) {
      deleteResource(categoryArticles.id, { optimistic: true });
    }
  };
  const SaveCategoryArticles = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async categoryArticles => {
    setFields(categoryArticles);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des catégories d'articles.</p>
      </div>
    );
  }
  if (!categoryArticlesToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Catégorie d'articles</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>

            {categoryArticlesToShow.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteCategoryArticles(t)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <div className='form-top'>
        <form className='form-inline' onSubmit={SaveCategoryArticles}>

          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder="Nouvelle Catégorie d'article"
            value={fields.name}
            onChange={handleFieldChange}
          />
          <button
            className='form-button'
            onClick={SaveCategoryArticles}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur lors de l'ajout de la catégorie</p>
          )}

        </form>
      </div>

      {Renderlist()}
    </>
  );
}

export default CategoryArticles;
