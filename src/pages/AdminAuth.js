import React, { useState, useContext } from 'react';
import API from '../services/API';
import AuthContext from '../context/authContext';
import '../Styles/AdminAuth.css';
import logo from '../images/healthymood-logo.png';
import { useHistory } from 'react-router-dom';

const AdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = e.target;
    console.log('post');
    API.post('/auth/login', { email: data.email.value, password: data.password.value })
      .then(res => {
        console.log(res.data);
        setToken(res.data.token);
        setLoading(false);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log('render');
  return (
    <main className='login-page'>
      <img className='login-logo' src={logo} alt='healthymood logo' />
      <form className='form-login' onSubmit={handleSubmit}>
        <h1>Connexion Administrateur</h1>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required placeholder='me@healthymood.fr' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input type='password' name='password' id='password' required placeholder='Mot de passe sécurisé' />
        </div>
        <button className='btn' type='submit' disabled={!!loading}>Connexion</button>
      </form>
    </main>
  );
};

export default AdminAuth;
