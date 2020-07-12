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
import EditArticle from './pages/EditArticle';
import Recipes from './pages/Recipes';
import EditRecipes from './pages/EditRecipes';
import CategoryArticles from './pages/CategoryArticles';
import CategoryRecipes from './pages/CategoryRecipes';
import Ingredients from './pages/Ingredients';
import Dishes from './pages/Dishes';
import Meals from './pages/Meals';
import Diets from './pages/Diets';
import Pages from './pages/Pages';
import EditPage from './pages/EditPage';
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
        token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />}
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
                <Content>
                  <PrivateRoute exact path='/'>
                    <Home />
                  </PrivateRoute>
                  <PrivateRoute exact path='/articles'>
                    <Articles />
                  </PrivateRoute>
                  <PrivateRoute exact path='/articles/edit/:id'>
                    <EditArticle />
                  </PrivateRoute>
                  <PrivateRoute exact path='/recipes'>
                    <Recipes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/recipes/edit/:id'>
                    <EditRecipes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/article_categories'>
                    <CategoryArticles />
                  </PrivateRoute>
                  <PrivateRoute exact path='/recipe_categories'>
                    <CategoryRecipes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/ingredients'>
                    <Ingredients />
                  </PrivateRoute>
                  <PrivateRoute exact path='/dish_types'>
                    <Dishes />
                  </PrivateRoute>
                  <PrivateRoute exact path='/meal_types'>
                    <Meals />
                  </PrivateRoute>
                  <PrivateRoute exact path='/diet'>
                    <Diets />
                  </PrivateRoute>
                  <PrivateRoute exact path='/pages'>
                    <Pages />
                  </PrivateRoute>
                  <PrivateRoute exact path='/pages/edit/:id'>
                    <EditPage />
                  </PrivateRoute>
                  <PrivateRoute exact path='/users'>
                    <Users />
                  </PrivateRoute>
                  <PrivateRoute exact path='/mon-profil'>
                    <AdminProfil />
                  </PrivateRoute>
                  <PrivateRoute exact path='/*' />
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
