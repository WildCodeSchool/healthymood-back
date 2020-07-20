import React, { useState, useEffect } from 'react';
// import API from '../services/API';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { useHistory, Link } from 'react-router-dom';
import '../Styles/Form.css';
// import QueryString from 'query-string';

function Ingredients () {
  // const history = useHistory();
  const initialForm = ({ name: '', is_allergen: false, calories: 0 });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: ingredientsToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/ingredients');

  // const [ingredients, setIngredients] = useState([ingredientsToShow]);
  // const [totalIngredients, setTotalIngredients] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const ingredientsPerPage = 8;
  // const [currentPage, setCurrentPage] = useState(1);
  // const paginate = pageNumber => {
  //   history.push(`/ingredients?page=${pageNumber}`);
  // };
  // const pageNumbers = [];

  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     setLoading(true);
  //     const res = await API.get('/ingredients?per_page=' + ingredientsPerPage + '&page=' + currentPage);
  //     setIngredients(res.data.data);
  //     setTotalIngredients(res.data.total);
  //     setLoading(false);
  //   };
  //   fetchIngredients();
  // }, [currentPage, ingredientsToShow]);

  // useEffect(() => {
  //   QueryString.parse(window.location.search);
  // }, []);

  // for (let i = 1; i <= Math.ceil(totalIngredients / ingredientsPerPage); i++) { pageNumbers.push(i); }
  // if (loading) { return <h2>Loading...</h2>; }

  const DeleteIngredients = async (ingredient) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cet ingrédient ?')) {
      deleteResource(ingredient.id, { optimistic: true });
    }
  };
  const SaveIngredients = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async ingredient => {
    setFields(ingredient);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des ingrédients.</p>
      </div>
    );
  }
  if (!ingredientsToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Ingrédients</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Calories / 100gr</td>
              <td>Allergène</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {ingredientsToShow.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.calories}</td>
                  <td>
                    {t.is_allergen ? 'oui' : 'non'}
                  </td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteIngredients(t)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <nav>
          <ul className='pagination'>
            {pageNumbers.map(number => (<li key={number}><Link onClick={() => paginate(number)} to='#' className='page-link'>{number}</Link></li>))}
          </ul>
        </nav> */}
      </>
    );
  }
  return (
    <>
      <div className='form-top'>
        <form className='form-inline' onSubmit={SaveIngredients}>
          <input
            className='input-form-all'
            type='text'
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouvel ingredient'
            value={fields.name}
            onChange={handleFieldChange}
            required
          />
          <input
            className='input-form-all'
            type='number'
            name='calories'
            minLength='1'
            maxLength='20'
            value={fields.calories}
            placeholder='Calories / 100gr'
            onChange={handleFieldChange}
            required
          />
          <label>Allergene ?</label>
          <input
            className='input-form-all'
            type='checkbox'
            id='is_allergen'
            name='is_allergen'
            checked={fields.is_allergen}
            onChange={handleFieldChange}
          />
          <button
            type='submit'
            className='form-button'
            disabled={newResourceIsSaving}
          >
            Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde de l'ingrédient.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>

  );
}

export default Ingredients;
