import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import API from '../services/API';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const Recipes = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const recipesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  const handleDelete = (id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette Recette ?')) {
      API.delete(`/recipes/${id}`)
        .then(res => {
          const currentRecipe = recipes.filter(r => r.id !== id);
          setRecipes(currentRecipe);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    API.get('/recipes')
      .then(res => {
        setRecipes(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const res = await API.get('/recipes?per_page=' + recipesPerPage + '&page=' + currentPage);
      setRecipes(res.data.data);
      setTotalRecipes(res.data.total);
      setLoading(false);
    };
    fetchRecipes();
  }, [currentPage]);

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  return (
    <>
      <div style={{ paddingTop: '20px' }}>
        <Link to='/recipes/edit/new'>
          <button className='form-button'>Ajouter</button>
        </Link>
      </div>

      <br />
      <table className='render-list'>
        <thead>
          <tr>
            <td>Titre</td>
            <td>Slug</td>
            <td>Image principale</td>
            <td>Date</td>
            <td>Publié</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {recipes.map(r => {
            return (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.slug}</td>
                <td>
                  <img src={r.image} alt='recette' className='img-uploaded' />
                </td>
                <td>Crée le : {moment(r.created_at).format('DD/MM/YYYY')}</td>
                <td>{r.published === 0 ? 'Non' : 'Oui'}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => history.push(`/recipes/edit/${r.id}`)} />
                  <DeleteOutlined className='delete-icon' onClick={() => handleDelete(r.id)} />
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
};
export default Recipes;
