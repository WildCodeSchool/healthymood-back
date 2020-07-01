import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Dishes () {
  const initialForm = ({name: ''});
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: dishesToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/dish_types');

  const DeleteDishes = async (dish) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de plat ?')) {
      deleteResource(dish.id, { optimistic: true });
    }
  };
  const SaveDishes = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async dish => {
    setFields(dish);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de plat.</p>
      </div>
    );
  }
  if (!dishesToShow) return 'Chargement...';
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
          {dishesToShow.map(t => {
            return (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteDishes(t)} />
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
      <form className='form-inline' onSubmit={SaveDishes}>
        <div>
          <input
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouveau type de plat'
            value={fields.name}
            onChange={handleFieldChange}
          />
        </div>
        <button
          className='form-button'
          onClick={SaveDishes}
          disabled={newResourceIsSaving || fields.name === ''}
        >
          Enregistrer
        </button>
        {newResourceSaveError && (
          <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de plat.</p>
        )}
      </form>
      {Renderlist()}
    </>

  );
}

export default Dishes;

