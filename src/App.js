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
import AddArticle from './pages/AddArticle';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import CategoryArticles from './pages/CategoryArticles';
import CategoryRecipes from './pages/CategoryRecipes';
import Ingredients from './pages/Ingredients';
import Dishes from './pages/Dishes';
import Meals from './pages/Meals';
import Diets from './pages/Diets';
import Pages from './pages/Pages';
import AddPage from './pages/AddPage';
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
                <Route exact path='/articles/ajouter' component={AddArticle} />
                <Route exact path='/recettes' component={Recipes} />
                <Route exact path='/recettes/ajouter' component={AddRecipe} />
                <Route exact path='/article_categories' component={CategoryArticles} />
                <Route exact path='/categories-recettes' component={CategoryRecipes} />
                <Route exact path='/ingredients' component={Ingredients} />
                <Route exact path='/dish_types' component={Dishes} />
                <Route exact path='/meal_types' component={Meals} />
                <Route exact path='/regimes' component={Diets} />
                <Route exact path='/pages' component={Pages} />
                <Route exact path='/pages/ajouter' component={AddPage} />
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
