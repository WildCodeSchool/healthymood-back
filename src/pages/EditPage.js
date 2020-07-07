import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/EditorForm.css';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  // let formData;
  // const [editPage, setEditPage] = useState([]);
  const [content, setContent] = useState([]);
  const [data, setData] = useState([]);

  function handleChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }
  function handleChangeEditor (content) {
    setContent({ ...data, content });
  }

  const handleSubmit = event => {
    event.preventDefault();
    setContent(content);
    console.log(content);
  };
  // API.post('/generic_pages', formData)
  //   .then(res => {
  //     history.push('/pages');
  //   })
  //   .catch(err => {
  //     console.warn(err);
  //   });

  /* useEffect(() => {
    if (id !== 'new') {
      API.get('/generic_pages/:id')
        .then(res => {
          setEditPage(console.log(res.data));
        });
    }
  }, []);
*/
  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            name='title'
            placeholder='Ajouter un titre'
            onChange={(e) => handleChange(e)}
            required
          />

          <label className='hide-label' htmlFor='slug'>slug</label>
          <input
            type='text'
            name='slug'
            placeholder='Ajouter un slug'
            onChange={(e) => handleChange(e)}
            required

          />
          <Editor
            apiKey={process.env.REACT_APP_API_KEY}
            value={content}
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
          <label className='hide-label' htmlFor='content'>contenu</label>
          <textarea className='hidden' name='content' value={content.content} />
          <label htmlFor='published'>
            Publier ?
          </label>
          <input
            type='checkbox'
            name='published'
            value={data.value}
            onChange={(e) => handleChange(e)}
          />
          <button type='submit' className='btn'>Ajouter</button>
        </form>
      </main>
    </>
  );
};

export default EditPage;
