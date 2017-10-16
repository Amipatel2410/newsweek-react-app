import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';
import ArticleDelete from './ArticleDelete';
import ArticleUpdate from './ArticleUpdate';

class UserProfile extends Component {

  constructor() {
    super();
    this.state = {
      articleData: '',
      articleDataLoaded: false,
      fireRedirect: false,
      reloadPage: false,
    }

    this.deletePage = this.deletePage.bind(this);

  }

  deletePage(){
    console.log("hi");
    this.componentDidMount();
    this.setState ({reloadPage: true})
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
      `http://localhost:3000/articles?user_id=${this.props.match.params.id}`,
      { headers: headers }
    )
    .then(res => {
      console.log(res.data);
      this.setState({
        articleDataLoaded: true,
        articleData: res.data,
      })
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  renderArticleOrLoading(){
    if(this.state.articleDataLoaded) {
      return(this.state.articleData.map(article => {
        return (
            <div>
            <ArticleDelete article = {article} deletePage = {this.deletePage}/>
            </div>
          );
      })

        )
    } else return
                  <p className="loading"> Loading... </p>
  }


  render() {
    return (
        <div className="userprofile_user">
          <h1 className="heading"> Welcome User </h1>
          {this.renderArticleOrLoading()}
        </div>
      )
  }

}

export default UserProfile;
