import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import API from '../services/API';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import TagSelect from '../components/TagSelect';
import SingleSelect from '../components/SingleSelect';
import queryString from 'query-string';
import ImagePlaceholder from '../images/image_placeholder.png';

const EditRecipes = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';

  const [allIngredients, setAllIngredients] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([]);
  const [allDiets, setAllDiets] = useState([]);
  const [chosenDiets, setChosenDiets] = useState([]);
  const [chosenMealTypes, setChosenMealTypes] = useState([]);
  const [allMealTypes, setAllMealTypes] = useState([]);
  const [chosenDishTypes, setChosenDishTypes] = useState([]);
  const [allDishTypes, setAllDishTypes] = useState([]);
  const [chosenRecipeCategory, setChosenRecipeCategory] = useState(null);
  const [allRecipeCategories, setAllRecipeCategories] = useState([]);

  const date = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState({
    name: '',
    slug: '',
    content: '',
    calories: 0,
    preparation_duration_seconds: 0,
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
  const tagToOption = (tag) => ({ value: tag.id, label: tag.name });

  const getAllMealTypes = () => {
    return getResourceCollection('meal_types/all').then((tags) => {
      const options = tags.map(tagToOption);
      setAllMealTypes(options);
      return options;
    });
  };

  const getAllIngredients = () => {
    return getResourceCollection('ingredients/all').then((tags) => {
      const options = tags.map(tagToOption);
      setAllIngredients(options);
      return options;
    });
  };

  const getAllRecipeCategories = () => {
    return getResourceCollection('recipe_categories/all').then((tags) => {
      const options = tags.map(tagToOption);
      setAllRecipeCategories(options);
      return options;
    });
  };

  const getAllDiets = () => {
    return getResourceCollection('diet/all').then((tags) => {
      const options = tags.map(tagToOption);
      setAllDiets(options);
      return options;
    });
  };

  const getAllDishs = () => {
    return getResourceCollection('dish_types/all').then((tags) => {
      const options = tags.map(tagToOption);
      setAllDishTypes(options);
      return options;
    });
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
      .then((res) => res.data)
      .then((tab) => {
        setData({ ...data, image: tab });
      });
  };
  const populateInputs = (
    allMealTypes,
    allIngredients,
    allDiets,
    allDishTypes,
    allRecipeCategories
  ) => {
    const query = queryString.parse({ arrayFormat: 'bracket' });
    const {meal_types, ingredients, diets, dish_types, recipe_categories } = query; // eslint-disable-line
    if (meal_types) { // eslint-disable-line
      setChosenMealTypes(
        allMealTypes.filter((mealType) =>
          meal_types.includes(mealType.value.toString())
        )
      );
    }
    if (ingredients) {
      setChosenIngredients(
        allIngredients.filter((ingredient) =>
          ingredients.includes(ingredient.value.toString())
        )
      );
    }
    if (diets) {
      setChosenDiets(
        allDiets.filter((diet) => diets.includes(diet.value.toString()))
      );
    }
    if (dish_types) { // eslint-disable-line
      setChosenDishTypes(
        allDishTypes.filter((dish) =>
          dish_types.includes(dish.value.toString())
        )
      );
    }
    if (recipe_categories) { // eslint-disable-line
      setChosenRecipeCategory(
        allRecipeCategories.find((recipe) =>
          recipe_categories.includes(recipe.value.toString())
        )
      );
    }
  }; // eslint-disable-line

  useEffect(() => {
    if (editMode) {
      API.get(`/recipes/${id}`)
        .then((res) => {
          setData({ ...res.data.data });
          setChosenIngredients(res.data.data.ingredients.map(tagToOption));
          setChosenDishTypes(res.data.data.dish_types.map(tagToOption));
          setChosenMealTypes(res.data.data.mealType.map(tagToOption));
          setChosenDiets(res.data.data.diets.map(tagToOption));
          setChosenRecipeCategory(
            res.data.data.category
              ? {
                label: res.data.data.category.name,
                value: res.data.data.category.id
              }
              : null
          );
        })
        .catch((err) => {
          console.error(err);
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
      API.patch(`/recipes/${id}`, {
        ...data,
        ingredients: chosenIngredients,
        dish_types: chosenDishTypes,
        meal_types: chosenMealTypes,
        diets: chosenDiets,
        recipe_category: chosenRecipeCategory
      })
        .then((res) => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/recipes', {
        ...data,
        ingredients: chosenIngredients,
        dish_types: chosenDishTypes,
        meal_types: chosenMealTypes,
        diets: chosenDiets,
        recipe_category: chosenRecipeCategory
      })
        .then((res) => {
          history.push('/recipes');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };
  useEffect(() => {
    Promise.all([
      getAllMealTypes(),
      getAllIngredients(),
      getAllDiets(),
      getAllDishs(),
      getAllRecipeCategories()
    ]).then(
      ([
        allMealTypes,
        allIngredients,
        allDiets,
        allDishTypes,
        allRecipeCategories
      ]) => {
        populateInputs(
          allMealTypes,
          allIngredients,
          allDiets,
          allDishTypes,
          allRecipeCategories
        );
      }
    );
  }, []); // eslint-disable-line

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='editor-group'>
            <div className='editor-form-input-container'>
              <label htmlFor='name'>Nom</label>
              <input
                className='editor-form-input'
                type='text'
                name='name'
                minLength='3'
                value={data.name}
                placeholder='Ajouter un titre'
                onChange={(e) => handleChange(e)}
                required
              />

              <label htmlFor='slug'>Slug</label>
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
              <label htmlFor='intro'>Intro</label>
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
              <label htmlFor='budget'>Budget</label>
              <input
                className='editor-form-input'
                type='number'
                name='budget'
                value={data.budget}
                placeholder='Budget €'
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor='calories'>Calories</label>
              <input
                className='editor-form-input'
                type='number'
                name='calories'
                value={parseInt(data.calories)}
                placeholder='Nombre total de calories'
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor='preparation_duration_seconds'>
                Temps de préparation
              </label>
              <input
                className='editor-form-input'
                type='number'
                name='preparation_duration_seconds'
                value={parseInt(data.preparation_duration_seconds)}
                placeholder='Temps de préparation (en minutes)'
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

          <aside className='aside fit-content'>
            <div className='upload-img-container'>
              <input
                className='editor-form-input'
                name='picture'
                accept='image/*'
                id='picture'
                type='file'
                onChange={(e) => uploadImage(e)}
              />
              <div className='img-preview-container'>
                {data.image ? (
                  <img
                    src={data.image}
                    className='img-preview'
                    alt={data.image}
                  />
                ) : (
                  <img
                    className='img-preview'
                    src={ImagePlaceholder}
                    alt='img-placeholder'
                  />
                )}
              </div>
            </div>

            <div className='tag-select-container'>
              <TagSelect
                options={allIngredients}
                value={chosenIngredients}
                onChange={(newValues) => {
                  setChosenIngredients(newValues);
                }}
                placeholder='Ingrédients'
                className='tag-select'
              />
              <br />
              <TagSelect
                options={allDiets}
                value={chosenDiets}
                onChange={(newValues) => {
                  setChosenDiets(newValues);
                }}
                placeholder='Régime spéciaux'
                className='tag-select'
              />
              <br />
              <TagSelect
                className='tag-select'
                options={allMealTypes}
                value={chosenMealTypes}
                onChange={(newValues) => {
                  setChosenMealTypes(newValues);
                }}
                placeholder='Types de repas'
              />
              <br />
              <TagSelect
                className='tag-select'
                options={allDishTypes}
                value={chosenDishTypes}
                onChange={(newValues) => {
                  setChosenDishTypes(newValues);
                }}
                placeholder='Types de Plat'
              />
              <br />
              <SingleSelect
                className='tag-select'
                options={allRecipeCategories}
                value={chosenRecipeCategory}
                onChange={(newValues) => {
                  setChosenRecipeCategory(newValues);
                }}
                placeholder='Types de Catégorie'
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
              <button
                type='submit'
                className={data.published ? 'btn publish' : 'btn'}
              >
                {editMode
                  ? 'Modifier'
                  : data.published
                    ? 'Publier'
                    : 'Sauvegarder'}
              </button>
            </div>
          </aside>
        </form>
      </main>
    </>
  );
};

export default EditRecipes;
