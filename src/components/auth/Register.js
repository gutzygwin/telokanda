import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class Register extends Component {
    state = {
        firstName: "",
        LastName: "",
        email: "",
        password: ""
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="firstname">First Name</label>
                <input type="text" className="FormField__Input" placeholder="Enter your first name" id="firstName" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="lastname">Last Name</label>
                <input type="text" className="FormField__Input" placeholder="Enter your last name" id="lastName" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" className="FormField__Input" placeholder="Enter your email" id="email" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" className="FormField__Input" placeholder="Enter your password" id="password" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login" className="FormField__Link">I'm already member</Link>
              </div>
              <div className="white-text center">
                { authError ? <p>{authError}</p> : null }
            </div>
            </form>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
