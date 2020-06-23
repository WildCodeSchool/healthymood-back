import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  privateRoute
} from 'react-router-dom';
import authenticationContext from './context/authenticationContext';

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

const App = () => {
  const [authenticateUser, setAuthenticateUser] = useState(false);
  const token = useContext(authenticationContext);
  const handleAuthenticate = () => {
    setTimeout(() => {
      setAuthenticateUser(true);
    }, 1000);
    console.log(token);
  };
  return (
    <authenticationContext.Provider value={token}>
      <div className='App'>
        <Router>
          <Switch>
            <Layout style={{ minHeight: '100vh' }}>
              {!authenticateUser ? (
                <Route exact path='/connexion'>
                  <AdminAuth onAuthenticate={handleAuthenticate} />
                </Route>
              ) : (
                <>
                  <SideBar />
                  <Layout className='site-layout'>
                    <TopBar />
                    <Content style={{ margin: '0 16px' }}>
                      <privateRoute exact path='/' component={Home} />
                      <privateRoute exact path='/articles' component={Articles} />
                      <privateRoute exact path='/recettes' component={Recipes} />
                      <privateRoute
                        exact
                        path='/categories-articles'
                        component={CategoryArticles}
                      />
                      <privateRoute
                        exact
                        path='/categories-recettes'
                        component={CategoryRecipes}
                      />
                      <privateRoute
                        exact
                        path='/ingredients'
                        component={Ingredients}
                      />
                      <privateRoute
                        exact
                        path='/types-plats'
                        component={Dishes}
                      />
                      <privateRoute exact path='/types-repas' component={Meals} />
                      <privateRoute exact path='/regimes' component={Diets} />
                      <privateRoute exact path='/pages' component={Pages} />
                      <privateRoute
                        exact
                        path='/utilisateurs'
                        component={Users}
                      />
                      <privateRoute
                        exact
                        path='/mon-profil'
                        component={AdminProfil}
                      />
                    </Content>
                  </Layout>
                </>
              )}
            </Layout>
          </Switch>
        </Router>
      </div>
    </authenticationContext.Provider>
  );
};

export default App;
