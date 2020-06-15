import React, { useState, useContext, useEffect } from 'react';
import IngredientContext from '../contexts/IngredientContext';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Form.css';

const IngredientsList = () => {

  const {formData, setFormData} = useContext(IngredientContext);

  const [ingredientsData, setIngredientsData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: e.target.name.value,
      is_allergen: e.target.is_allergen.checked,
    });
    console.log(formData);
    
  };

  useEffect((formData) => {
    setIngredientsData(...ingredientsData, formData)
  }, [ingredientsData])

  const columns = [
    {
      title: 'Ingrédient',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Allergène',
      dataIndex: 'is_allergen',
      key: 'is_allergen',
      filters: [
        { text: 'Allergène', value: 'oui' },
        { text: 'Non allergène', value: 'non' }
      ]
    },
    {
      title: 'Calories / 100gr',
      dataIndex: 'calories',
      key: 'calories'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <EditOutlined style={{ color: '#1a8ffb' }} />
          <DeleteOutlined style={{ color: '#ee5253' }} />
        </Space>
      )
    }
  ];

  return (
    <>
      <h1>Liste de tous les ingrédients</h1>
      <form className='form-inline' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='name'>Nom de l'ingredient :</label>
          <input name='name' id='name' onChange={(e) => setFormData({ ...formData, name: e.target.value })} type='text' required placeholder='Entrez un nom' />
        </div>
        <div className='form-group'>
          <label htmlFor='is_allergen'>
            <input type='checkbox' name='is_allergen' id='is_allergen' /> Allergène
          </label>
        </div>
        <button type='submit'>Enregistrer</button>
      </form>
      <Table columns={columns} dataSource={[ingredientsData]} />
    </>
  );
};

export default IngredientsList;
