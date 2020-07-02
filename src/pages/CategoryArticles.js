import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function CategoryArticles () {
  const { fields, setFields, handleFieldChange } = useFormData({ name: '' });
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: categoryToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/article_categories');

  const DeleteCategory = async (cat) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette Catégorie?')) {
      deleteResource(cat.id, { optimistic: true });
    }
  };
  const SaveCategory = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields({ name: '' });
  };
  const fillForm = async category => {
    setFields(category);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des Catégories.</p>
      </div>
    );
  }
  if (!categoryToShow) return 'Chargement...';
  function RenderList() {
    return (
      <table className='render-list'>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {categoryToShow.map(c => {
            return (
              <tr key={c.id}>
                <td style={{ opacity: (!!c._saving || !!c._deleting) ? 0.7 : 1 }}>{c.name}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(c)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteCategory(c)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <>
      <div>
        <form className='form-inline' onSubmit={SaveCategory}>
          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder="New Catégorie d'article"
            value={fields.name}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveCategory}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Save
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur lors de l'ajout de la catégorie</p>
          )}
        </form>
      </div>
      {RenderList()}
    </>

  );
}

export default CategoryArticles;
