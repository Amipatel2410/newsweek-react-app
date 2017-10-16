import React, { Component } from 'react';
import axios from 'axios';
import Article from './Article';

class ArticleList extends Component {

  constructor() {
    super();
    this.state = {
      articleDataLoaded: false,
      articleData: null,
      articlesearch: 'top',
      sorted_by: null,
      searchMatch: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAPIarticles = this.getAPIarticles.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({articlesearch: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

    if(this.state.articlesearch !== ''){
      this.getAPIarticles();
    }

  }

  getAPIarticles(){
    let getApi = 'https://newsapi.org/v1/articles?source=newsweek&sortBy='+
    this.state.articlesearch+'&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;
    console.log(getApi);
    axios.get(getApi)
      .then(res => {
        console.log('---->', this.state);
        console.log('res = ', res.data);
        this.setState({
          articleDataLoaded: true,
          articleData: res.data.articles
        });
        console.log("state-->", this.state.articleData);
      }).catch(err =>
      console.log(err)
      );
  }

  renderArticleData() {
    if (this.state.articleDataLoaded) {
      return this.state.articleData.map(article => {
        return(

            <Article key={article.id} article={article} />


          );
      });
    }
    else return <div className="loading"> <p> Loading articleData...</p> </div>
  }

  render(){
    return(
        <div className="main_page">
        <div className="searchbar">
          <form className="search_form" onSubmit={this.handleSubmit}>
            <label>
            Choose Your Category:
              <select value={this.state.articlesearch} onChange={this.handleChange}>
              <option value="top"> Top News </option>
              <option value="latest"> Latest News </option>
              <option value="popular"> Popular News </option>
              </select>
            </label>
            <button type="submit" onClick={this.getAPIarticles}> Search </button>
          </form>
        </div>

        <div className="articleapi_data">
          {this.renderArticleData()}
        </div>
        </div>
      )
  }

}


export default ArticleList;



