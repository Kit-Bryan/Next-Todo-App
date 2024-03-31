'use client'
import { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard'
import Link from 'next/link'
import axios from '@/lib/axios'
import Loading from '@/app/loading'

const Home = () => {
    const [tasks, setTasks] = useState([]) // Initial state for data
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await axios.get('/api').then((data) => {
                console.log(data.data)
                setTasks(data.data)
                setLoading(false)
            })
        })()
    }, [])

    function removeTask(cardIndex) {
        let newTasks = tasks.filter((item, index) => index !== cardIndex)
        setTasks(newTasks)
    }

    function completeTask(cardIndex) {
        let newTasks = tasks.map((item, index) => index === cardIndex ? {
            ...item,
            completed_at: 1,
        } : { ...item })
        setTasks(newTasks)
    }

    if (loading) return (<span><Loading /></span>)

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
        <Link href={'http://localhost:3000/createTask'} className={'btn btn-info text-lg fixed bottom-72 left-14 z-10'}>Add task</Link>
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
    </main>)
}

export default Home
