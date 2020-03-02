import React, { Component } from 'react'
import Notifications from '../notifications/Notifications';
import './task.css';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Task extends Component {
    render() {
        const { tasks, auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="task-container">
                <div className="task">
                    <div className="tasklist">
                        <TaskList tasks={tasks} />
                    </div>
                    <div className="notifications-task">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'tasks', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Task)
