"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
    const [user, setUser] = useState({
        //"username": "",
        "email": "",
        "password": ""
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onLogin = async () => {
        try {
            setLoading(true);
            const resp = await axios.post("/api/users/login", user);
            console.log("Login Success !", resp.data);
            toast.success("Login Success !");
            router.push("/profile/1"); 
        } catch (error: any) {
            console.log("Login Failed !", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="m-4 text-4xl">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email Id</label>
            <input 
                className="p-2 m-4 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                placeholder="Enter Email Id"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 m-4 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={onLogin} className="p-2 m-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:shadow-blue">Login</button>
            <Toaster position="top-right"/>
            <Link href="/register">New User ! Register Here</Link>
        </div>
    );
}
