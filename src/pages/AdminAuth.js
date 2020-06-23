import React from 'react';
import axios from 'axios';
import '../Styles/AdminAuth.css';

const AdminAuth = ({ onAuthenticate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    console.log(typeof data.password.value);
    axios.post('http://localhost:5001/auth/login', { email: data.email.value, password: data.password.value })
      .then(res => console.log(res));
    onAuthenticate();
  };
  return (
    <main className='login-page'>
      <h1>Connexion Administrateur</h1>
      <form className='form-login' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='hide-label' htmlFor='email'>Email</label>
          <input type='email' name='email' required />
        </div>
        <div className='form-group'>
          <label className='hide-label' htmlFor='password'>Mot de passe</label>
          <input type='password' name='password' required />
        </div>
        <button className='btn' type='submit'>Connexion</button>
      </form>
    </main>
  );
};

export default AdminAuth;
