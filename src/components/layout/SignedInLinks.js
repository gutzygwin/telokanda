import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return (
        <div>
            <ul className="rayan">
                <li><a onClick={props.signOut} className="logout white-text">Log out</a></li>
                <li><NavLink to='/' className="btn btn-floating blue lighten-1 cg">
                    {props.profile.initials}
                </NavLink></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignedInLinks)
