import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import TagSelect from '../components/TagSelect';
import queryString from 'query-string';
import ImagePlaceholder from '../images/image_placeholder.png';

const EditRecipes = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';
  const [allIngredients, setAllIngredients] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  const date = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState({
    name: '',
    slug: '',
    content: '',
    budget: null,
    published: true,
    created_at: date,
    image: '',
    intro: ''
  });

  const getResourceCollection = async (url) => {
    let data = [];
    try {
      const result = await API.get(url);
      data = await result.data.data;
    } catch (err) {
      console.error(err);
    }
    return data;
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData(); // eslint-disable-line
    formData.append('picture', image);
    API.post('/recipes/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.data)
      .then(tab => {
        setData({ ...data, image: tab });
      });
  };

  useEffect(() => {
    if (editMode) {
      API.get(`/recipes/${id}`)
        .then(res => {
          setData({ ...res.data.data });
          setChosenIngredients(res.data.data.ingredients.map(tagToOption));

          console.log(res.data.data);
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
      API.patch(`/recipes/${id}`, ({ ...data, ingredients: chosenIngredients }))
        .then(res => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/recipes', ({ ...data, ingredients: chosenIngredients }))
        .then((res) => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  const populateInputs = (allIngredients) => {
    const query = queryString.parse({ arrayFormat: 'bracket' });
    const { ingredients } = query; // eslint-disable-line
    if (ingredients) {
      setChosenIngredients(allIngredients.filter(ingredient => ingredients.includes(ingredient.value.toString())));
    }
  };

  useEffect(() => {
    Promise.all([getAllIngredients()])
      .then(([allIngredients]) => {
        populateInputs(allIngredients);
      });
  }, []) // eslint-disable-line
  const tagToOption = tag => ({ value: tag.id, label: tag.name });
  const getAllIngredients = () => {
    return getResourceCollection('ingredients')
      .then(tags => {
        const options = tags.map(tagToOption);
        setAllIngredients(options);
        return options;
      });
  };

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>

          <div className='editor-group'>
            <div className='editor-form-input-container'>
              <input
                className='editor-form-input'
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
                className='editor-form-input'
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
                className='editor-form-input'
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
                width: '100%',
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
          </div>

          <aside className='aside'>
            <div className='upload-img-container'>
              <input
                className='editor-form-input'
                name='picture'
                accept='image/*'
                id='picture'
                type='file'
                onChange={e => uploadImage(e)}
              />
              <div className='img-preview-container'>
                {data.image ? <img src={data.image} className='img-preview' alt={data.image} /> : <img className='img-preview' src={ImagePlaceholder} alt='img-placeholder' />}
              </div>
            </div>

            <div className='tag-select'>
              <TagSelect
                options={allIngredients}
                name='tag-select'
                value={chosenIngredients}
                onChange={(newValues) => {
                  setChosenIngredients(newValues);
                }}
                placeholder='Ingrédients'
              />
            </div>
            <div className='editor-bottom-container'>
              <div className='label-input-container'>
                <input
                  style={{ width: '30px' }}
                  type='checkbox'
                  name='published'
                  checked={data.published}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor='published'>Publier </label>
              </div>
              <button type='submit' className={data.published ? 'btn publish' : 'btn'}>{editMode ? 'Modifier' : data.published ? 'Publier' : 'Sauvegarder'}</button>
            </div>
          </aside>
        </form>
      </main>
    </>
  );
};

export default EditRecipes;
