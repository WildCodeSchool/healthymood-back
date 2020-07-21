import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import API from '../services/API';
import '../Styles/Form.css';
import ImagePlaceholder from '../images/image_placeholder.png';

function CategoryRecipes () {
  const initialform = {
    name: '',
    image: ''
  };
  const { fields, setFields, handleFieldChange } = useFormData(initialform);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: CatRecipeToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/recipe_categories');

  const DeleteTask = async (task) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette catégorie de recette?')) {
      deleteResource(task.id, { optimistic: false });
    }
  };
  const SaveCatRecipe = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: false });
    setFields(initialform);
  };
  const fillForm = async cat => {
    setFields(cat);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData(); // eslint-disable-line
    formData.append('picture', image);
    API.post('/recipes/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.data)
      .then(tab => {
        setFields({ ...fields, image: tab });
        console.log(tab);
      });
  };

  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des catégories</p>
      </div>
    );
  }
  if (!CatRecipeToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Catégorie de Recettes</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Image</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {CatRecipeToShow.map(c => {
              return (
                <tr key={c.id}>
                  <td style={{ opacity: (!!c._saving || !!c._deleting) ? 0.7 : 1 }}>{c.name}</td>
                  <td><img width='100' src={c.image} alt={c.name} /></td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(c)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteTask(c)} />
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
        <form className='form-inline' onSubmit={SaveCatRecipe}>
          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            placeholder='Nouvelle Catégorie de recette '
            value={fields.name}
            onChange={handleFieldChange}
          />
          <div className='upload-img-inline-container'>
            <input
              className='editor-form-input'
              name='picture'
              required
              accept='image/*'
              id='picture'
              type='file'
              onChange={e => uploadImage(e)}
            />
            {fields.image ? <img className='img-preview' src={fields.image} alt={fields.image} /> : <img className='img-preview' src={ImagePlaceholder} alt='img-placeholder' />}
          </div>
          <button
            className='form-button'
            onClick={SaveCatRecipe}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Enregistrer
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
