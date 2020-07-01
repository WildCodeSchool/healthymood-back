import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';
import '../Styles/Users.css';

function Users() {
  const initialForm = ({ firstname: '', username: '', email: '', is_admin: false, blocked: false, password: '123' });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: tasksToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/users');

  const DeleteTask = async (task) => {
    if (window.confirm('Etes vous certain de supprimer cet Utilisteur ?')) {
      deleteResource(task.id, { optimistic: false });
    }
  };
  const SaveTask = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields({ initialForm });
  };
  const fillForm = async task => {
    setFields(task);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>An error occured while fetching Users.</p>
      </div>
    );
  }
  if (!tasksToShow) return 'Loading...';
  function listRender() {
    return (
      <>
        <table className='list-render'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Pseudo</td>
              <td>Adresse de messagerie</td>
              <td>Administrateur</td>
              <td>Autorisé/Bloqué</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {tasksToShow.data.map(t => {
              return (
                <tr key={t.id}>
                  <td style={{ opacity: (!!t._saving || !!t._deleting) ? 0.7 : 1 }}>{t.firstname}</td>

                  <td>{t.username}</td>
                  <td>{t.email}</td>
                  <td>{t.is_admin ? 'oui' : 'non'}</td>
                  <td>{t.blocked ? 'Bloqué' : 'Autorisé'}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteTask(t)} />
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
      <h1> Gestion des Utilisateurs</h1>
      <div>

        <form className='form-inline' onSubmit={SaveTask}>
          <input
            className='input-form-all'
            required
            name='firstname'
            type='text'
            id='firstname'
            minLength='3'
            maxLength='20'
            placeholder='Nouvel Utilisateur '
            value={fields.firstname}
            onChange={handleFieldChange}
          />
          <input
            className='input-form-all'
            required
            type='text'
            name='username'
            id='username'
            minLength='3'
            maxLength='20'
            placeholder='Pseudo'
            value={fields.username}
            onChange={handleFieldChange}
          />

          <input
            className='input-form-all'
            type='email'
            id='email'
            name='email'
            placeholder='email '
            value={fields.email}
            onChange={handleFieldChange}
            required
          />
          <div style={{ margin: '10px' }}><h3>Admin</h3></div>

          <label className='switch'>
            <input
              className='input-form-all'
              required
              type='checkbox'
              name='is_admin'
              id='is_admin'
              minLength='3'
              maxLength='20'
              placeholder='Role'
              checked={fields.is_admin}
              onChange={handleFieldChange}
            />
            <div className='slider' />
          </label>

          <div style={{ margin: '10px' }}><h3>Autorisé/Bloqué</h3></div>
          <label className='switch'>
            <input
              className='input-form-all'
              required
              type='checkbox'
              name='blocked'
              id='blocked'
              minLength='3'
              maxLength='20'
              placeholder='bloqué ? '
              checked={fields.blocked}
              onChange={handleFieldChange}
            />
            <div className='slider' />
          </label>

          <button
            className='form-button'
            onClick={SaveTask}
            disabled={newResourceIsSaving || fields.firstname === ''}
          >
            Save
          </button>
          {newResourceSaveError && (
            <p className='errorText'>An error occured while saving the Recipes</p>
          )}
        </form>
      </div>
      {listRender()}
    </>
  );
}

export default Users;
