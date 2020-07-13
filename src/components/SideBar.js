import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => { setCollapsed(!collapsed); };
  const location = useLocation();
  const { pathname } = location;

  return (
    <Sider
      style={{ width: '500px' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => { onCollapse(); }}
    >
      <div className='logo-container'>
        <NavLink to='/' className='logo'>
          <img src={collapsed ? smallLogo : logo} alt='HealthyMood' />
        </NavLink>
      </div>
      <Menu theme='dark' selectedKeys={[pathname]} mode='inline'>
        <Menu.Item key='/' icon={<BarChartOutlined />}>
          <NavLink to='/'>Dashboard</NavLink>
        </Menu.Item>

        <Menu.Item key='/articles' icon={<FormOutlined />}>
          <NavLink to='/articles'>Nos articles</NavLink>
        </Menu.Item>

        <Menu.Item key='/recipes' icon={<FormOutlined />}>
          <NavLink to='/recipes'>Nos recettes</NavLink>
        </Menu.Item>

        <Menu.Item key='/article_categories' icon={<BookOutlined />}>
          <NavLink to='/article_categories'>Catégories articles</NavLink>
        </Menu.Item>
        <Menu.Item key='/recipe_categories' icon={<BookOutlined />}>
          <NavLink to='/recipe_categories'>Catégories recettes</NavLink>
        </Menu.Item>

        <Menu.Item key='/ingredients' icon={<FormOutlined />}>
          <NavLink to='/ingredients'>Ingrédients</NavLink>
        </Menu.Item>

        <Menu.Item key='/dish_types' icon={<FormOutlined />}>
          <NavLink to='/dish_types'>Types de plats</NavLink>
        </Menu.Item>

        <Menu.Item key='/meal_types' icon={<FormOutlined />}>
          <NavLink to='/meal_types'>Types de repas</NavLink>
        </Menu.Item>

        <Menu.Item key='/diet' icon={<FormOutlined />}>
          <NavLink to='/diet'>Tous les Régimes</NavLink>
        </Menu.Item>

        <Menu.Item key='/pages' icon={<CopyOutlined />}>
          <NavLink to='/pages'>Nos pages</NavLink>
        </Menu.Item>

        <Menu.Item key='/users' icon={<TeamOutlined />}>
          <NavLink to='/users'>Gérer les utilisateurs</NavLink>
        </Menu.Item>

        <Menu.Item key='/mon-profil' icon={<UserOutlined />}>
          <NavLink to='/mon-profil'>Mon Profil</NavLink>
        </Menu.Item>

      </Menu>
    </Sider>

  );
};

export default SideBar;
