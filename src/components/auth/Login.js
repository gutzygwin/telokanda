import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields" >
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" onChange={this.handleChange} />
                </div>

                <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" onChange={this.handleChange} />
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign In</button> <Link to="/register" className="FormField__Link">Create an account</Link>
                </div>
                <div className="white-text center">
                    { authError ? <p>{authError}</p> : null }
                </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

