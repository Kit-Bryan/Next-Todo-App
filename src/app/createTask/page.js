'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'

function CreateTask() {
    const [formData, setFormData] = useState({})
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true);
            await axios.post('api/tasks', formData)
            router.push('/')
        } catch (e) {
            console.error(e.response.data.errors)
        }
    }

    const handleInputChange = (event) => {
        const {
            value,
            name,
        } = event.target
        // console.dir(event.target.value)
        setFormData({
            ...formData, // Keep existing form data
            [name]: value, // Update form data for the input field that changed
        })
    }


    if(loading) return (
        <span><Loading/></span>
    );

    return (<div className={'flex justify-center '}>
        <div className={'flex flex-col items-center justify-center h-full border-solid hover:border-double border-4 w-6/12 p-10 pt-5 gap-6'}>
            <h1 className={'text-3xl font-bold'}>Task input</h1>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">What is your task title?</span>
                </div>
                <input type="text" name={'title'} onChange={handleInputChange} placeholder="Play football" className="input input-info input-md w-full" />
            </label>
            <label className="form-control w-full ">
                <div className="label">
                    <span className="label-text">What is your task description?</span>
                </div>
                <textarea onChange={handleInputChange} name={'description'} placeholder="Run 10 yards across the field" className="textarea textarea-info textarea-md w-full" />
            </label>
            <Link href={'/'} onClick={async (e) => await handleSubmit(e)} className={'btn btn-primary w-full mt-5 '}>
                <span>Create Task</span>
            </Link>
        </div>
    </div>)
}

export default CreateTask