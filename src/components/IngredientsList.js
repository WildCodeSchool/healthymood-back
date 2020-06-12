import React from 'react';
import { Table, Space } from 'antd';

const data = [
  {
    key: '1',
    name: 'Banane',
    is_allergen: 'oui'
  },
  {
    key: '2',
    name: 'Tomate',
    is_allergen: 'non'
  },
  {
    key: '3',
    name: 'Riz',
    is_allergen: 'oui'
  },
  {
    key: '4',
    name: 'Comcombre',
    is_allergen: 'non'
  }
];

const IngredientsList = () => {
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <button>Editer</button>
          <button>Supprimer</button>
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
