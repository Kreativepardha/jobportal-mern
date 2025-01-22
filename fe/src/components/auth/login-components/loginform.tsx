import React, { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { loadingState, userState } from "../../../recoil/authAtoms"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from "../../../utils/constant"


const LoginForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })

    const [user, setUser]  = useRecoilState(userState);
    const setLoading = useSetRecoilState(loadingState); 
    const navigate = useNavigate();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT/login}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }) 
            if(res.data.success) {
                setUser(res.data.user)
                navigate('/')
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error(err)
            toast.error(err.res?.data?.message || "Somthing went Wrong !!")
        } finally {
            setLoading(true)
        }
    } 
    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="">
            {/* navbar */}
            <div className="">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-800 rounded-md p-2 my-10">
                    <h2 className="font-bold text-xl mb-4">Login</h2>
                    <div className="my-2">
                        <label htmlFor=""></label>
                    </div>
                </form>
            </div>
        </div>
    )



}