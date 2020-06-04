import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
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

const { Content } = Layout;

function App () {
  return (
    <div className='App'>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar />
          <Layout className='site-layout'>
            <TopBar />
            <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/articles' component={Articles} />
                <Route exact path='/recettes' component={Recipes} />
                <Route exact path='/categories-articles' component={CategoryArticles} />
                <Route exact path='/categories-recettes' component={CategoryRecipes} />
                <Route exact path='/ingredients' component={Ingredients} />
                <Route exact path='/types-plats' component={Dishes} />
                <Route exact path='/types-repas' component={Meals} />
                <Route exact path='/regimes' component={Diets} />
                <Route exact path='/pages' component={Pages} />
                <Route exact path='/utilisateurs' component={Users} />
                <Route exact path='/mon-profil' component={AdminProfil} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;