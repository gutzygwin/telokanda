import React, { Component } from 'react'
import './task.css';
import Notifications from '../notifications/Notifications';
import { connect } from 'react-redux';
import { createTask } from '../../store/actions/taskActions';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CreateTask extends Component {
    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createTask(this.state)
        this.props.history.push('/task');
    }
    render() {
        const { auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="create-task-container task-container">
                <div className="first-create">
                    <h5>Create Task</h5>
                    <form onSubmit={this.handleSubmit} className="create-task">
                        <div className="green-create">
                            <div className="input-field">
                                <label htmlFor="title" className="white-text">Task Title</label>
                                <input type="text" id="title" className="white-text" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="content" className="white-text">Task Content</label>
                                <textarea id="content" className="materialize-textarea white-text" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <button className="btn z-depth-0 waves-effect waves-light create-button">
                            <span>Create</span>
                            <i className="material-icons left">send</i>
                        </button>
                    </form>
                </div>
                <div className="second-create">
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
        createTask: (task) => dispatch(createTask(task))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(CreateTask)
