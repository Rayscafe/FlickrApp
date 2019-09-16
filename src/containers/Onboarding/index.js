import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../../styles/css/custom.css';
import { register } from "../../redux/actions";
import axios from 'axios';
import HTMLParser from "react-html-parser"

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      data: [],
      pic_title: 'Picture Title',
      auth_name: 'Author Name',
      pic_url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      pic_des: "---------------------------------------------------------------------------------------------------------------------------------------------------------"
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    // .then(res => {
    //   const data = res.data;
    //   this.setState({ data });
    // })
  }

  dropdown = (e) => {

    console.log(this.state.data[e.target.value].description)
    this.setState({
      pic_title: this.state.data.map((e, i) => <div key={i}>{e.title}</div>)[e.target.value],
      auth_name: this.state.data.map((e, i) => <div key={i}>{e.author.slice(20, -2)}</div>)[e.target.value],
      pic_des: this.state.data[e.target.value].description,
      pic_url: this.state.data[e.target.value].media.m
    })
  };

  componentWillMount() {
    axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?format=json`)
      .then(res => {
        const data = JSON.parse(res.data.slice(15, -1));
        this.setState({ data: data.items });
        console.log(this.state.data)
      })
  }
  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div className="signin-wrapper">
        <div className="signin-box onboarding">
          <div className="form-layout form-layout-7 mg-b-20">
            <div className="picture">
              <img className="Img" src={this.state.pic_url} alt="picture" />
            </div>
          </div>
          <div className="picture_name">
            <Link to="/index">
              <h2 className="picture_property">
                {this.state.pic_title}
              </h2>
            </Link>&nbsp;&nbsp;
            <h2 className="picture_by">
              by
            </h2>&nbsp;&nbsp;
            <Link to="/index">
              <h2 className="picture_property">
                {this.state.auth_name}
              </h2>
            </Link>
          </div>
          <div className="picture_desc">
            <h2>
              Description 
            </h2>&nbsp;&nbsp;&nbsp;&nbsp;
            <h2>
              {HTMLParser(this.state.pic_des)}
            </h2>
          </div>
          <button className="btn btn-primary btn-block btn-signin"
            onClick={this.showMenu}
            style={{ marginBottom: '4px', marginTop: '1px' }}>
            Tag&nbsp;&nbsp;&nbsp;
            <i className="fa fa-angle-down" />
          </button>

          {
            this.state.showMenu
              ? (
                this.state.data.map((e, i) => <button className="btn btn-primary btn-block btn-signin"
                  style={{ marginBottom: '0px', marginTop: '1px' }} key={i}
                  onClick={this.dropdown}
                  value={i}>
                  {e.tags}...
              </button>)
              )
              : (
                null
              )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // user: state.user
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  register: user_information => dispatch(register(user_information))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
