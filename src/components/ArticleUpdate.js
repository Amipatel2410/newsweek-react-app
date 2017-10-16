import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import cookies from 'cookies-js';
import { Link } from 'react-router-dom';

class ArticleUpdate extends Component {

constructor(props)
{
  super(props);
  this.state = {
    title: '',
    author: '',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '',
    fireRedirect: false,
  }
  this.updateArticles = this.updateArticles.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
}


handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    console.log(this.props.match.params.id);
    axios.get(`/articles/${this.props.match.params.id}`,
        {headers: headers}
      )
      .then((res) => {
        const article = res.data;
        this.setState({
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
        })
        console.log(article);
      }).catch(err => console.log(err));
  }



  updateArticles() {
    let headers = {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'token-type': cookies.get('token-type'),
      'uid': cookies.get('uid'),
      'expiry': cookies.get('expiry')
    };
    axios.put(`/articles/${this.props.match.params.id}` ,
      {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        url: this.state.url,
        urlToImage: this.state.urlToImage,
        publishedAt: this.state.publishedAt
      },
      { headers: headers }
      )
      .then(res => {
        console.log(res);
        this.setState({
          newId: res.data.id,
          fireRedirect: true,

        });
        console.log(cookies.get('user_id'));
        //console.log(this.state.newId);

      }).catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
        <div className="edit">

            <h1 className="title"> Edit Form </h1>

            <form onSubmit={this.updateArticles}>

              <label> Title: <br/>
              <input
              type="text"
              placeholder="title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <label> Description: <br />
              <input
              type="text"
              placeholder="description"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <label> Author: <br />
              <input
              type="text"
              placeholder="author"
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <label> Url:  <br />
              <input
              type="text"
              placeholder="url"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <label> urlToImage: <br />
              <input
              type="text"
              placeholder="urlToImage"
              name="urlToImage"
              value={this.state.urlToImage}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <label> publishedAt <br/>
              <input
              type="text"
              placeholder="publishedAt"
              name="publishedAt"
              value={this.state.publishedAt}
              onChange={this.handleInputChange} />
              </label>
              <br />
              <input type="submit" value="Submit!" />

            </form>

            {this.state.fireRedirect
          ? <Redirect push to={`/UserProfile/${cookies.get('user_id')}`} />
          : ''}

             <div>
            <Link className="back_link" to={`/UserProfile/${cookies.get('user_id')}`}>Back</Link>
            </div>


        </div>
      );
  }







}


export default ArticleUpdate;
