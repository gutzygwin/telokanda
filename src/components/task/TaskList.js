import React from 'react'
import TaskSummary from './TaskSummary';
import { Link } from 'react-router-dom';

const TaskList = ({tasks}) => {
    return (
        <section className="section">
            { tasks && tasks.map(task => {
                return (
                    <Link to={'/task/' + task.id}>
                        <TaskSummary task={task} key={task.id} />
                    </Link>
                )
            })}
        </section>
    )
}

export default TaskList
