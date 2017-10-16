import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';

class Article extends Component {

  constructor(props) {

    super(props);
      this.state = {
      title:  this.props.article.title,
      author: this.props.article.author,
      description: this.props.article.description,
      url: this.props.article.url,
      urlToImage: this.props.article.urlToImage,
      publishedAt: this.props.article.publishedAt,
      fireRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.urlToImage);
    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    axios
      .post('http://localhost:3000/articles', {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        url: this.state.url,
        urlToImage: this.state.urlToImage,
        publishedAt: this.state.publishedAt,

      }, {
        headers: headers
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          newId: res.data.id,
          fireRedirect: true,
        });
      }).catch(err => console.log(err));
      e.target.reset();
  }

  render(){
    return (
      <div className="main_article-data">
        <div className="article_data">

        <div className="for_css1">
        <h1> Title: {this.props.article.title} </h1>
        <h3> Author: {this.props.article.author} </h3>
        <p className="title"> Description: </p>
        <p className="des"> {this.props.article.description} </p>
        <a href={this.props.article.url}> Read More </a>
        <p className="publish"> PublishedAt: {this.props.article.publishedAt} </p>

        </div>

        <div className="for_css2">
        <img src={this.props.article.urlToImage} alt={this.props.article.author} height="250px" width="250px"/>
        </div>





        <div className="for_btn">
        <form onSubmit={(e) => this.handleSubmit(e) }>

                    <input type='hidden' name='title' value={this.props.article.title} />
                    <input type='hidden' name='author' value={this.props.article.author} />
                    <input type='hidden' name='description' value={this.props.article.description}/>
                    <input type='hidden' name='url' value={this.props.article.url} />
                    <input type='hidden' name='urlToImage' value={this.props.article.urlToImage} />
                    <input type='hidden' name='publishedAt' value={this.props.article.publishedAt} />
                    <input type='submit' name='ADD' />
        </form>
        </div>

        </div>
        {this.state.fireRedirect
          ? <Redirect push to={`/UserProfile/${cookies.get('user_id')}`} />
          : ''}

    </div>
      );
  }

}

export default Article;
