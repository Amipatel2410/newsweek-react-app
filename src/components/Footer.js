import React, { Component } from 'react';
import linkedin from '../images/l1.jpg';
import twitter from '../images/t1.png';
import facebook from '../images/f1.jpg';

class Footer extends Component{

  render(){
    return(
      <footer>
      <div className="footer_class">

        <div className="connect_div">
        <p> Connect with Us </p>
        <img src={twitter} height="50px" width="50px" />
        <img src={facebook} height="50px" width="50px" />
        <img src={linkedin} height="50px" width="50px" />
        </div>

        <div className="about_class">
        <h3> About Us: </h3>
        <p>  The destination for news, blogs and original content
        offering coverage of US politics, entertainment,
        style, world news, technology and comedy by Huffington post.
        Weekly news brings you the latest news from around the world, covering breaking
        news in markets, business, politics, entertainment,
        technology, video and pictures. </p>
        </div>

        <div className="created_class">
          <p>Copyright &copy 2017 Site By Amisha Patel</p>
        </div>


      </div>

      </footer>
      )
  }

}

export default Footer;
