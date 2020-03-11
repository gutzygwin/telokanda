import React, { Component } from 'react'
import './advert.css';
import Notifications from '../notifications/Notifications';
import { storage } from '../../fbConfig';
import { connect } from 'react-redux';
import { createAdvert } from '../../store/actions/advertActions';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CreateAdvert extends Component {
    state = {
        title: '',
        content: '',
        url: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createAdvert(this.state)
        this.props.history.push('/advert');
    }
    handleImageUpload = (e) => {
        if (e.target.files[0]) {
            const image = (e.target.files[0]);
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    this.setState({url});
                })
            }
            )
        }
    }
    render() {
        const { auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="create-advert-container advert-container">
                <div className="first-advert">
                    <h5>Create Advert</h5>
                    <form onSubmit={this.handleSubmit} className="create-advert">
                        <div className="green-advert">
                            <div className="input-field">
                                <label htmlFor="title" className="white-text">Advert Title</label>
                                <input type="text" id="title" className="white-text" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="content" className="white-text">Advert Content</label>
                                <textarea id="content" className="materialize-textarea white-text" onChange={this.handleChange}/>
                            </div>
                            <div className="image-field">
                                <label htmlFor="imageFile" className="include-image"><i className="material-icons">add_photo_alternate</i> &nbsp; Choose Image</label>
                                <input type="file" id="imageFile" className="advert-image" onChange={this.handleImageUpload}/>
                            </div>
                        </div>
                        <button className="btn z-depth-0 waves-effect waves-light advert-button">
                            <span>Create</span>
                            <i className="material-icons left">send</i>
                        </button>
                    </form>
                </div>
                <div className="second-advert">
                    <Notifications notifications={notifications}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createAdvert: (advert) => dispatch(createAdvert(advert))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(CreateAdvert)

