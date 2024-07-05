"use client"

import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function UserProfile({params}:any){
    const router = useRouter();

    const logout = async ()=> {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successful !");
            router.push("/login");  
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="m-4 text-xl">Profile</h1>
            <hr />
            <p className="text-2xl">User Profile <span className="p-2 rounded bg-green-500">{params.id}</span></p>
            <hr />

            <button onClick={logout} className="p-2 m-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:shadow-blue bg-red-600">Logout</button>
            <Toaster position="top-right" />
            </div>
    );
}