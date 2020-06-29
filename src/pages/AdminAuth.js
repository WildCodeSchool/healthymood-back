import React, { useContext } from 'react';
import API from '../API';
import AuthContext from '../context/authContext';
import '../Styles/AdminAuth.css';
import logo from '../images/healthymood-logo.png';
import { Link } from 'react-router-dom';

const AdminAuth = () => {
  const { setToken } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    API.post({ email: data.email.value, password: data.password.value })
      .then(res => setToken(res.data.token));
  };
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
          <div className='remember-forget-container'>
            <input className='remember-checkbox' type='checkbox' checked='checked' name='remember' />
            <label className='remember-label' htmlFor='remember'>
              Se souvenir de moi
            </label>
          </div>
        </div>
        <Link to='/'><button className='btn' type='submit'>Connexion</button></Link>
      </form>
    </main>
  );
};

export default AdminAuth;
