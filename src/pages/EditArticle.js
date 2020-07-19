import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import SingleSelect from '../components/SingleSelect';
import queryString from 'query-string';
import ImagePlaceholder from '../images/image_placeholder.png';

const EditArticle = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';
  const [chosenArticleCategory, setChosenArticleCategory] = useState(null);
  const [allArticleCategories, setAllArticleCategories] = useState([]);

  const date = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState({
    title: '',
    slug: '',
    intro: '',
    content: '',
    created_at: date,
    image: '',
    article_category_id: ''
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

  const tagToOption = tag => ({ value: tag.id, label: tag.name });

  const getAllArticleCategory = () => {
    return getResourceCollection('article_categories')
      .then(tags => {
        const options = tags.map(tagToOption);
        setAllArticleCategories(options);
        return options;
      });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData(); // eslint-disable-line
    formData.append('picture', image);
    API.post('/articles/uploads', formData, {
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
      API.get(`/articles/${id}`)
        .then(res => {
          setData({ ...res.data.data });
          setChosenArticleCategory(res.data.data.categoryArticle ? { label: res.data.data.categoryArticle.name, value: res.data.data.categoryArticle.id } : null)
          console.log(chosenArticleCategory)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []); // eslint-disable-line

  const populateInputs = (allArticleCategories) => {
    const query = queryString.parse({ arrayFormat: 'bracket' });
    const { article_categories } = query; // eslint-disable-line
    if (article_categories) { // eslint-disable-line
      setChosenArticleCategory(allArticleCategories.find(category => article_categories.includes(category.value.toString())));
    }
  };

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
      API.patch(`/articles/${id}`, ({ ...data, article_category: chosenArticleCategory }))
        .then(res => {
          history.push('/articles');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/articles', ({ ...data, article_category: chosenArticleCategory }))
        .then((res) => {
          history.push('/articles');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };
  useEffect(() => {
    Promise.all([getAllArticleCategory()])
      .then(([allArticleCategories]) => {
        populateInputs(allArticleCategories);
      });
  }, [])// eslint-disable-line

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
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
              <label className='hide-label' htmlFor='intro'>intro</label>
              <input
                className='editor-form-input'
                type='text'
                name='intro'
                minLength='3'
                value={data.intro}
                placeholder='Ajouter une introduction'
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
              <br></br>
              <SingleSelect
                className='tag-select'
                options={allArticleCategories}
                value={chosenArticleCategory}
                onChange={(newValues) => {
                  setChosenArticleCategory(newValues);
                }}
                placeholder='Types de Catégorie'
              />
              <div>
                {data.image ? <img src={data.image} className='img-preview' alt={data.image} /> : <img className='img-preview' src={ImagePlaceholder} alt='img-placeholder' />}
              </div>
            </div>
            <div className='editor-bottom-container'>
              <button type='submit' className='btn'>{editMode ? 'Modifier' : 'Ajouter'}</button>
            </div>
          </aside>
        </form>
      </main>
    </>
  );
};

export default EditArticle;
