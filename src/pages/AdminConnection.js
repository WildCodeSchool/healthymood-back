import React from 'react';

const AdminConnection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    console.log(typeof data.password.value);
  };
  return (
    <>
      <h1>Connexion Administrateur</h1>
      <form className='login' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input type='password' name='password' required />
        </div>
        <button type='submit'>Connexion</button>
      </form>
    </>
  );
};

export default AdminConnection;
