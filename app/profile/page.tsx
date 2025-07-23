'use client'
import React from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Page() {
    const router = useRouter();
    const [data, setData] = useState("");

    const getUser = async() => {
        const res  = await axios.post('api/users/me')
        setData(res.data.data._id)
    }

    const logout = async() => {
        try {
            await axios.get('/api/users/logout'); 
            toast.success("logout successfully");
            router.push('/login')
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>{data === "" ?  "nothing" : <Link href={`/profile/${data}`}>{data}</Link>} </h2>
        <button onClick={logout} className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600">Logout</button>

        <button onClick={getUser} className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600">user</button>
    </div>
  )
}

export default Page;
