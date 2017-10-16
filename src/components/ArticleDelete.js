import React, { Component } from 'react';
import axios from 'axios';
import cookies from 'cookies-js';
import { Link, Redirect } from 'react-router-dom';
import ArticleSingle from './ArticleSingle';


class ArticleDelete extends Component {

constructor(props)
{
  super(props);
  this.deleteArticles = this.deleteArticles.bind(this);
}


deleteArticles(){
    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    axios.delete(`/articles/${this.props.article.id}` ,
      { headers: headers}
      )
      .then(res => {
        console.log(res);
        this.props.deletePage();
      }).catch(err => {
        console.log(err);
      });
  }



render() {
  return (

          <div className="userprofile_data">

          <div className="userprofile_single">
                <h1>{this.props.article.title} </h1>
                <img src={this.props.article.urlToImage} height="250px" width="250px" />
                <h3> Author: {this.props.article.author} </h3>
                <p> Description:</p>
                <p> {this.props.article.description} </p>
                <a href={this.props.article.url}> Read More </a>
                <h4> PublishedAt: {this.props.article.publishedAt} </h4>
                <button type="submit" onClick={this.deleteArticles}> Delete </button>

                <div className="link_update">
                <Link to={`/articles/${this.props.article.id}`}>Update</Link>
                </div>
          </div>

          </div>

    );
}


}

export default ArticleDelete;
