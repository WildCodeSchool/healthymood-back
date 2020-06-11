import React from 'react';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../Styles/Icons.css';

const data = [
  {
    key: '1',
    name: 'Quiches'
  },
  {
    key: '2',
    name: 'Tartes'
  },
  {
    key: '3',
    name: 'Soupes'
  },
  {
    key: '4',
    name: 'Cakes'
  }
];

const RecipesCategoriesList = () => {
  const columns = [
    {
      title: 'Catégories de Recettes',
      dataIndex: 'name',
      key: 'name'
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
      <h1>Liste de toutes les Catégories de recettes</h1>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default RecipesCategoriesList;
