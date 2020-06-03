import React from 'react';
import { Layout } from 'antd';
import { Breadcrumb } from 'antd';

const { Header } = Layout;

const TopBar = () => {
  return (
    <>
      <Header className='site-layout-background' style={{ padding: 0 }} />
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

    </>
  );
};

export default TopBar;
