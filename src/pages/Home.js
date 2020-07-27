import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/API';
import '../Styles/Home.css';

const Home = () => {
  // const [user, setUser] = useState('');
  const [articles, setArticles] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [pages, setPages] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = 1;
    API.get(`/users/${id}`)
      .then(res => {
        // setUser({ ...res.data.data });
        // setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get('/articles/?per_page=3&page=1&sort_by=created_at')
      .then(res => {
        setArticles([...res.data.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get('/recipes/?per_page=3&page=1&sort_by=created_at')
      .then(res => {
        setRecipes([...res.data.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    API.get('/generic_pages/?per_page=3&page=1&sort_by=created_at')
      .then(res => {
        setPages([...res.data.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='dashboard-main-container'>
      <div className='shortlink-container'>
        <h2>Recettes</h2>
        {recipes.map(r => {
          return (
            <div key={r.name} className='single-shortlink'>
              <h3>{r.name.length >= 18 ? `${r.name.slice(0, 15)}...` : r.name}</h3>
              <Link to={`/recipes/edit/${r.id}`}>
                <span>Modifier</span>
              </Link>
            </div>
          );
        })}
        <Link className='see-all' to='/recipes'>
          <span>Toutes les recettes</span>
        </Link>
      </div>
      <div className='shortlink-container'>
        <h2>Articles</h2>
        {articles.map(a => {
          return (
            <div key={a.title} className='single-shortlink'>
              <h3>{a.title.length >= 18 ? `${a.title.slice(0, 15)}...` : a.title}</h3>
              <Link to={`/articles/edit/${a.id}`}>
                <span>Modifier</span>
              </Link>
            </div>
          );
        })}
        <Link className='see-all' to='/articles'>
          <span>Tous les articles</span>
        </Link>
      </div>
      <div className='shortlink-container'>
        <h2>Pages</h2>
        {pages.map(p => {
          return (
            <div key={p.title} className='single-shortlink'>
              <h3>{p.title.length >= 18 ? `${p.title.slice(0, 15)}...` : p.title}</h3>
              <Link to={`/pages/edit/${p.id}`}>
                <span>Modifier</span>
              </Link>
            </div>
          );
        })}
        <Link className='see-all' to='/pages'>
          <span>Toutes les pages</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
