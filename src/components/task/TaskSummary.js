import React from 'react'
import './task.css';
import moment from 'moment';

const TaskSummary = ({task}) => {
    return (
        <div className="card z-depth-0 task-summary task-card">
            <div className="card-content takiki">
                <div className="card-titley white-text">{task.title}</div>
                <p className="green-post">Posted by {task.authorFirstName} {task.authorLastName}</p>
                <p className="grey-texty">{moment(task.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default TaskSummary
