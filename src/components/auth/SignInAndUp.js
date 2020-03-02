import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import jetty from '../auth/auth_assests/jetty.png';
import cloudy from '../auth/auth_assests/cloudy.png';
import telologo from './auth_assests/telologo.png';
import './auth.css';



class SignInAndUp extends Component {
  render() {
    return (
        <div className="App">
          <div className="App__Aside">
            <div className="register-logo"><NavLink to ='/'><img src={telologo} className="logo_image" alt="telokanda_logo"/></NavLink></div>
            <div className="telo_illustration">
                <h4 className="hub">Telekonda telos hub</h4>
                <h4 className="crypto">global crypto rewards for actions</h4>
                <img src={jetty} alt="jetty" className="jetty"/>
                <img src={cloudy} alt="cloudy" className="cloudy"/>
            </div>
          </div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/register" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>
              <div className="main_form">
                <Route exact path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
              </div>
          </div>
        </div>
    );
  }
}

export default SignInAndUp;
