'use client'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

import TaskCard from '@/components/TaskCard'
import Link from 'next/link'

const Home = () => {
    const [tasks, setTasks] = useState([]) // Initial state for data

    useEffect(() => {
        axios.get('api/').then((data) => {
            setTasks(data.data)
        })
    }, [])



    return (<main className={"flex flex-col items-center justify-center"}>
        <h1 className="text-4xl">Task List</h1>

        <div className={'flex justify-center gap-5 flex-wrap w-5/6'}>
            {/*display green border if completed*/}
            {tasks.map((task) => (<TaskCard
                key={task.id}
                task={task}
            />))}
        </div>
        <Link href={'http://localhost:3000/createTask '} className={'btn btn-info text-lg absolute top-50 left-20'}>Add task</Link>
    </main>)
}

export default Home
