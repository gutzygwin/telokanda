import React from 'react'
import basketball from './advert_assests/basketball.png';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const AdvertDetails = (props) => {
    const { advert, auth } = props;

    if (!auth.uid) return <Redirect to='/login' />
    if (advert) {
        return (
            <div className="container section advert-details">
                <div className="card z-depth-0 cardos">
                    <div className="cardly">
                        <div className="card-image">
                            <img
                            src={`${advert.url}` || {basketball} } 
                            alt=""/>
                        </div>
                        <div className="card-content contenty">
                            <div className="card-container">
                                <div className="ad-card-title">{ advert.title }</div>
                                <div className="ad-card-text">{ advert.content }</div>
                            </div>
                            <div className="card-action actiony">
                                <div className="posted-by">Posted by {advert.authorFirstName} {advert.authorLastName}</div>
                                <div>{moment(advert.createdAt.toDate()).calendar()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p className="white-text">Loading advert...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const adverts = state.firestore.data.adverts;
    const advert = adverts ? adverts[id] : null
    return {
       advert: advert,
       auth: state.firebase.auth
    }  
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'adverts' }
    ])
)(AdvertDetails)