import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';

const EditRecipes = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';

  const date = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState({
    name: '',
    slug: '',
    content: '',
    budget: null,
    published: false,
    created_at: date
  });

  useEffect(() => {
    if (editMode) {
      API.get(`/recipes/${id}`)
        .then(res => {
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []); // eslint-disable-line

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  };

  const handleChangeEditor = (content) => {
    setData({ ...data, content });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      API.patch(`/recipes/${id}`, data)
        .then(res => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/recipes', data)
        .then((res) => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='div-top-editor'>
            <input
              type='text'
              name='name'
              minLength='3'
              maxLength='20'
              value={data.name}
              placeholder='Ajouter un titre'
              onChange={(e) => handleChange(e)}
              required
            />
            <label className='hide-label' htmlFor='slug'>slug</label>
            <input
              type='text'
              name='slug'
              minLength='3'
              maxLength='20'
              value={data.slug}
              placeholder='Ajouter un slug'
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              type='number'
              name='budget'
              minLength='1'
              maxLength='20'
              value={data.budget}
              placeholder='Budget €'
              onChange={(e) => handleChange(e)}
              required
            />

          </div>
          <Editor
            apiKey={process.env.REACT_APP_API_KEY}
            value={data.content}
            initialValue=''
            init={{
              height: 500,
              autosave_interval: '5s',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'autosave'
              ],
              autosave_retention: '30m',
              autosave_restore_when_empty: true,
              toolbar:
                'undo redo | formatselect | bold italic backcolor blockquote | alignleft aligncenter alignright alignjustify | link image media | bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleChangeEditor}
          />
          <div className='div-bottom-editor'>
            <label htmlFor='published'>Publier </label>
            <input
              style={{ width: '30px' }}
              type='checkbox'
              name='published'
              checked={data.published}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type='submit' className='btn'>{editMode ? 'Modifier' : 'Ajouter'}</button>
        </form>
      </main>
    </>
  );
};

export default EditRecipes;
