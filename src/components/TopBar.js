import React, { useContext } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import '../Styles/TopBar.css';
import AuthContext from '../context/authContext';
import JWTDecode from 'jwt-decode';

const { Header } = Layout;

const TopBar = () => {
  const setTokenInLocalStorage = useContext(AuthContext).setToken;
  const token = useContext(AuthContext).token;
  const currentUser = JWTDecode(token);
  console.log(currentUser);
  const menu = (
    <Menu>
      <Menu.Item key='0' icon={<LogoutOutlined />}>
        <Link exact to='/login' onClick={() => setTokenInLocalStorage('')} className='dropdown-link'>
          Déconnexion
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Header className='site-layout-background header' style={{ padding: 0 }}>
        <span className='hello'>{currentUser.email}</span>
        <Dropdown overlay={menu} trigger={['click']} placement='bottomLeft'>
          <span
            className='ant-dropdown-toggler'
            onClick={(e) => e.preventDefault()}
          >
            <UserOutlined style={{ color: '#FFF' }} />
          </span>
        </Dropdown>
      </Header>
    </>
  );
};

export default TopBar;
