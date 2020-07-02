import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';
function CategoryRecipes () {
  const { fields, setFields, handleFieldChange } = useFormData({ name: '' });
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: CatRecipeToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/recipe_categories');

  const DeleteTask = async (task) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette catégorie de recette?')) {
      deleteResource(task.id, { optimistic: true });
    }
  };
  const SaveCatRecipe = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields({ name: '' });
  };
  const fillForm = async cat => {
    setFields(cat);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des catégories</p>
      </div>
    );
  }
  if (!CatRecipeToShow) return 'Loading...';
  function Renderlist () {
    return (
      <table className='render-list'>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {CatRecipeToShow.map(c => {
            return (
              <tr key={c.id}>
                <td style={{ opacity: (!!c._saving || !!c._deleting) ? 0.7 : 1 }}>{c.name}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(c)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteTask(c)} />
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
        <form className='form-inline' onSubmit={SaveCatRecipe}>

          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouvel Catégorie de recette '
            value={fields.name}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveCatRecipe}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Save
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur lors de l'ajout de la Catégorie Recette</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>
  );
}

export default CategoryRecipes;
