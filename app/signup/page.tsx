'use client'

import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import Link from "next/link";

interface userInfo {
    email: string;
    password: string;
    username: string;
}

export default function Signup() {
    const router = useRouter();

    const [user , setuser] = useState<userInfo>({email: "", password:"" , username:""});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading , setLoading] = useState(false);

    const onSignup = async () => {
        try {

            setLoading(true);
            const response = await axios.post("/api/users/signup", user, {withCredentials: true});
            console.log("signup process -> " , response.data);
            router.push('/login')
            
        } catch (error :any) {
            console.log("signup failed -> ", error.message);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing" : "signup"}</h1>
            <label htmlFor="username">username</label>
            <input type="text"  id="username" value={user.username} onChange={(e)=> setuser({...user, username:e.target.value})} placeholder="username" className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600"/>

            <label htmlFor="password">password</label>
            <input type="text"  id="password" value={user.password} onChange={(e)=> setuser({...user, password:e.target.value})} placeholder="password" className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600"/>

            <label htmlFor="email">email   </label>
            <input type="text"  id="email   " value={user.email   } onChange={(e)=> setuser({...user, email     :e.target.value})} placeholder="email   " className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600"/>

            <button onClick={onSignup} className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "fill the form" : "sign up"}
            </button>

            <Link href="/login">visit login</Link>
        </div>

    )
}