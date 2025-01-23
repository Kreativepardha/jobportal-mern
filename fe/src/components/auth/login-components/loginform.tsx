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
import Button from "../../ui/Button"


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
            setLoading(false)
        }
    } 
    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="bg-slate-200/20 border border-gray-800 flex flex-col justify-center">
            {/* navbar */}
            <div className="">
                <form onSubmit={submitHandler} className="w-1/2  rounded-md p-2 my-10">
                    <h2 className="font-bold text-xl mb-4">Login</h2>
                   <div className="flex flex-col p-2 ">
                    {
                        inputFields.map((field) => (
                            <InputBox
                             key={field.name}
                             type={field.type}
                             value={input[field.name as keyof typeof input]}
                             name={field.name}
                             placeholder={field.placeholder}
                             label={field.label}
                             onChange={changeEventHandler}   
                            />
                        ))
                    }
                <div className="mt-4">
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
                   <Button 
                   label="login"
                   type="submit"
                   className="w-full mt-4 bg-black"
                   disabled={!input.email || !input.password || !input.role}
                   />
                </form>
            </div>
        </div>
    )
}