import React, { useState, useEffect } from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import API from '../services/API';
import '../Styles/Form.css';

function Dishes () {
  const initialForm = ({ name: '' });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: dishesToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/dish_types');

  const [dishes, setDishes] = useState([dishesToShow]);
  const [totalDishes, setTotalDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const dishesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      const res = await API.get('/dish_types?per_page=' + dishesPerPage + '&page=' + currentPage);
      setDishes(res.data.data);
      setTotalDishes(res.data.total);
      setLoading(false);
    };
    fetchDishes();
  }, [currentPage, dishesToShow]);

  for (let i = 1; i <= Math.ceil(totalDishes / dishesPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  const DeleteDishes = async (dish) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de plat ?')) {
      deleteResource(dish.id, { optimistic: false });
    }
  };
  const SaveDishes = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: false });
    setFields(initialForm);
  };
  const fillForm = async dish => {
    setFields(dish);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de plat.</p>
      </div>
    );
  }
  if (!dishesToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Types de plats</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {dishes.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteDishes(t)} />
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
        <form className='form-inline' onSubmit={SaveDishes}>

          <input
            className='input-form-all'
            required
            name='name'
            id='name'
            minLength='3'
            placeholder='Nouveau type de plat'
            value={fields.name}
            onChange={handleFieldChange}
          />

          <button
            className='form-button'
            onClick={SaveDishes}
            disabled={newResourceIsSaving || fields.name === ''}
          >
          Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de plat.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>

  );
}

export default Dishes;
