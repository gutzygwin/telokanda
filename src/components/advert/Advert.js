import React, { Component } from 'react'
import Notifications from '../notifications/Notifications';
import './advert.css';
import AdvertList from './AdvertList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Advert extends Component {
    render() {
        const { adverts, auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="advert-container">
                <div className="Advert">
                    <div className="Advertlist">
                        <AdvertList adverts={adverts} />
                    </div>
                    <div className="notifications-advert">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adverts: state.firestore.ordered.adverts,
        notifications: state.firestore.ordered.notifications,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'adverts', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Advert)
