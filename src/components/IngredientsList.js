import React from 'react';
import { Table } from 'antd';

const data = [
  {
    key: '1',
    name: 'Banane',
    is_allergen: 'oui',
    Delete: <button>Supprimer</button>,
    edit: <button>Editer</button>
  },
  {
    key: '2',
    name: 'Tomate',
    is_allergen: 'non',
    Delete: <button>Supprimer</button>,
    edit: <button>Editer</button>
  },
  {
    key: '3',
    name: 'Riz',
    is_allergen: 'oui',
    Delete: <button>Supprimer</button>,
    edit: <button>Editer</button>
  },
  {
    key: '4',
    name: 'Comcombre',
    is_allergen: 'non',
    Delete: <button>Supprimer</button>,
    edit: <button>Editer</button>
  }
];

const IngredientsList = () => {
  const columns = [
    {
      title: 'Ingrédient',
      dataIndex: 'name',
      key: 'name'
      // filters: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim' }
      // ]
    },
    {
      title: 'Allergène',
      dataIndex: 'is_allergen',
      key: 'is_allergen',
      // sorter: (a, b) => a.age - b.age,
      ellipsis: true
    },
    {
      title: 'Supprimer',
      key: 'supprimer',
      dataIndex: 'Delete'
    },
    {
      title: 'Editer',
      key: 'edit',
      dataIndex: 'edit'
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
