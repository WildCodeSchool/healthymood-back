import React from 'react';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ArticleCategoryList = (props) => {
  const data = props.articlesCategoriesData;

  const columns = [
    {
      title: 'Articles',
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
      <h1>Liste de tous les Articles</h1>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ArticleCategoryList;
