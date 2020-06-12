import React, { useState } from "react";
import '../Styles/form.css'

const FormIngredient = () => {
  const [formData, setFormData] = useState({
    name: '',
    is_allergen: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: e.target.name.value, is_allergen: e.target.is_allergen.checked,
    });
    console.log(formData)
  };

  return (
    <form className="form-inline" onSubmit={(e) => handleSubmit(e)}>
      <div className='form-group'>
        <label htmlFor='name'>Nom de l'ingredient</label>
        <input name='name' id='name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} type='text' required placeholder='Entrez un nom' />
      </div>
      <div className='form-group'>
        <label htmlFor='is_allergen'>allergène</label>
        <input type='checkbox' name='is_allergen' id='is_allergen' />
      </div>
      <button type='submit'>Enregistrer</button>
    </form>
  );
};

export default FormIngredient;
