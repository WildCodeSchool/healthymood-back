import React, { useState, useEffect } from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import API from '../services/API';
import '../Styles/Form.css';

function Meals () {
  const initialForm = ({
    name: ''
  });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: mealsToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/meal_types');

  const [meals, setMeals] = useState([mealsToShow]);
  const [totalMeals, setTotalMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const mealsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const res = await API.get('/meal_types?per_page=' + mealsPerPage + '&page=' + currentPage);
      setMeals(res.data.data);
      setTotalMeals(res.data.total);
      setLoading(false);
    };
    fetchMeals();
  }, [currentPage, mealsToShow]);

  for (let i = 1; i <= Math.ceil(totalMeals / mealsPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  const DeleteMeals = async (meal) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de repas ?')) {
      deleteResource(meal.id, { optimistic: true });
    }
  };
  const SaveMeal = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: true });
    setFields(initialForm);
  };
  const fillForm = async meal => {
    setFields(meal);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de repas.</p>
      </div>
    );
  }
  if (!mealsToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Types de repas</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {meals.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteMeals(t)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className='pagination'>
            {pageNumbers.map(number => (<li key={number}><Link onClick={() => paginate(number)} to='#' className='page-link'>{number}</Link></li>))}
          </ul>
        </nav>
      </>
    );
  }
  return (
    <>
      <div className='form-top'>
        <form className='form-inline' onSubmit={SaveMeal}>

          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            maxLength='20'
            placeholder='Nouveau type de repas'
            value={fields.name}
            onChange={handleFieldChange}
          />
          <button
            className='form-button'
            type='submit'
            onClick={SaveMeal}
            disabled={newResourceIsSaving || fields.name === ''}
          >
          Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de repas.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>
  );
}

export default Meals;
