"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import images from "../assets/images.png"

import imageTobase64 from "../../helpers/imgaeToBase64"

export default function signup() {
  const router = useRouter();
  const [user,setUser]=useState({
    email:"",
    password:"",
    username:"",
    profilePic:""
  })


  console.log(user,"user");
  

  

  const [buttonDisabled ,setButtonDisabled]=useState(false)

  const[loading,setLoading]=useState(false)

  const onSignup = async()=>{
    try{

      setLoading(true);
       const response =  await axios.post("/api/users/signup",user)
       console.log("Signup Success" ,response.data);
       router.push("/login")

       
    }catch(error:any){
      console.log(error,"error");
      
      toast.error(error.message);

    }finally{
      setLoading(false);

    }


  }

  const handleUploadPic= async(e:any)=>{
    const file=e.target.files[0]
    const imagePic = await imageTobase64(file)
    setUser((prev :any)=>{
      return{...prev,profilePic:imagePic}
    })
  }

  

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0&&user.username.length>0){
      setButtonDisabled(false)

    }else{
      setButtonDisabled(true)
    }


  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? " Processing":"Signup"}</h1>
      <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={ user.profilePic } alt="login icon" />
            </div>
            <form>
              <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
              Upload Photo
            </div>
                <input type="file" className="hidden" 
                onChange={handleUploadPic}
                 />
              </label>
          
            </form>
          </div>
      <hr/>
      <label htmlFor="username" >Username</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
      id="username" 
      type="text"
      value={user.username}
      onChange={(e)=> setUser({...user,username:e.target.value})}
      placeholder="username"/>
    
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
      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" >{buttonDisabled ? "No Signup" : "Signup"}</button>
      <Link href="/login">Visit login page </Link>

    </div>
  )
}
