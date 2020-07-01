import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function Ingredients () {
  const { fields, setFields, handleFieldChange } = useFormData({ name: '', is_allergen: false });
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: tasksToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/ingredients');

  const DeleteTask = async (task) => {
    if (window.confirm('Are you sure you want to delete this Ingredient?')) {
      deleteResource(task.id, { optimistic: true });
    }
  };
  const SaveTask = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields({ name: '', is_allergen: false });
  };
  const fillForm = async task => {
    setFields(task);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>An error occured while fetching Ingredients.</p>
      </div>
    );
  }
  if (!tasksToShow) return 'Loading...';
  function listRender () {
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
          {tasksToShow.data.map(t => {
            return (
              <tr key={t.id}>
                <td style={{ opacity: (!!t._saving || !!t._deleting) ? 0.7 : 1 }}>{t.name}</td>
                <td>
                  {t.is_allergen ? 'oui' : 'non'}
                </td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                  <DeleteOutlined className='delete-icon' onClick={() => DeleteTask(t)} />
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
        <form className='form-inline' onSubmit={SaveTask}>
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
            onClick={SaveTask}
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
