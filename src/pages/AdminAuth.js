import React, { useContext } from 'react';
import axios from 'axios';
import authenticationContext from '../context/authenticationContext';
import '../Styles/AdminAuth.css';

const AdminAuth = ({ onAuthenticate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    axios.post('http://localhost:3000/auth/login', { email: data.email.value, password: data.password.value })
      .then(res => window.localStorage.setItem('token', res.data.token));
    onAuthenticate();
  };
  const token = useContext(authenticationContext);
  return (
    <main className='login-page'>
      <form className='form-login' onSubmit={handleSubmit}>
        <h1>Connexion Administrateur</h1>
        <p>token : {token}</p>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required placeholder='me@healthymood.fr' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input type='password' name='password' id='password' required placeholder='Mot de passe sécurisé' />
        </div>
        <label>
          <input type='checkbox' checked='checked' name='remember' /> Se souvenir de moi
        </label>
        <button className='btn' type='submit'>Connexion</button>
      </form>
    </main>
  );
};

export default AdminAuth;
