import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { userProfile } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    const signIn=()=>{
        props.userProfile();
        props.toggleModalState();
    }
    return (
        <div>
            <ul className="rayan">
                <li><a onClick={props.signOut} className="logout white-text">Log out</a></li>
                <li><NavLink to='' className="btn btn-floating blue lighten-1 cg" onClick={signIn}>
                    {props.profile.initials}
                </NavLink></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        userProfile: () => dispatch(userProfile())
    }
}
export default connect(null, mapDispatchToProps)(SignedInLinks)
