import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Diets () {
  const initialForm = ({
    name: ''
  });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: dietToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/diet');

  const DeleteDiets = async (diet) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de régime ?')) {
      deleteResource(diet.id, { optimistic: true });
    }
  };
  const SaveDiets = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async diet => {
    setFields(diet);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de régimes.</p>
      </div>
    );
  }
  if (!dietToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Régimes</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {dietToShow.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteDiets(t)} />
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
        <form className='form-inline' onSubmit={SaveDiets}>
          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouveau type de régime'
            value={fields.name}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveDiets}
            disabled={newResourceIsSaving}
          >
          Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de régime.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>

  );
}

export default Diets;
