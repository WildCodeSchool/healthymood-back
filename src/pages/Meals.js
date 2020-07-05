import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Meals () {
  const initialForm = ({
    name: ''
  });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: mealsToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/meal_types');

  const DeleteMeals = async (meal) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de repas ?')) {
      deleteResource(meal.id, { optimistic: true });
    }
  };
  const SaveMeal = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async meal => {
    setFields(meal);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de repas.</p>
      </div>
    );
  }
  if (!mealsToShow) return 'Chargement...';
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
          {mealsToShow.map(t => {
            return (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteMeals(t)} />
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
      <div className='form-top'>
        <form className='form-inline' onSubmit={SaveMeal}>

          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouveau type de repas'
            value={fields.name}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveMeal}
            disabled={newResourceIsSaving || fields.name === ''}
          >
            Save
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de repas.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>
  );
}

export default Meals;
