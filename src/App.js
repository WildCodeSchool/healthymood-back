import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Layout } from 'antd';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Articles from './pages/Articles';
import Recipes from './pages/Recipes';
import CategoryArticles from './pages/CategoryArticles';
import CategoryRecipes from './pages/CategoryRecipes';
import './Styles/App.css';
import Ingredients from './pages/Ingredients';
import Meals from './pages/Meals';
import Dishes from './pages/Dishes';
import Diets from './pages/Diets';
import Pages from './pages/Pages';
import Users from './pages/Users';

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
                <Route exact path='/'>
                  <h1>Home</h1>
                </Route>
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
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
