import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';

  const [data, setData] = useState({
    title: '',
    slug: '',
    content: '',
    display_in_footer: false,
    published: false
  });

  useEffect(() => {
    if (editMode) {
      API.get(`/generic_pages/${id}`)
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
      API.patch(`/generic_pages/${id}`, data)
        .then(res => {
          history.push('/pages');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/generic_pages', data)
        .then((res) => {
          history.push('/pages');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form-center' onSubmit={(e) => handleSubmit(e)}>

          <div className='editor-group'>
            <div className='editor-form-input-container'>
              <input
                className='editor-form-input'
                type='text'
                name='title'
                minLength='3'
                value={data.title}
                placeholder='Ajouter un titre'
                onChange={(e) => handleChange(e)}
                required
              />
              <label className='hide-label' htmlFor='slug'>slug</label>
              <input
                className='editor-form-input'
                type='text'
                name='slug'
                minLength='3'
                value={data.slug}
                placeholder='Ajouter un slug'
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
                media_live_embeds: true,
                paste_data_images: true,
                toolbar:
                  'undo redo | formatselect | bold italic backcolor blockquote | alignleft aligncenter alignright alignjustify | link image media | bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={handleChangeEditor}
            />
            <div className='editor-bottom-container'>
              <div className='editor-checkbox-container'>
                <label className='editor-checkbox-label' htmlFor='display_in_footer'>
                  <input
                    style={{ width: '30px' }}
                    type='checkbox'
                    name='display_in_footer'
                    checked={data.display_in_footer}
                    onChange={(e) => handleChange(e)}
                  />
                Visible dans le footer
                </label>
                <label className='editor-checkbox-label' htmlFor='published'>
                  <input
                    style={{ width: '30px' }}
                    type='checkbox'
                    name='published'
                    checked={data.published}
                    onChange={(e) => handleChange(e)}
                  />
                Publier
                </label>
              </div>
              <button type='submit' className='btn'>{editMode ? 'Modifier' : 'Ajouter'}</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditPage;
