import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  FormOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  CopyOutlined
} from '@ant-design/icons';
import '../Styles/SideBar.css';
import logo from '../images/healthymood-logo.png';
import smallLogo from '../images/hm-logo-small.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      style={{ width: '500px' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        onCollapse();
      }}
    >
      <div className='logo-container'>
        <NavLink to='/' className='logo'>
          <img src={collapsed ? smallLogo : logo} alt='HealthyMood' />
        </NavLink>
      </div>
      <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
        <Menu.Item key='0' icon={<BarChartOutlined />}>
          <NavLink to='/'>Dashboard</NavLink>
        </Menu.Item>
        <SubMenu key='sub1' icon={<FormOutlined />} title='Articles'>
          <Menu.Item key='1'>
            <NavLink to='/articles'>Nos articles</NavLink>
          </Menu.Item>
          <Menu.Item key='2'>
            <NavLink to='/articles/ajouter'>Ajouter</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<FormOutlined />} title='Recettes'>
          <Menu.Item key='3'>
            <NavLink to='/recettes'>Nos recettes</NavLink>
          </Menu.Item>
          <Menu.Item key='4'>
            <NavLink to='/recettes/ajouter'>Ajouter</NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu key='sub3' icon={<BookOutlined />} title='Catégories'>
          <Menu.Item key='5'>
            <NavLink to='/article_categories'>Catégories articles</NavLink>
          </Menu.Item>
          <Menu.Item key='6'>
            <NavLink to='/recipe_categories'>Catégories recettes</NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='7' icon={<FormOutlined />}>
          <NavLink to='/ingredients'>Ingrédients</NavLink>
        </Menu.Item>
        <Menu.Item key='8' icon={<FormOutlined />}>
          <NavLink to='/dish_types'>Types de plats</NavLink>
        </Menu.Item>
        <Menu.Item key='9' icon={<FormOutlined />}>
          <NavLink to='/meal_types'>Types de repas</NavLink>
        </Menu.Item>
        <Menu.Item key='10' icon={<FormOutlined />}>
          <NavLink to='/diet'>Tous les Régimes</NavLink>
        </Menu.Item>
        <SubMenu key='sub4' icon={<CopyOutlined />} title='Pages'>
          <Menu.Item key='11'>
            <NavLink to='/pages'>Nos pages</NavLink>
          </Menu.Item>
          <Menu.Item key='12'>
            <NavLink to='/pages/ajouter'>Ajouter</NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='13' icon={<TeamOutlined />}>
          <NavLink to='/users'>Gérer les utilisateurs</NavLink>
        </Menu.Item>
        <Menu.Item key='14' icon={<UserOutlined />}>
          <NavLink to='/mon-profil'>Mon Profil</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
