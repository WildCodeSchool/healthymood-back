import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  FormOutlined,
  TeamOutlined,
  BarChartOutlined,
  CopyOutlined
} from '@ant-design/icons';
import '../Styles/SideBar.css';

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
      <div className='logo-container'>
        <div className='logo' />
      </div>
      <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
        <Menu.Item key='0' icon={<BarChartOutlined />}>
          <NavLink exact to='/'>Dashboard</NavLink>
        </Menu.Item>
        <SubMenu key='sub1' icon={<FormOutlined />} title='Articles'>
          <Menu.Item key='1'>
            <NavLink exact to='/articles'>Tous les Articles</NavLink>
          </Menu.Item>
          <Menu.Item key='2'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<FormOutlined />} title='Recettes'>
          <Menu.Item key='3'>
            <NavLink exact to='/recettes'>Toutes les recettes</NavLink>
          </Menu.Item>
          <Menu.Item key='4'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<BookOutlined />} title='Catégories'>
          <Menu.Item key='5'>
            <NavLink exact to='/categories-articles'>Catégories Articles</NavLink>
          </Menu.Item>
          <Menu.Item key='6'>
            <NavLink exact to='/categories-recettes'>Catégories Recettes</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub4' icon={<FormOutlined />} title='Ingrédients'>
          <Menu.Item key='7'>
            <NavLink exact to='/ingredients'>Tous les ingrédients</NavLink>
          </Menu.Item>
          <Menu.Item key='8'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub5' icon={<FormOutlined />} title='Types de Plats'>
          <Menu.Item key='9'>
            <NavLink exact to='/plats'>Tous les plats</NavLink>
          </Menu.Item>
          <Menu.Item key='10'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub6' icon={<FormOutlined />} title='Types de Repas'>
          <Menu.Item key='11'>
            <NavLink exact to='/repas'>Tous les repas</NavLink>
          </Menu.Item>
          <Menu.Item key='12'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub7' icon={<FormOutlined />} title='Régimes'>
          <Menu.Item key='13'>
            <NavLink exact to='/regimes'>Tous les Régimes</NavLink>
          </Menu.Item>
          <Menu.Item key='14'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub8' icon={<CopyOutlined />} title='Pages'>
          <Menu.Item key='15'>
            <NavLink exact to='/pages'>Toutes les pages</NavLink>
          </Menu.Item>
          <Menu.Item key='16'>Ajouter</Menu.Item>
        </SubMenu>
        <SubMenu key='sub9' icon={<TeamOutlined />} title='Utilisateurs'>
          <Menu.Item key='17'>
            <NavLink exact to='/utilisateurs'>Gérer les utilisateurs</NavLink>
          </Menu.Item>
          <Menu.Item key='18'>
            <NavLink exact to='/mon-profil'>Mon Profil</NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
