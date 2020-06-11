import React from 'react';
import { Table, Space } from 'antd';

const data = [
  {
    key: '1',
    name: 'Vegan',
    is_allergen: 'oui',
    calories: 30
  },
  {
    key: '2',
    name: 'Viandar',
    is_allergen: 'non',
    calories: 10
  },
  {
    key: '3',
    name: 'Vegetarien',
    is_allergen: 'oui',
    calories: 90
  },
  {
    key: '4',
    name: 'Coucou',
    is_allergen: 'non',
    calories: 20
  }
];

const Recipes = () => {
  const columns = [
    {
      title: 'Pages',
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
          <button>Editer</button>
          <button>Supprimer</button>
        </Space>
      )
    }
  ];
  return (
    <>
      <h1>Liste de tous les articles</h1>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Recipes;
