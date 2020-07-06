import React, { useState, useEffect } from 'react';
import '../Styles/Editor.css';
import API from '../services/API';
import { ToastContainer, toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const AddPage = () => {
  const [pages, setPages] = useState([]);
  const [state, setState] = useState({
    loading: false,
    showToast: false,
    message: null,
    success: false
  });

  const toastr = (success, show, message) => {
    if (show) {
      if (success) {
        return toast.success(message);
      } else {
        return toast.error(message);
      }
    }
  };

  useEffect(() => {
    API.get('/generic_pages')
      .then(res => {
        setPages(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setState({ ...state, loading: false });
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    toastr(state.success, state.showToast, state.message);
  }, [state]);

  console.log(pages);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoclose={5000}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
      <table className='render-list'>
        <thead>
          <tr>
            <td>Titre</td>
            <td>Publié</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {pages.map(p => {
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>
                  {p.published === 0 ? 'Non' : 'Oui'}
                </td>
                <td>
                  <EditOutlined className='edit-icon' />
                  <DeleteOutlined className='delete-icon' />

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AddPage;
