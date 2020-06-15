import React, { useState, useEffect } from 'react';
import { _getElements, _createElement, _updateElement, _deleteElement } from '../dataService/data.service';
import '../Styles/Form.css';

function FormArticleCategory () {
  const initialForm = { name: '' };
  const [articleCategory, setArticleCategory] = useState([]);
  const [currentArticleCategory, setCurrentArticleCategory] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    _getElements()
      .then(data => {
        setArticleCategory(data);
      }
      );
  }, []);

  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCurrentArticleCategory(prevArticleCategory => ({ ...prevArticleCategory, [name]: value }));
  }
  function handleEdit (articleCategory) {
    setIsEditing(true);
    setCurrentArticleCategory(articleCategory);
  }
  function handleSubmit (e) {
    e.preventDefault();
    if (isEditing) {
      _updateElement(currentArticleCategory)
        .then(data => {
          setArticleCategory(data);
          setCurrentArticleCategory(currentArticleCategory);
          setIsEditing(false);
          console.log(data);
        }
        );
    } else {
      _createElement(currentArticleCategory)
        .then(
          data => {
            setArticleCategory(data);
            setCurrentArticleCategory(initialForm);
          }
        );
    }
  }
  function handleDelete (articleCategoryId) {
    _deleteElement(articleCategoryId).then(
      data => {
        setArticleCategory(data);
      }
    );
  }
  function listRender () {
    return articleCategory.map(a => (
      <tr key={a.id}>
        <td>{a.name}</td>
        <td>
          <button onClick={() => handleEdit(a)}>Edit</button>
          <button onClick={() => handleDelete(a.id)}>Delete</button>
        </td>
      </tr>
    ));
  }
  function formRender () {
    return (
      <form className='form-inline' onSubmit={handleSubmit}>
        <div>
          <label>Nom de Categorie</label>
          <input
            type='text'
            name='name'
            required
            value={currentArticleCategory.name}
            onChange={handleChange}
          />
        </div>
        <button>Envoyer</button>
      </form>
    );
  }
  return (
    <div>
      {formRender()}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{listRender()}</tbody>
      </table>
    </div>
  );
}

export default FormArticleCategory;
