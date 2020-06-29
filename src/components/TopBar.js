import React, { useContext } from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import avatar from '../images/Luffy-One-Piece.png';
import '../Styles/TopBar.css';
import AuthContext from '../context/authContext';

const { Header } = Layout;

const TopBar = () => {
  const location = useLocation().pathname.substr(1);
  const setTokenInLocalStorage = useContext(AuthContext).setToken;
  const menu = (
    <Menu>
      <Menu.Item key='0' icon={<UserOutlined />}>
        <Link exact to='/mon-profil' className='dropdown-link'>
          Mon Profil
        </Link>
      </Menu.Item>
      <Menu.Item key='1' icon={<LogoutOutlined />}>
        <Link exact to='/login' onClick={() => setTokenInLocalStorage('')} className='dropdown-link'>
          Déconnexion
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Header className='site-layout-background header' style={{ padding: 0 }}>
        <Dropdown overlay={menu} trigger={['click']} placement='bottomLeft'>
          <span
            className='ant-dropdown-toggler'
            onClick={(e) => e.preventDefault()}
          >
            <Avatar src={avatar} />
          </span>
        </Dropdown>
        ,
      </Header>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>{location}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default TopBar;
