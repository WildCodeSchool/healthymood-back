import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
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
      onCollapse={() => {
        onCollapse();
      }}
    >
      <div className='logo' />
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <SubMenu key='sub1' icon={<FormOutlined />} title='Articles'>
          <Menu.Item key='1'>Tous les Articles</Menu.Item>
          <Menu.Item key='2'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<FormOutlined />} title='Recettes'>
          <Menu.Item key='3'>Toutes les recettes</Menu.Item>
          <Menu.Item key='4'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<BookOutlined />} title='Catégories'>
          <Menu.Item key='5'>Catégories Articles</Menu.Item>
          <Menu.Item key='6'>Catégories Recettes</Menu.Item>
        </SubMenu>
        <SubMenu key='sub4' icon={<FormOutlined />} title='Ingrédients'>
          <Menu.Item key='7'>Tous les ingrédients</Menu.Item>
          <Menu.Item key='8'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub5' icon={<FormOutlined />} title='Types de Plats'>
          <Menu.Item key='9'>Tous les plats</Menu.Item>
          <Menu.Item key='10'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub6' icon={<FormOutlined />} title='Types de Repas'>
          <Menu.Item key='11'>Tous les repas</Menu.Item>
          <Menu.Item key='12'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub7' icon={<FormOutlined />} title='Régimes'>
          <Menu.Item key='13'>Tous les Régimes</Menu.Item>
          <Menu.Item key='14'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub8' icon={<FormOutlined />} title='Pages'>
          <Menu.Item key='15'>Toutes les pages</Menu.Item>
          <Menu.Item key='16'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub9' icon={<TeamOutlined />} title='Utilisateurs'>
          <Menu.Item key='17'>Gérer les utilisateurs</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
