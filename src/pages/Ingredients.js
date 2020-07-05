import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Ingredients () {
  const initialForm = ({ name: '', is_allergen: false });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: ingredientsToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/ingredients');

  const DeleteIngredients = async (ingredient) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cet ingrédient ?')) {
      deleteResource(ingredient.id, { optimistic: true });
    }
  };
  const SaveIngredients = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async ingredient => {
    setFields(ingredient);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des ingrédients.</p>
      </div>
    );
  }
  if (!ingredientsToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <table className='render-list'>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Calories / 100gr</td>
            <td>Allergène</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {ingredientsToShow.map(t => {
            return (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.calories}</td>
                <td>
                  {t.is_allergen ? 'oui' : 'non'}
                </td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteIngredients(t)} />
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
        <form className='form-inline' onSubmit={SaveIngredients}>

          <input
            type='text'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouvel ingredient'
            value={fields.name}
            onChange={handleFieldChange}
          />
          <input
            type='text'
            required
            name='calories'
            id='calories'
            minLength='3'
            maxLength='20'
            placeholder='Calories / 100gr'
            value={fields.calories}
            onChange={handleFieldChange}
          />
          <label>Allergene ?</label>
          <input
            style={{ margin: '10px' }}
            type='checkbox'
            id='is_allergen'
            name='is_allergen'
            checked={fields.is_allergen}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveIngredients}
            disabled={newResourceIsSaving}
          >
            Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde de l'ingrédient.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>

  );
}

export default Ingredients;
