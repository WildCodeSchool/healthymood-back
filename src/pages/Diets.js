import React, { useState, useEffect } from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import API from '../services/API';
import '../Styles/Form.css';

function Diets () {
  const initialForm = ({
    name: ''
  });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceIsSaving, newResourceSaveError, collection: dietToShow, fetchCollectionError: fetchError, deleteResource } = useResourceCollection('/diet');

  const [Diet, setDiet] = useState([dietToShow]);
  const [totalDiet, setTotalDiet] = useState([]);
  const [loading, setLoading] = useState(false);
  const dietPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  useEffect(() => {
    const fetchDiet = async () => {
      setLoading(true);
      const res = await API.get('/diet?per_page=' + dietPerPage + '&page=' + currentPage);
      setDiet(res.data.data);
      setTotalDiet(res.data.total);
      setLoading(false);
    };
    fetchDiet();
  }, [currentPage, dietToShow]);

  for (let i = 1; i <= Math.ceil(totalDiet / dietPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  const DeleteDiets = async (diet) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce type de régime ?')) {
      deleteResource(diet.id, { optimistic: false });
    }
  };
  const SaveDiets = async (event) => {
    event.preventDefault();
    if (fields.name === '') {
      alert('Veuillez remplir les champs requis'); // eslint-disable-line
    } else {
      saveResource(fields, { optimistic: false });
      setFields(initialForm);
    }
  };
  const fillForm = async diet => {
    setFields(diet);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des types de régimes.</p>
      </div>
    );
  }
  if (!dietToShow) return 'Chargement...';
  function Renderlist () {
    return (
      <>
        <h2>Régimes</h2>
        <table className='render-list'>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {Diet.map(t => {
              return (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(t)} />
                    <DeleteOutlined className='delete-icon' onClick={() => DeleteDiets(t)} />
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
        <form className='form-inline' onSubmit={SaveDiets}>
          <input
            className='input-form-all'
            name='name'
            id='name'
            minLength='3'
            placeholder='Nouveau type de régime'
            value={fields.name}
            onChange={handleFieldChange}
            required
          />

          <button
            type='submit'
            className='form-button'
            onClick={SaveDiets}
            disabled={newResourceIsSaving}
          >
          Enregistrer
          </button>
          {newResourceSaveError && (
            <p className='errorText'>Une erreur s'est produite lors de la sauvegarde du type de régime.</p>
          )}
        </form>
      </div>
      {Renderlist()}
    </>

  );
}

export default Diets;
