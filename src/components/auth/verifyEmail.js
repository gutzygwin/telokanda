import React, { Component } from 'react';
import verifyemail from '../auth/auth_assests/verifyemail.png';
import './auth.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailVerification } from '../../store/actions/authActions';

class verifyEmail extends Component {
    render() {
        const { auth, sendVerification } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && auth.emailVerified) return <Redirect to='/' />
        return (
            <div className="inner-verify">
                <div className="verify-image">
                    <img src={verifyemail} alt="verifyemail" className="verifyemail"/>
                </div>
                <div className="verify-text">
                    <div className="ver-text">Verify your Email</div><br />
                    <div className="verify-span">Kindly check your email address in order to verify your account</div>
                </div>
                <br/>
                <div className="verify-button">
                    <button className="loader-button" onClick={() => sendVerification()}>Re-send Verification</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        verifyError: state.auth.verifyEmail.error
    }
}

const mapDispatchToProps = {
    sendVerification: emailVerification
};
export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail)