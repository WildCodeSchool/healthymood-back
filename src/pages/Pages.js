import React, { useState, useEffect, useContext } from 'react';
import EditorComponent from '../components/EditorComponent';
import useEditor from '../hooks/useEditor';
import API from '../services/API';
import authContext from '../context/authContext';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/EditorForm.css';

const Pages = () => {
  let formData;
  const [content, handleEditorChange] = useEditor();
  const [state, setState] = useState({
    loading: false,
    showToast: false,
    message: null,
    success: false
  });
  const { token } = useContext(authContext);
  const userIdFromToken = jwtDecode(token).id;

  const toastr = (success, show, message) => {
    if (show) {
      if (success) {
        return toast.success(message);
      } else {
        return toast.error(message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const data = e.target;
    formData = {
      title: data.title.value,
      content: data.content.value,
      slug: data.slug.value,
      published: data.published.checked,
      user_id: userIdFromToken
    };
    API.post('/generic_pages', formData)
      .then(res => {
        setState({ ...state, showToast: true, success: true, message: `La page ${res.data.data.title} à été crée avec succès!` });
      })
      .catch(err => {
        console.warn(err);
        setState({ ...state, showToast: true, success: false, message: 'Erreur lors de la création de la page ' });
      })
      .finally(() => {
        setState({ ...state, loading: false });
      });
  };

  useEffect(() => {
    toastr(state.success, state.showToast, state.message);
  }, [state]);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoclose={5000}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
      <h1>Pages</h1>
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
        <button type='submit' className='btn' disabled={!!state.loading}>Ajouter</button>
      </form>
    </>
  );
};

export default Pages;
