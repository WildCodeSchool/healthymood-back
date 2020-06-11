import React from 'react';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    name: 'Page1',
    author: 'Jean',
    date: {
      creation_date: 2020,
      last_modification_date: 2020
    }
  },
  {
    key: '2',
    name: 'Page2',
    author: 'Jean',
    date: {
      creation_date: 2020,
      last_modification_date: 2020
    }
  },
  {
    key: '3',
    name: 'Page3',
    author: 'Jean',
    date: {
      creation_date: 2020,
      last_modification_date: 2020
    }
  }
];

const Pages = () => {
  const columns = [
    {
      title: 'Pages',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Auteur',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Date',
      dataIndex: 'creation_date',
      key: 'creation_date'
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
      <h1>Liste de toutes les pages</h1>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Pages;
