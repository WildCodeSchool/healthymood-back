import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Ingredients() {
  const initialform = ({ name: '', is_allergen: false })
  const { fields, setFields, handleFieldChange } = useFormData(initialform);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: tasksToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/ingredients');

  const DeleteIngredient = async (ingredient) => {
    if (window.confirm('Are you sure you want to delete this Ingredient?')) {
      deleteResource(ingredient.id, { optimistic: true });
    }
  };
  const SaveIngredient = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialform);
  };
  const fillForm = async ingredient => {
    setFields(ingredient);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur a la récuperation de la list d'ingrédients.</p>
      </div>
    );
  }
  if (!tasksToShow) return 'Loading...';
  function listRender() {
    return (
      <table className='list-render'>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Allergène</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {tasksToShow.map(t => {
            return (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  {t.is_allergen ? 'oui' : 'non'}
                </td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteIngredient(t)} />
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
      <h1> Ingredients</h1>
      <div>
        <form className='form-inline' onSubmit={SaveIngredient}>
          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='New Ingredient'
            value={fields.name}
            onChange={handleFieldChange}
          />
          <label>Allergene ?</label>
          <input
            className='input-form-all'
            type='checkbox'
            id='is_allergen'
            name='is_allergen'
            checked={fields.is_allergen}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveIngredient}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Save
          </button>
          {newResourceSaveError && (
            <p className='errorText'>An error occured while saving the task</p>
          )}
        </form>
      </div>
      {listRender()}
    </>

  );
}

export default Ingredients;
