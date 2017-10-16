import React, { Component } from 'react';
import ArticleList from './components/ArticleList';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Article from './components/Article';
import UserProfile from './components/UserProfile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//import SavedArticle from './components/SavedArticle';
import { Route } from 'react-router-dom';
import ArticleSingle from './components/ArticleSingle';
import ArticleUpdate from './components/ArticleUpdate';

class App extends Component {
  render() {
    return (
      <div className='router'>
        <Header />
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/Article' component = {Article} />
        <Route exact path='/articles/:id' component = {ArticleUpdate} />
        <Route exact path='/UserProfile/:id' component = {UserProfile} />
        <Route exact path='/login' component = {Login} />
        <Route exact path='/register' component = {Register} />
        <Footer />
      </div>
    );
  }
}

export default App;
