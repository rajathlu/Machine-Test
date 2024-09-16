
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// import loginIcons from "../assets/signin.gif"


export default function LoginPage() {
  const router = useRouter();

  const [user,setUser]=React.useState({
    email:"",
    password:""
  })

  console.log(user,"user");
  
  const[buttonDisabled,setButtonDisabled]=useState(false)
  const[loading,setLoading]=useState(false);
  const [showPassword, setPassword] = useState(false);

  
  const onLogin = async()=>{
    try{
      setLoading(true);
      const response =  await axios.post("/api/users/login",user);
      console.log(response,"response");
      toast.success("Login Success")
      router.push("/profile")
      

    }catch(error:any){
      console.log(error,"error");
      toast.error(error.message)
      
    }finally{
      setLoading(false)

    }

  }

  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }

  },[user])

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser((preve) => {
      return { ...preve, [name]: value };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing":"Login"}</h1>
      <hr/>
   
    
        <label htmlFor="email" >email</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
      id="email" 
      type="text"
      value={user.email}
      onChange={(e)=> setUser({...user,email:e.target.value})}
      placeholder="email"
      />

     <label htmlFor="password" >password</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
      id="password" 
      type="password"
      value={user.password}
      onChange={(e)=> setUser({...user,password:e.target.value})}
      placeholder="password"
      />
      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" >Login </button>
      <Link href="/signup">Visit Signup page </Link>

    </div>
  
  )
}
