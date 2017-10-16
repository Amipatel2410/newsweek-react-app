import React, { Component } from 'react';
import axios from 'axios';
import cookies from 'cookies-js';
import { Link, Redirect } from 'react-router-dom';



class ArticleSingle extends Component {

  constructor() {
    super();
    this.state = {
      articleData: null,
      apiDataLoaded: false,
      fireRedirect: false,
    }
  }

  componentDidMount() {
    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    axios.get(
      `/articles/${this.props.match.params.id}`,
      { headers: headers }
    )
    .then(res => {
      console.log(res.data);
      this.setState({
        apiDataLoaded: true,
        articleData: res.data,
      })
      console.log("this is response data--->", this.state.articleData);
    })
    .catch(err => console.log(err));
  }


  renderArticleData() {
    if(this.state.apiDataLoaded) {
      return (
        <div className="article_data">

        <div className="for_css1">
        <h1> Title: {this.state.articleData.title} </h1>
        <h3> Author: {this.state.articleData.author} </h3>
        <p className="title"> Description: </p>
        <p className="des"> {this.state.articleData.description} </p>
        <a href={this.state.articleData.url}> Read More </a>
        <p className="publish"> PublishedAt: {this.state.articleData.publishedAt} </p>
        </div>

        <div className="for_css2">
        <img src={this.state.articleData.urlToImage} height="250px" width="250px"/>
        </div>

        <div className="links">
            <Link to={`/articles/${this.props.match.params.id}`}>Edit</Link>
            <Link to={`/UserProfile/${cookies.get('user_id')}`}>Back</Link>
        </div>

        </div>
        )
    } else return <p className="loading"> Loading... </p>
  }

 render() {
    return (
      <div className="article-single">
        {this.renderArticleData()}
      </div>
    )
  }

}

export default ArticleSingle;
