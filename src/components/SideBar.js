import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
import smallLogo from '../images/healthymood-small.png';

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
        <Link exact to='/' className='logo'>
          <img src={collapsed ? smallLogo : logo} alt='HealthyMood' />
        </Link>
      </div>
      <Menu theme='dark' defaultSelectedKeys={['0']} mode='inline'>
        <Menu.Item key='0' icon={<BarChartOutlined />}>
          <NavLink exact to='/'>
              Dashboard
          </NavLink>
        </Menu.Item>
        <Menu.Item key='1' icon={<FormOutlined />}>
          <NavLink exact to='/articles'>
              Articles
          </NavLink>
        </Menu.Item>
        <Menu.Item key='3' icon={<FormOutlined />}>
          <NavLink exact to='/recettes'>
              Recettes
          </NavLink>
        </Menu.Item>
        <SubMenu key='sub1' icon={<BookOutlined />} title='Catégories'>
          <Menu.Item key='5'>
            <NavLink exact to='/categories-articles'>
                Catégories articles
            </NavLink>
          </Menu.Item>
          <Menu.Item key='6'>
            <NavLink exact to='/categories-recettes'>
                Catégories recettes
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='7' icon={<FormOutlined />}>
          <NavLink exact to='/ingredients'>
              Ingrédients
          </NavLink>
        </Menu.Item>
        <Menu.Item key='9' icon={<FormOutlined />}>
          <NavLink exact to='/types-plats'>
              Types de plats
          </NavLink>
        </Menu.Item>
        <Menu.Item key='11' icon={<FormOutlined />}>
          <NavLink exact to='/types-repas'>
              Types de repas
          </NavLink>
        </Menu.Item>
        <Menu.Item key='13' icon={<FormOutlined />}>
          <NavLink exact to='/regimes'>
              Tous les Régimes
          </NavLink>
        </Menu.Item>

        <Menu.Item key='15' icon={<CopyOutlined />}>
          <NavLink exact to='/pages'>
              Toutes les pages
          </NavLink>
        </Menu.Item>

        <Menu.Item key='17' icon={<TeamOutlined />}>
          <NavLink exact to='/utilisateurs'>
              Gérer les utilisateurs
          </NavLink>
        </Menu.Item>
        <Menu.Item key='18' icon={<UserOutlined />}>
          <NavLink exact to='/mon-profil'>
              Mon Profil
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>

  );
};

export default SideBar;
