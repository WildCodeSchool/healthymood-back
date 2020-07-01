import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AuthContext from './context/authContext';

import { Layout } from 'antd';
import './Styles/App.css';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Recipes from './pages/Recipes';
import CategoryArticles from './pages/CategoryArticles';
import CategoryRecipes from './pages/CategoryRecipes';
import Ingredients from './pages/Ingredients';
import Dishes from './pages/Dishes';
import Meals from './pages/Meals';
import Diets from './pages/Diets';
import Pages from './pages/Pages';
import Users from './pages/Users';
import AdminProfil from './pages/AdminProfil';
import AdminAuth from './pages/AdminAuth';

const { Content } = Layout;

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? children : <Redirect to={{pathname: '/login', state: { from: location }}}/>
      }
    />
  );
};

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('authToken'));
  const setTokenInLocalStorage = (token) => {
    window.localStorage.setItem('authToken', token);
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ token, setToken: setTokenInLocalStorage }}>
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/login'>
              <AdminAuth />
            </Route>
            <Layout style={{ minHeight: '100vh' }}>
              <SideBar />
              <Layout className='site-layout'>
                <TopBar />
                <Content style={{ margin: '0 16px' }}>
                  <PrivateRoute exact path='/'>
                    <Home />
                  </PrivateRoute>
                  <PrivateRoute exact path='/articles'>
                    <Articles />
                  </PrivateRoute>
                  <PrivateRoute exact path='/recettes'>
                    <Recipes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/categories-articles'>
                    <CategoryArticles />
                  </PrivateRoute>
                  <PrivateRoute exact path='/categories-recettes'>
                    <CategoryRecipes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/ingredients'>
                    <Ingredients />
                  </PrivateRoute>
                  <PrivateRoute exact path='/dish_types'>
                    <Dishes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/types-repas'>
                    <Meals />
                  </PrivateRoute>
                  <PrivateRoute exact path='/diet'>
                    <Diets />
                  </PrivateRoute>
                  <PrivateRoute exact path='/pages'>
                    <Pages />
                  </PrivateRoute>
                  <PrivateRoute exact path='/utilisateurs'>
                    <Users />
                  </PrivateRoute>
                  <PrivateRoute exact path='/mon-profil'>
                    <AdminProfil />
                  </PrivateRoute>
                </Content>
              </Layout>
            </Layout>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
