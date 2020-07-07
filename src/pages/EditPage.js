import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/EditorForm.css';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false
  });

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
      API.put(`/generic_pages/${id}`, data) // TODO : Régler cette erreur 500
        .then((res) => {
          history.push('/pages');
          console.log(res.data.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/generic_pages', data)
        .then((res) => {
          history.push('/pages');
          console.log(res.data.data);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  useEffect(() => {
    if (parseInt(id) !== 'new') {
      API.get(`/generic_pages/${id}`)
        .then((res) => {
          setEditMode(true);
          setData({ ...res.data.data });
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            name='title'
            value={data.title}
            placeholder='Ajouter un titre'
            onChange={(e) => handleChange(e)}
            required
          />

          <label className='hide-label' htmlFor='slug'>
            slug
          </label>
          <input
            type='text'
            name='slug'
            value={data.slug}
            placeholder='Ajouter un slug'
            onChange={(e) => handleChange(e)}
            required
          />
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
          <label htmlFor='published'>Publier ?</label>
          <input
            type='checkbox'
            name='published'
            checked={data.published}
            onChange={(e) => handleChange(e)}
          />
          <button type='submit' className='btn'>
            {editMode ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </main>
    </>
  );
};

export default EditPage;
