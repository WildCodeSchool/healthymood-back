import React from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function CategoryArticles () {
  const { fields, setFields, handleFieldChange } = useFormData({ name: '' });
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: tasksToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/article_categories');

  const DeleteTask = async (task) => {
    if (window.confirm('Are you sure you want to delete this Catégorie?')) {
      deleteResource(task.id, { optimistic: true });
    }
  };
  const SaveTask = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields({ name: '' });
  };
  const fillForm = async task => {
    setFields(task);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>An error occured while fetching the tasks.</p>
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
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {tasksToShow.data.map(t => {
            return (
              <tr key={t.id}>
                <td style={{ opacity: (!!t._saving || !!t._deleting) ? 0.7 : 1 }}>{t.name}</td>
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
      <form className='form-inline' onSubmit={SaveTask}>
        <div>
          <input
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder="Nouvelle Catégorie d'article"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </div>
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
      {listRender()}
    </>

  );
}

export default CategoryArticles;
