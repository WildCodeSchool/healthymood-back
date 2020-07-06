import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import EditorComponent from '../components/EditorComponent';
import useEditor from '../hooks/useEditor';
import API from '../services/API';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/EditorForm.css';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  let formData;
  const [editPage, setEditPage] = useState([]);
  const [content, handleEditorChange] = useEditor();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    formData = {
      title: data.title.value,
      content: data.content.value,
      slug: data.slug.value,
      published: data.published.checked,
      user_id: 25
    };
    API.post('/generic_pages', formData)
      .then(res => {
        history.push('/pages');
      })
      .catch(err => {
        console.warn(err);
      });
  };

  useEffect(() => {
    if (id !== 'new') {
      API.get('/generic_pages/:id')
        .then(res => {
          setEditPage(console.log(res.data));
        });
    }
  }, []);

  return (
    <>
      <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
        <label className='hide-label' htmlFor='title'>titre</label>
        <input type='text' name='title' placeholder='Ajouter un titre' required />
        <label className='hide-label' htmlFor='slug'>slug</label>
        <input type='text' name='slug' placeholder='Ajouter un slug' required />
        <EditorComponent
          apiKey={process.env.REACT_APP_API_KEY}
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
          value={content}
          onSaveContent={(e) => handleEditorChange(e)}
        />
        <label className='hide-label' htmlFor='content'>contenu</label>
        <textarea className='hidden' name='content' value={content.content} />
        <label htmlFor='published'>
            Publier ?
        </label>
        <input type='checkbox' name='published' />
        <button type='submit' className='btn'>Ajouter</button>
      </form>
    </>
  );
};

export default EditPage;
