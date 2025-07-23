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
}

export default function Login() {
    const router = useRouter();

    const [user , setuser] = useState<userInfo>({email: "", password:""});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading , setLoading] = useState(false);

    const onLogin = async () => {
        try {

            setLoading(true);
            const response = await axios.post("/api/users/login" ,user, {withCredentials: true});
            console.log("Login succcess-> " , response.data);
            router.push('/profile')
            
        } catch (error :any) {
            console.log("login failed -> ", error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing" : "signup"}</h1>

            <label htmlFor="password">password</label>
            <input type="text"  id="password" value={user.password} onChange={(e)=> setuser({...user, password:e.target.value})} placeholder="password" className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600"/>

            <label htmlFor="email">email   </label>
            <input type="text"  id="email   " value={user.email   } onChange={(e)=> setuser({...user, email     :e.target.value})} placeholder="email   " className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600"/>

            <button onClick={onLogin} className="bg-white border-gray-300 rounded-lg text-black p-2 mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "no login" : "login"}
            </button>

            <Link href="/signup">visit sign up</Link>
        </div>

    )
}