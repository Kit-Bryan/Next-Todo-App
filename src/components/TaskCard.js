import React from 'react'
import axios from '@/lib/axios'

function TaskCard(taskObject) {

    const handleTaskCompletion = async (id, index) => {
        console.log('Completed')
        axios.patch('api/complete', { id })
        taskObject.completeTask(index)
    }

    const handleTaskDeletion = async (id, index) => {
        axios.delete('api/delete', { data: { id } })
        taskObject.removeTask(index)
    }
    return (<>
        <div className="card w-3/12 bg-primary text-primary-content my-5 py-5 ">
            <div className="card-body py-0">
                {taskObject.task.completed_at ? <div className="badge badge-accent badge-lg ml-auto ">Completed</div> : <div className="badge badge-error badge-lg ml-auto ">Not Completed</div>}
                <h2 className="card-title text-ellipsis overflow-hidden">{taskObject.task.title}</h2>
                <p className={'text-ellipsis overflow-hidden'}>{taskObject.task.description}</p>
                <div className="card-actions justify-end">
                    {taskObject.task.completed_at ? <button className="btn" onClick={async () => await handleTaskDeletion(taskObject.task.id, taskObject.index)}>Delete</button> :
                        <button className="btn" onClick={async () => await handleTaskCompletion(taskObject.task.id, taskObject.index)}>Complete</button>}
                </div>
            </div>
        </div>
    </>)

}

export default TaskCard