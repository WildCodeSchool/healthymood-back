import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FormOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => { onCollapse(); }}
    >
      <div className='logo' />
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <SubMenu key='sub1' icon={<FormOutlined />} title='Articles'>
          <Menu.Item key='1'>Tous les Articles</Menu.Item>
          <Menu.Item key='2'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<FormOutlined />} title='Recettes'>
          <Menu.Item key='3'>Toutes les recettes</Menu.Item>
          <Menu.Item key='4 '>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<TeamOutlined />} title='Utilisateurs'>
          <Menu.Item key='5'>Gérer les utilisateurs</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
