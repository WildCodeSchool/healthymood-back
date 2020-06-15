import React, { useState } from 'react';
import '../Styles/form.css';

const FormRecipeCategory = () => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: e.target.name.value
    });
    console.log(formData);
  };

  return (
    <form className='form-inline' onSubmit={(e) => handleSubmit(e)}>
      <div className='form-group'>
        <label htmlFor='name'>Nom de la category </label>
        <input name='name' id='name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} type='text' required placeholder='Entrez un nom' />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Nom de la category</label>
      </div>
      <button type='submit'>Enregistrer</button>
    </form>
  );
};

export default FormRecipeCategory;
