import React, { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { loadingState, userState } from "../../../recoil/authAtoms"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from "../../../utils/constant"
import { inputFields } from "../data/inputData"
import InputBox from "../../ui/InputBox"
import RadioGroup from "../../ui/RadioGroup"


export const LoginForm = () => {
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
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
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
        <div className="bg-black">
            {/* navbar */}
            <div className="">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-800 rounded-md p-2 my-10">
                    <h2 className="font-bold text-xl mb-4">Login</h2>
                   <div className="">
                    {
                        inputFields.map((field) => (
                            <InputBox
                             key={field.name}
                             type={field.type}
                             value={input[field.name]}
                             name={field.name}
                             placeholder={field.placeholder}
                             label={field.label}
                             onChange={changeEventHandler}   
                            />
                        ))
                    }
                    <div className="">
                    <RadioGroup
                    name="role"
                    options={[
                        { label: 'Student', value: 'student' },
                        { label: 'Recruiter', value: 'recruiter' },
                    ]}
                    value={input.role}
                    onChange={(value) => setInput({ ...input, role: value })}
/>

                    </div>
                   </div>
                </form>
            </div>
        </div>
    )



}