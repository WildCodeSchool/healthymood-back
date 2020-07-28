import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import API from '../services/API';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const Articles = () => {
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const articlesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  const handleDelete = (id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette Article ?')) {
      API.delete(`/articles/${id}`)
        .then(res => {
          const currentArticle = articles.filter(p => p.id !== id);
          setArticles(currentArticle);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    API.get('/articles')
      .then(res => {
        setArticles(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await API.get('/articles?per_page=' + articlesPerPage + '&page=' + currentPage);
      setArticles(res.data.data);
      setTotalArticles(res.data.total);
      setLoading(false);
    };
    fetchArticles();
  }, [currentPage]);

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  return (
    <>
      <div style={{ paddingTop: '20px' }}>
        <Link to='/articles/edit/new'>
          <button className='form-button'>Ajouter</button>
        </Link>
      </div>

      <br />
      <table className='render-list'>
        <thead>
          <tr>
            <td>Titre</td>
            <td>Slug</td>
            <td>Image Principale</td>
            <td>Date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {articles.map(a => {
            return (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>/{a.slug}</td>
                <td><img src={a.image} alt='article' className='img-uploaded' /></td>
                <td>Crée le : {moment(a.created_at).format('DD/MM/YYYY')}</td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => history.push(`/articles/edit/${a.id}`)} />
                  <DeleteOutlined className='delete-icon' onClick={() => handleDelete(a.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (<li key={number}><Link onClick={() => paginate(number)} to='#' className='page-link'>{number}</Link></li>))}
        </ul>
      </nav>
    </>
  );
};
export default Articles;
