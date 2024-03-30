'use client'
import { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard'
import Link from 'next/link'
import axios from '@/lib/axios'

const Home = () => {
    const [tasks, setTasks] = useState([]) // Initial state for data

    useEffect(() => {
        axios.get('/api').then((data) => {
            setTasks(data.data)
        })
    }, [])

    function removeTask(cardIndex) {
        console.log(tasks)
        let newTasks = tasks.filter((item, index) => index !== cardIndex)
        setTasks(newTasks)
        console.log(tasks)
    }

    function completeTask(cardIndex) {
        let newTasks = tasks.map((item, index) => index === cardIndex ? {
            ...item,
            completed_at: 1,
        } : { ...item })
        setTasks(newTasks)
        console.log(tasks)
    }

    //     [{
    //     'id': 27,
    //     'description': 'asd',
    //     'created_at': '2024-03-30T00:34:05.000000Z',
    //     'updated_at': '2024-03-30T00:34:05.000000Z',
    //     'completed_at': null,
    //     'deleted_at': null,
    //     'title': 'asd',
    // }, {
    //     'id': 22,
    //     'description': 'ads',
    //     'created_at': '2024-03-30T00:18:15.000000Z',
    //     'updated_at': '2024-03-30T00:34:17.000000Z',
    //     'completed_at': '2024-03-30 08:34:17',
    //     'deleted_at': null,
    //     'title': 'asd',
    // }]
    return (<main className={'flex flex-col items-center justify-center'}>
        {/*{JSON.stringify(tasks)}*/}
        <h1 className="text-4xl">Task List</h1>
        <div className={'flex justify-center gap-5 flex-wrap w-5/6'}>
            {tasks.map((task, index) => (<TaskCard
                key={task.id}
                task={task}
                removeTask={removeTask}
                completeTask={completeTask}
                index={index}
            />))}
        </div>
        <Link href={'http://localhost:3000/createTask'} className={'btn btn-info text-lg absolute top-50 left-20'}>Add task</Link>
    </main>)
}

export default Home
