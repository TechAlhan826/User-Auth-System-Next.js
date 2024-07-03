"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState({
        "username": "",
        "email": "",
        "password": ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onRegister = async () => {
        try {
            if (!buttonDisabled) {
                setLoading(true);
                const resp = await axios.post("/api/users/register", user);
                console.log("Registration Success !", resp.data);
                toast.success("Registration Success !");
                router.push("/login"); 
            }
        } catch (error: any) {
            console.log("Registration Failed !", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        toast("Register Form Submitted !");     
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="m-4 text-4xl">{loading ? "Processing..." : "Register"}</h1>
            <hr />
            <label htmlFor="username">Username </label>
            <input
                required 
                className="p-2 m-4 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                placeholder="Enter Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
             
            <label htmlFor="email">Email Id</label>
            <input 
                required
                className="p-2 m-4 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                placeholder="Enter Email Id"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
             
            <label htmlFor="password">Password</label>
            <input 
                required
                className="p-2 m-4 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button type="submit" onClick={onRegister} className="p-2 m-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:shadow-blue">{buttonDisabled ? "Fill The Form" : "Sign Up"}</button>
            <Toaster position="top-right" />
            <Link href="/login">Already Registered ! Login Here</Link>
        </div>
    );
}
