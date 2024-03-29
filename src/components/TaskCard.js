import React from 'react'
import axios from '@/lib/axios'

function TaskCard(taskObject) {

    const handleTaskCompletion = async (id) => {
        await axios.patch('api/complete', { id })
    }

    const handleTaskDeletion = async (id) => {
        await axios.delete('api/delete', {data:{id}})
    }
    return (<>
        <div className="card w-3/12 bg-primary text-primary-content my-5 py-5 ">
            <div className="card-body py-0">
                {taskObject.task.completed_at ? <div className="badge badge-accent badge-lg ml-auto ">Completed</div> : <div className="badge badge-error badge-lg ml-auto ">Not Completed</div>}
                <h2 className="card-title">{taskObject.task.title}</h2>
                <p>{taskObject.task.description}</p>
                <div className="card-actions justify-end">
                    {taskObject.task.completed_at ? <button className="btn" onClick={() => handleTaskDeletion(taskObject.task.id)}>Delete</button> :
                        <button className="btn" onClick={() => handleTaskCompletion(taskObject.task.id)}>Complete</button>}
                </div>
            </div>
        </div>
    </>)

}

export default TaskCard