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

  const handleDelete = (id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette Recette ?')) {
      API.delete(`/recipes/${id}`)
        .then(res => {
          const currentRecipe = recipes.filter(r => r.id !== id);
          setRecipes(currentRecipe);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  useEffect(() => {
    API.get('/recipes')
      .then(res => {
        setRecipes(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // eslint-disable-line

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

    </>
  );
};
export default Recipes;
