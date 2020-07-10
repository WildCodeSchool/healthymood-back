import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/EditorForm.css';
import '../Styles/Form.css';
import API from '../services/API';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const Pages = () => {
  const history = useHistory();
  const [pages, setPages] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cette Page ?')) {
      API.delete(`/generic_pages/${id}`)
        .then(res => {
          const currentPage = pages.filter(p => p.id !== id);
          setPages(currentPage);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  useEffect(() => {
    API.get('/generic_pages')
      .then(res => {
        setPages(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // eslint-disable-line

  return (
    <>
      <div style={{ paddingTop: '20px' }}>
        <Link to='/pages/edit/new'>
          <button className='form-button'>Ajouter</button>
        </Link>
      </div>

      <br />
      <table className='render-list'>
        <thead>
          <tr>
            <td>Titre</td>
            <td>Slug</td>
            <td>Publié</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {pages.map(p => {
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.slug}</td>
                <td>
                  {p.published === 0 ? 'Non' : 'Oui'}
                </td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => history.push(`/pages/edit/${p.id}`)} />
                  <DeleteOutlined className='delete-icon' onClick={() => handleDelete(p.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </>
  );
};

export default Pages;
