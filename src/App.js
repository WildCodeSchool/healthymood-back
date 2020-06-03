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
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
