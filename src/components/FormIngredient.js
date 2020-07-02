import React, { useState, useEffect } from 'react';
import {
  _getElements,
  _createElement,
  _updateElement,
  _deleteElement
} from '../dataService/data.service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

function FormIngredient () {
  const initialIngredient = { name: '', is_allergen: false };
  const [Ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(initialIngredient);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    _getElements()
      .then(data => {
        setIngredients(data);
      }
      );
  }, []);

  function handleChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setCurrentIngredient(prevIngredient => ({ ...prevIngredient, [name]: value }));
  }

  function handleEdit (Ingredient) {
    setIsEditing(true);
    setCurrentIngredient(Ingredient);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (isEditing) {
      _updateElement(currentIngredient)
        .then(data => {
          setIngredients(data);
          setCurrentIngredient(currentIngredient);
          setIsEditing(false);
          console.log(data);
        }
        );
    } else {
      _createElement(currentIngredient)
        .then(data => {
          setIngredients(data);
          setCurrentIngredient(initialIngredient);
        }
        );
    }
  }

  function handleDelete (ingredientId) {
    _deleteElement(ingredientId).then(
      data => {
        setIngredients(data);
      }
    );
  }

  function listRender () {
    return Ingredients.map(I => (
      <tr key={I.id}>
        <td>{I.name}</td>
        <td>{I.is_allergen ? 'Oui' : 'Non'}</td>
        <td className='actions-column'>
          <EditOutlined className='edit-icon' onClick={() => handleEdit(I)} />
          <DeleteOutlined className='delete-icon' onClick={() => handleDelete(I.id)} />
        </td>
      </tr>
    ));
  }

  function formRender () {
    return (
      <form class='form-inline' onSubmit={handleSubmit}>
        <div>
          <label className='hide-label' for='name'> Nom de l'ingredient :</label>
          <input
            placeholder='Ajouter un ingrédient'
            type='text'
            name='name'
            required
            value={currentIngredient.name}
            onChange={handleChange}
          />
        </div>
        <div className='is-allergen-container'>
          <label for='is_allergen'>Allergène
            <input
              type='checkbox'
              name='is_allergen'
              value={Ingredients.is_allergen}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className='btn' type='submit'>Enregistrer</button>
        <div className='search-container'>
          <label className='hide-label' for='ingredient-search'>Rechercher un ingredient</label>
          <input placeholder='Rechercher un ingrédient' type='search' id='ingredient-search' name='q' aria-label='Search through ingredients' />
          <button className='btn' type='search'>Rechercher</button>
        </div>
      </form>
    );
  }
  return (
    <div>
      {formRender()}
      <div className='scroll'>
        <table>
          <thead>
            <tr>
              <th className='name-column'>Ingrédient</th>
              <th className='-allergen-column'>Allergène</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{listRender()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default FormIngredient;