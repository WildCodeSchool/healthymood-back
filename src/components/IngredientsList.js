import React from 'react';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const IngredientsList = (props) => {
  const data = props.ingrdientsData;

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
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default IngredientsList;
